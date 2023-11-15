//app.js Test 
//또한 npm으로 rimraf 설치해놓음

// firebase --> 문서 --> 빌드 --> 실시간데이터베이스 
// npm install firebase -g 
// package.json 내에   "type": "module"을 추가하면 import error 해결됨.
// firebase 의 접근 권한 (규칙 메뉴에서 expire 되었는 지 확인 --> true로 하면 항상 OK
// node.js update 후에 node-red의 firebase 사용 불가 상태임

// 웹 모듈식 API 사용
import { initializeApp } from "firebase/app"; //firebase 모듈 가져오기 
import { getDatabase, ref, set, get, child } from "firebase/database";
import admin from "firebase-admin";
//var admin = import("firebase-admin");

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

const app = initializeApp(firebaseConfig);  //firebase 앱 초기화, 이때 firebase구성 객체를 전달함.
const database = getDatabase(app);  //getdatabase함수를 사용하여 firebase인스턴스 전달함

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "bbiyak-b8f1d",
    clientEmail: "firebase-adminsdk-ex31x@bbiyak-b8f1d.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKnpzrGU/cKFLN\ndbzdsXg6u15aw1ib+dbEnzW0vBmwZ9lib3ecTiROYSabBZqGHlfcqU2/r/yAqIFv\nX7S9aJkpllyTWIqAD01SznNV6Aaf+6pI4O//K8AA5zVIQOpnFjR69DRp3G5AhY0L\n0/vPX1/7Svq0f6QKnSg9ZNscqeIGmoKAgWB87ySiHOyVWCLBQ3OzR4KnOM3zqzpZ\nsdsH/ek71n/YNun1E+JROLzni7W5Lmg1Pb150mEJtxepoZFps5dZBdHKG67xoB+o\no5GM6vfaKX29vNVLiB17iOGLaX1ipzO26o2RENP/BJVufpnSJE0DUtSYDtZDtxuw\nvu8Dq0nlAgMBAAECggEAA4KEXtkxJjPnnUoDE8cJeWD6BTH5lLga9Yx5enBAtKrT\n2+3o4UMEQ3xQ1iIed2DKrlabc2zZv6PLnDGI+Lf5YTxKzb2cppO9R+guHMiYZsiN\n/lWxKpcoLAvVQzNmrBL5JUEaMFRCb6kwlIofREwXZku59Ir6fTmUMx4OYpx5vxoB\npURMP2OYzWfX0rKDF/57OuCl7Q4VWlBLb3Fr3+jKM/IM3ipt8KyB4AeiRm+PCj/S\n2wbNxULJo9zXuxfg47zCkyiqMqDAxZcVsf4pVbI9t9JRFKrSPIqslT4nGYFS6AQy\nmKQVyC0ozpoyXFiVcJe3VBdH+RERMWgq9M1FMe76EQKBgQD99EqryOTkR7ms0heA\nvN2UkuCgKvY2sZxpxHmG7BFFN9JZtoY3lzbt2VSNPy1lGfTfr2jzUtUIUoQaMHLh\nR7NOtHJn3nI9t4jxmqbQ5rrUupbdacKq+DQui7ADmAmTPMbOa5dUyXt/PObdxkYV\noQuyqKpKJo+ebVkFdK0CSHqTlQKBgQDMQHVHdlgeaiPU7Cllo02F+QXoPwjTtywh\nUKTHfbLGPR+lUmNFCCDR2HXKgTmevrZ+WkYJcnaE77DpTjMlQSSTTU8s+CHFCTBt\nknHwblwENy+nRAuM9OtisasgNl2fiwvyxrCKS68KvCOzlqTq+v9Aeqef2AjT8j+P\n9KXapSpJEQKBgBlxbkHDwNr2LK4Z5mzpfzGxfXvOkhhstwUJwDs6T4ilzRdb6BqN\ntd0ilwwHtl6YuSXoBxXJyLoquj19eSUE7/wErCmn6b4xMzExk2D+nN1PTGomfHBw\nqZm4OQxDIUJ1Jl3r/Z9rCEp5KZAymzbziZ5+s4D2WBFBV1fqlqLR7CX5AoGAJrxu\nwY/LJHGCvCXRsAnpcOgKW8JgnS5W+zZ9GaxYFEqRTtwyIWxqNQH1TON3FwkaORpL\nwAzqN0nx5j1Da+RP2HPH+UJRvTmB6rXkT/HOF6qTqgg4nJHydjQ1vRUyakiHipJt\n9rxlxQZrSurd+gaCFCtu0Ny6x99geJ+wOKgsPdECgYBvlSyOGrmPcXUYnGmNOv04\n6O77Mgb3VX8sQTiy3UO5F/ZjO5iFdKTl6GLFUhrXYO9ol9JgOF8yAyQHcSM7pRMT\nMXMr99x8BngTVb5LhU/TSiOHWDJYhowBAoaJd5BgPcuS1clSV5gef0/AaqPg4GIu\ngPT0b4zlkWI3y/6dm0RQKw==\n-----END PRIVATE KEY-----\n",
  }),
  databaseURL: 'https://bbiyak-b8f1d-default-rtdb.firebaseio.com'
});

const db = admin.database();
const dbRef = ref(getDatabase());

set(ref(database, '/bbiyak/A'), '미소');   //'set'함수 사용하여 firebase realtime database의 경로 'model'에 'sowon'이라는 값 설정
set(ref(database, '/bbiyak/A'), '1237');

get(child(dbRef, 'Player')).then((snapshot) => {   //get함수와 child 함수를 사용하여 db에서 'Player'경로에 대한 스냅샷을 가져옴
  if (snapshot.exists()) {   //스냅샷이 존재하면 해당 값 콘솔에 출력 //여기서 스냅샷은 db에서 가져온 데이터의 현재 상태를 나타냄, 이 객체를 통해 데이터를 읽고 사용 가능
    console.log(snapshot.val()); 
  } else {   //스냅샷 없으면 "No data abailable" 출력
    console.log("No data available");
  }
}).catch((error) => {   //오류 발생하면 오류를 콘솔에 출력
  console.error(error);
});

const Ref = ref(getDatabase(), 'prescription');

onValue(Ref, (snapshot) => {
  const data = snapshot.val();
  console.log("Changed --> " + data);
  client.publish("node", data);
});



// const express = require('express');
// const path = require('path');

// const app = express();
// app.set('port', process.env.PORT || 3000);

// app.get('/', (req, res) => {
//     //res.send('Hello, Express');
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(app.get('port'), () =>{
//     console.log(app.get('port'), '번 포트에서 대기 중');
// });
//package main부분의 파일명과 일치해야함. npm에서 이 파일이 패키지의 진입점임을 알 수 있음. 
// module.exports = () => {
//     return 'hello package';
// };

//-------------------------------------------------------------------------------------------------

// import { initializeApp } from "firebase/app"; //firebase 모듈 가져오기 
// import { getDatabase, ref, set, get, child } from "firebase/database";

// var admin = require("firebase-admin");
// var firestore = require("firebase-admin/firestore");

// var serviceAccount = require({
//     "type": "service_account",
//     "project_id": "bbiyak-b8f1d",
//     "private_key_id": "2e06de2bd1bf71f8cef2ec804788e9443e5df55a",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiZvp0FEDCGWHR\nom27KUm2o9UA3kUhJNsU+6PiMEM1ifPPiM0huGZZTH+0NE3gXK6yZMNPGDozeUFN\nIxZi+uKaLDM1Epla+GefnFFqsfv4MNDdiOL+yQtjQ3i0XCcu/U6T/dhggeSuNJOP\nMIBjiCf9Lbory0i8+TeEXyWDJSKl/3B6SSJq8t6qHaeBKVnB0feol6A+oPhOap2m\ngtF5TGa6+0h2zw+Z3U1YQoc7HIQgq6/kbS5pAFFeD60hHGj7alYSZ0HYCXAho51u\nyVLK/PwjRVvVVSnJwn+NjBDVFin1wtPAFRzXWpfR5qVR+imheCcOxO+b4oi/hYva\nVxNEfZ79AgMBAAECggEAJ80AFYG/KzKoSAW8SdHBGItHURqoK4rKTHatf+ofFph0\nEckvqNN19e2rIIFvEoz0XZEXUqOX4/SUHfD69BATiABMHnYr8mENmE7pnzH2lCl2\njsyVASdJbK7k/qLVEY2P+/IK3QAIiO8muMGEvZ/pWQGjbkc4UOPtCLp+yYjI2JCA\n/3FjlfkacNWraYATFgOFN+jwuLG1odc2L8F5apTGZ+Q+Ul1W50yqZIxqqgNgZ9CO\nQuNUJKbzUnwWckxDSgq/iI9VFB7I5RyPTeOTPRO4G434GSZU+2u6ZhmiLSrso945\nejfLGorspJI5zkTQrEuUQAIDO+Ok6jwiasCmLWiZAQKBgQDc5OPafFFTBdlGGr0E\nJi+5OEW8o2i+VNhs2/p5jw3ZTMaXcU8Oi3+hl2t+j4yNnp9FJm3c4uqE8nNidPPs\nN3w7m/5s1QG3dyb0AanXbrBrJK7rLUPfE2KHfR2CY+2CNKYoU9SjflG/o4uKDrUL\nZ6VZrwTB/NWY8FOTjORSwJsWfQKBgQC8Nla8hrUclOBih265TabcyIGhqFy6m48V\nBLbhvINYIPLKFVtC1UOn5Iejv0kwMfkQ7aUOkMEwKn6G9mvd8moxdQyDQT3A4EXf\nrrqORwN581+f00dQaA56JJgGS+iLd2XCV/s/OMpABaJvLig++GII8549pCs3K0O3\nHWpy9NSSgQKBgQCeLOUgYd8WNVz1f1YUb4fC+RGu19C8YiMsKIV+oDqJfRnD/iZf\nQvMc8kHOOdqq2ogwSylmf7Lxim+ndBnq73xtbvHMWudEyfTBy6MkGiYIQxdiXmJ4\njfgDD0ufQBEmKK9Gt2jPvjepo+Ha9VcdGJXl15bvli4ZuxYN1Vj2DOfBPQKBgQCK\nO8a8tJt0oIulEh9qjfPOGJ3NI6DnlbUjFNFVPmWhZqGrdsAOeCA2wYw14hpZAXsS\nydf+uKaLP8qqSXa0DoWcSYGlLVezv4TSYry2HsYY3X0QH9cy4Row74uQpFPpiwn8\nES6BIq65EupYiigZB8jJFlTUpSzwWiBj74DtaZBvAQKBgEmFI0r7VfIfQklllYo1\n0V+CtWiKoku8QUThfYYINCujYo4QfVpuZu4j3Ch+uihNsi/ZtN3qCE1YNsJ1PUSk\n0I2hOmv7t4o7QNnKS7CJLPQu0zEcWU3CyuN28AhaIB8LbtT1Q7VNa00Uom+aiT5d\npV5JLAEeZk9a+enmfoeAM9qf\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-ex31x@bbiyak-b8f1d.iam.gserviceaccount.com",
//     "client_id": "101253988669399701722",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ex31x%40bbiyak-b8f1d.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
//   });

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = firestore.getFirestore();

// test();

// async function test() {
//   db.collection("cities").doc("Seoul").set({
//     name: "Seoul",
//     state: "CA",
//     country: "Korea"
//   });
// }