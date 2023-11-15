const firebase= require("firebase-admin");

// var admin = require("firebase-admin");

var serviceAccount = require ("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bbiyak-b8f1d-default-rtdb.firebaseio.com"
});

const firebaseConfig = {
  apiKey: "AIzaSyAV4Txl8CxMlRjsyWyeAXCnIfAixTiObtY",
  authDomain: "bbiyak-b8f1d.firebaseapp.com",
  databaseURL: "https://bbiyak-b8f1d-default-rtdb.firebaseio.com",
  projectId: "bbiyak-b8f1d",
  storageBucket: "bbiyak-b8f1d.appspot.com",
  messagingSenderId: "557034557935",
  appId: "1:557034557935:web:4ffcbd2f1b071203d8661a",
  measurementId: "G-DZEVHSYDDF"
};

firebase.initializeApp(firebaseConfig)

let database = firebase.database();

module.exports = database;