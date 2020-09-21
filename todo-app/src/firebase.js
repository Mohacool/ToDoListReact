// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

        apiKey: "AIzaSyB8XTgjqfq1_Ss7g7cFNry5UGeSidd7ruk",
        authDomain: "todoapp-2662c.firebaseapp.com",
        databaseURL: "https://todoapp-2662c.firebaseio.com",
        projectId: "todoapp-2662c",
        storageBucket: "todoapp-2662c.appspot.com",
        messagingSenderId: "757615288320",
        appId: "1:757615288320:web:0f7088683d4a7f8b4bf8e5",
        measurementId: "G-BMWFLRKK1F"
});

const db = firebaseApp.firestore();

export default db;

