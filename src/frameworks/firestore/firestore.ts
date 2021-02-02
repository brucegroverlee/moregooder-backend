import { FirebaseFirestore } from "@firebase/firestore-types";
import config from "../config/index";
// tslint:disable-next-line:no-var-requires
const Firestore = require("@google-cloud/firestore");

export class MyFirestore {
  public db: FirebaseFirestore;

  async connect() {
    try {
      this.db = new Firestore({
        projectId: config.firestore.GOOGLE_PROJECT_ID,
        keyFilename: config.firestore.GOOGLE_APPLICATION_CREDENTIALS,
      });
    } catch (error) {
      throw error;
    }
  }
}

export const firestore = new MyFirestore();