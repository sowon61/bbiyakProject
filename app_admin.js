import { initializeApp } from "firebase/app"; //firebase 모듈 가져오기 
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = { //firebase 프로젝트의 구성 정보를 설정
  apiKey: "AIzaSyAV4Txl8CxMlRjsyWyeAXCnIfAixTiObtY",
  authDomain: "bbiyak-b8f1d.firebaseapp.com",
  databaseURL: "https://bbiyak-b8f1d-default-rtdb.firebaseio.com",
  projectId: "bbiyak-b8f1d",
  storageBucket: "bbiyak-b8f1d.appspot.com",
  messagingSenderId: "557034557935",
  appId: "1:557034557935:web:4ffcbd2f1b071203d8661a",
  measurementId: "G-DZEVHSYDDF"
};

const app = initializeApp(firebaseConfig);   //firebase 앱 초기화, 이때 firebase구성 객체를 전달함.
const database = getDatabase(app);   //getdatabase함수를 사용하여 firebase인스턴스 전달함  

const admin = import('firebase-admin');
const serviceAccount = import('C:\Users\sowon\myNode\firebase\bbiyak-b8f1d-firebase-adminsdk-ex31x-2e06de2bd1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bbiyak-b8f1d-default-rtdb.firebaseio.com'
});

const db = admin.database();
const ref = db.ref("id");

ref.once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
