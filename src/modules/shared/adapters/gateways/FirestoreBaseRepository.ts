import { CollectionReference, Query, DocumentData, OrderByDirection } from "@firebase/firestore-types";
import { IEntities } from "../../entities/IEntities";
import { IDType } from "../../entities/types";
import { IRepositories } from "../../useCases/ports/IRepositories";
import { MyFirestore } from "../../../../frameworks/firestore/firestore";

export class FirestoreBaseRepository<T extends IEntities> {
  readonly tableName: string;
  firestore: MyFirestore;

  constructor(_firestore: MyFirestore) {
    this.firestore = _firestore;
  }

  /**
   * Returns the new entity"s id.
   */
  async _create(payload: object): Promise<T> {
    try {
      const now = new Date();
      const newPayload = {
        ...payload,
        createdAt: now,
        updatedAt: now,
      };
      const res = await this.firestore.db.collection(this.tableName).add(newPayload);
      return {
        ...newPayload,
        id: res.id,
      } as unknown as T;
    } catch (error) {
      throw error;
    }
  }

  private async _findAll(
    payload: object,
    options: {
      sort?: OrderByDirection;
      timeRange?: {
        since: string;
        until: string;
      };
      pagination?: {
        page: number;
        perPage: number;
      };
    } = null
  ): Promise<T[]>  {
    try {
      const documents: T[] = [];
      const queryList = Object.entries(payload);
      let ref: CollectionReference<DocumentData>|Query<DocumentData> = this.firestore.db.collection(this.tableName);
      if (queryList.length !== 0) {
        const queryItem = queryList.shift();
        const key = queryItem[0];
        const value = queryItem[1];
        ref = ref.where(key, "==", value);
        for (const [_key, _value] of queryList) {
          ref = ref.where(_key, "==", _value);
        }
      }
      if (options?.timeRange) {
        ref = ref.where("createdAt", "<=", options.timeRange.since).where("createdAt", ">=", options.timeRange.until);
      }
      if (options?.sort) {
        ref = ref.orderBy("createdAt", options.sort);
      }
      if (options?.pagination) {
        const startPoint = options.pagination.page === 1 ? (1) : ((options.pagination.page - 1) * options.pagination.perPage);
        ref = ref.startAt(startPoint).limit(options.pagination.perPage);
      }
      const snapshot = await ref.get();
      if (snapshot.empty) {
        return documents;
      }
      snapshot.forEach(doc => {
        documents.push({
          ...doc.data(),
          id: doc.id,
        } as unknown as T);
      });
      return documents;
    } catch (error) {
      throw error;
    }
  }

  async findOne(payload: object): Promise<T|null> {
    try {
      const documents: T[] = await this._findAll(payload);
      if(documents.length === 0) {
        return null;
      } else {
        return documents[0];
      }
    } catch (error) {
      throw error;
    }
  }

  async findById(id: IDType): Promise<T|null> {
    try {
      const ref = this.firestore.db.collection(this.tableName).doc(id);
      const doc = await ref.get();
      if (!doc.exists) {
        return null;
      } else {
        return {
          ...doc.data(),
          id,
        } as unknown as T;
      }
    } catch (error) {
      throw error;
    }
  }

  async findAndCountAll(
    query: any,
    pagination: {
      page: number,
      perPage: number
    }
  ): Promise<{ count: number, rows: T[] }> {
    try {
      const documents = await this._findAll(query, {
        sort: "asc",
        pagination,
      });
      return {
        count: 0,
        rows: documents,
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

  async delete(query: object): Promise<number> {
    try {
      const batch = this.firestore.db.batch();
      const documents = await this._findAll(query);
      documents.forEach(doc => {
        batch.delete(this.firestore.db.collection(this.tableName).doc(doc.id));
      });
      await batch.commit();
      return documents.length;
    } catch (error) {
      throw error;
    }
  }
}