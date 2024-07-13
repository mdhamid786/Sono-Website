import { collection, doc, getDoc, getFirestore } from "@firebase/firestore";
import { app, auth, db } from "./clientApp";

// import { db } from '../firebase/clientApp';
import { Database, getDatabase } from "firebase/database";






export const firestore = getFirestore(app)



// user collection
export const userCollection = collection
(firestore , "users");



// user collection
export const archivesCollection = collection
(firestore , "archives");


// // user collection
export const sharedCollection = collection
(firestore , "shared");



