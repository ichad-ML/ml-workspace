import { Injectable, OnModuleInit } from "@nestjs/common";
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private db: FirebaseFirestore.Firestore;

  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }

    this.db = admin.firestore();
  }

  get firestore() {
    return this.db;
  }

  async createInAppDocument(data: any) {
    return this.db.collection('in-app').add(data);
  }

  async createSmsDocument(data: any) {
    return this.db.collection('sms').add(data);
  }

  async getDocument<T = FirebaseFirestore.DocumentData>(
    collection: 'in-app' | 'sms',
    docId: string
  ): Promise<T & { id: string }> {
    const docRef = this.db.collection(collection).doc(docId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new Error(
        `Document with ID "${docId}" not found in collection "${collection}".`
      );
    }

    return { id: docSnap.id, ...docSnap.data() } as T & { id: string };
  }
}
