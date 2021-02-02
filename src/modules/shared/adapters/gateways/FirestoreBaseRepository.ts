// import { FirebaseFirestore } from "@firebase/firestore-types";
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

  async findAll(payload: object, options: any = null): Promise<T[]>  {
    try {
      const documents: T[] = [];
      const queryList = Object.entries(payload);
      const queryItem = queryList.shift();
      const key = queryItem[0];
      const value = queryItem[1];
      let ref = this.firestore.db.collection(this.tableName).where(key, "==", value);
      for (const [_key, _value] of queryList) {
        ref = ref.where(_key, "==", _value);
      }
      if (options !== null) {
        // ref = ref.orderBy("createdAt", "asc");
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
      const documents: T[] = await this.findAll(payload);
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
      const documents = await this.findAll(query);
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