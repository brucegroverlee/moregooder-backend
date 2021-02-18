import mysql from "mysql2";

import { IEntities } from "../../entities/IEntities";
import { IDType } from "../../entities/types";
import { IRepositories } from "../../useCases/ports/IRepositories";
import { MySQL } from "../../../../frameworks/mysql/mysql";

export class MySqlBaseRepository<T extends IEntities> implements IRepositories<T>{
  readonly tableName: string;
  db: MySQL;

  constructor(_db: MySQL) {
    this.db = _db;
  }
  /**
   * Returns the new entity's id.
   */
  _create(payload: object): Promise<T> {
    return new Promise((resolve, reject) => {
      let columns: string[] = [];
      let placeholders: string[] = [];
      let values = Object.values(payload);
      const now = new Date();

      function parseColumns() {
        Object.keys(payload).forEach(key => {
          columns.push(`\`${key}\``);
          placeholders.push("?");
        });
      }

      function addDefaultColumns() {
        columns = columns.concat(["\`createdAt\`", "\`updatedAt\`"]);
        placeholders = placeholders.concat(["?", "?"]);
        values = values.concat([now, now]);
      }

      parseColumns();
      addDefaultColumns();
      const sql = `INSERT INTO \`${this.tableName}\` ( ${columns.join(",")} ) VALUES ( ${placeholders.join(",")} );`;
      this.db.connection.execute(sql, values, (err: mysql.QueryError, result: mysql.ResultSetHeader, fields: mysql.FieldPacket[]) => {
          if (err) reject(err);
          resolve({
            ...payload,
            id: result.insertId as IDType,
            createdAt: now,
            updatedAt: now,
          } as unknown as T);
        }
      );
    });
  }

  findAll(
    query: object,
    options: {
      count?: boolean,
      sort?: string;
      timeRange?: {
        since: string;
        until: string;
      };
      pagination?: {
        page: number;
        perPage: number;
      };
    }
  ): Promise<T[]|number> {
    return new Promise((resolve, reject) => {
      const columns: string[] = [];
      const values = Object.values(query);

      function parseColumns() {
        Object.keys(query).forEach(key => {
          columns.push(`\`${key}\` = ?`);
        });
      }

      function parseSelect() {
        if (options?.count) {
          return "count(*)";
        }
        return "*";
      }

      function parsePagination() {
        if (options?.pagination) {
          const startPoint = options.pagination.page === 1 ? (0) : ((options.pagination.page - 1) * options.pagination.perPage);
          const offset = (startPoint===0) ? ('') : (` OFFSET ${startPoint}`);
          return ` LIMIT ${options.pagination.perPage}${offset}`;
        }
        return "";
      }

      function parseSort() {
        if (options?.sort) {
          return ` ORDER BY \`createdAt\` \`${options.sort}\``;
        }
        return "";
      }

      function parseTimeRange() {
        if (options?.timeRange) {
          columns.push(`(\`createdAt\` BETWEEN ? AND ?)`);
          values.push(options.timeRange.since);
          values.push(options.timeRange.until);
        }
      }

      function parseWhere() {
        if (columns.length !== 0) {
          return ` WHERE ${columns.join(" AND ")}`;
        }
        return "";
      }

      parseColumns();
      parseTimeRange();
      const select = parseSelect();
      const pagination = parsePagination();
      const sort = parseSort();
      const where = parseWhere();
      const sql = `SELECT ${select} FROM \`${this.tableName}\`${where}${sort}${pagination};`;
      this.db.connection.execute(sql, values, (err: mysql.QueryError, results: mysql.RowDataPacket[], fields: mysql.FieldPacket[]) => {
        if (err) reject(err);
        if (options?.count) {
          resolve(results[0]["count(*)"]);
        } else {
          resolve(results as T[]);
        }
      });
    });
  }

  findOne(payload: object): Promise<T|null> {
    return new Promise((resolve, reject) => {
      const columns: string[] = [];
      const values = Object.values(payload);

      function parseColumns() {
        Object.keys(payload).forEach(key => {
          columns.push(`\`${key}\` = ?`);
        });
      }

      parseColumns();
      const sql = `SELECT * FROM \`${this.tableName}\` WHERE ${columns.join(" AND ")} LIMIT 1;`;
      this.db.connection.execute(sql, values, (err: mysql.QueryError, results: mysql.RowDataPacket[], fields: mysql.FieldPacket[]) => {
        if (err) reject(err);
        if (results.length > 0) {
          resolve(results[0] as T);
        } else {
          resolve(null);
        }
      });
    });
  }

  findById(id: IDType): Promise<T|null> {
    return this.findOne({ id, });
  }

  async findAndCountAll(
    query: any,
    options: {
      sort?: string;
      timeRange?: {
        since: string;
        until: string;
      };
      pagination?: {
        page: number;
        perPage: number;
      };
    }): Promise<{ count: number; rows: T[]; }> {
    try {
      const rows = await this.findAll(query, options) as T[];
      const count = await this.findAll(query, { count: true, timeRange: options.timeRange, }) as number;
      return {
        count,
        rows,
      };
    } catch (error) {
      throw error;
    }
  }

  async isAvailable(query: object): Promise<boolean> {
    try {
      const doc = await this.findOne(query);
      if (doc) {
        // is not available, the document exists.
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  delete(query: object): Promise<number> {
    return new Promise((resolve, reject) => {
      const columns: string[] = [];
      const values = Object.values(query);

      function parseColumns() {
        Object.keys(query).forEach(key => {
          columns.push(`\`${key}\` = ?`);
        });
      }

      parseColumns();
      const sql = `DELETE FROM \`${this.tableName}\` WHERE ${columns.join(" AND ")} `;
      this.db.connection.execute(sql, values, (err: mysql.QueryError, results: mysql.ResultSetHeader, fields: mysql.FieldPacket[]) => {
        if (err) reject(err);
        resolve(results.affectedRows);
      });
    });
  }
}