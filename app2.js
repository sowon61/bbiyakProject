// firebase --> 문서 --> 빌드 --> 실시간데이터베이스 
// npm install firebase -g 

// npm init -y로 package.json 생성 후에
// package.json 내에   "type": "module"을 추가하면 import error 해결됨.

// firebase 의 접근 권한 (규칙 메뉴에서 expire 되었는 지 확인 --> true로 하면 항상 OK
// node.js update 후에 node-red의 firebase 사용 불가 상태임

// 웹 모듈식 API 사용
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import mqtt from 'mqtt';

var client = mqtt.connect('mqtt://223.195.194.41');

client.publish("Test", "Test Message");

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// set value to Firebase RealTime Database with Key = 'model'
set(ref(database, 'model'), 'Seoul City');

const dbRef = ref(getDatabase());

get(child(dbRef, 'Player')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

const Ref = ref(getDatabase(), 'model');

onValue(Ref, (snapshot) => {
  const data = snapshot.val();
  console.log("Changed --> " + data);
  client.publish("node", data);
});

