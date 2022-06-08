import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCY98YkhXNiiuEiJ_Bh07huqaABmbw6VC4",
    authDomain: "flutterpushnotification-66a35.firebaseapp.com",
    projectId: "flutterpushnotification-66a35",
    storageBucket: "flutterpushnotification-66a35.appspot.com",
    messagingSenderId: "596522897801",
    appId: "1:596522897801:web:11fd8c5ec0fd7ef8449158"
}

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const storage = getStorage(firebaseApp);

export {db, storage}