import admin from "firebase-admin";
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

const app = initializeApp(firebaseConfig);  //firebase 앱 초기화, 이때 firebase구성 객체를 전달함.
const database = getDatabase(app);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "bbiyak-b8f1d",
    clientEmail: "firebase-adminsdk-ex31x@bbiyak-b8f1d.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKnpzrGU/cKFLN\ndbzdsXg6u15aw1ib+dbEnzW0vBmwZ9lib3ecTiROYSabBZqGHlfcqU2/r/yAqIFv\nX7S9aJkpllyTWIqAD01SznNV6Aaf+6pI4O//K8AA5zVIQOpnFjR69DRp3G5AhY0L\n0/vPX1/7Svq0f6QKnSg9ZNscqeIGmoKAgWB87ySiHOyVWCLBQ3OzR4KnOM3zqzpZ\nsdsH/ek71n/YNun1E+JROLzni7W5Lmg1Pb150mEJtxepoZFps5dZBdHKG67xoB+o\no5GM6vfaKX29vNVLiB17iOGLaX1ipzO26o2RENP/BJVufpnSJE0DUtSYDtZDtxuw\nvu8Dq0nlAgMBAAECggEAA4KEXtkxJjPnnUoDE8cJeWD6BTH5lLga9Yx5enBAtKrT\n2+3o4UMEQ3xQ1iIed2DKrlabc2zZv6PLnDGI+Lf5YTxKzb2cppO9R+guHMiYZsiN\n/lWxKpcoLAvVQzNmrBL5JUEaMFRCb6kwlIofREwXZku59Ir6fTmUMx4OYpx5vxoB\npURMP2OYzWfX0rKDF/57OuCl7Q4VWlBLb3Fr3+jKM/IM3ipt8KyB4AeiRm+PCj/S\n2wbNxULJo9zXuxfg47zCkyiqMqDAxZcVsf4pVbI9t9JRFKrSPIqslT4nGYFS6AQy\nmKQVyC0ozpoyXFiVcJe3VBdH+RERMWgq9M1FMe76EQKBgQD99EqryOTkR7ms0heA\nvN2UkuCgKvY2sZxpxHmG7BFFN9JZtoY3lzbt2VSNPy1lGfTfr2jzUtUIUoQaMHLh\nR7NOtHJn3nI9t4jxmqbQ5rrUupbdacKq+DQui7ADmAmTPMbOa5dUyXt/PObdxkYV\noQuyqKpKJo+ebVkFdK0CSHqTlQKBgQDMQHVHdlgeaiPU7Cllo02F+QXoPwjTtywh\nUKTHfbLGPR+lUmNFCCDR2HXKgTmevrZ+WkYJcnaE77DpTjMlQSSTTU8s+CHFCTBt\nknHwblwENy+nRAuM9OtisasgNl2fiwvyxrCKS68KvCOzlqTq+v9Aeqef2AjT8j+P\n9KXapSpJEQKBgBlxbkHDwNr2LK4Z5mzpfzGxfXvOkhhstwUJwDs6T4ilzRdb6BqN\ntd0ilwwHtl6YuSXoBxXJyLoquj19eSUE7/wErCmn6b4xMzExk2D+nN1PTGomfHBw\nqZm4OQxDIUJ1Jl3r/Z9rCEp5KZAymzbziZ5+s4D2WBFBV1fqlqLR7CX5AoGAJrxu\nwY/LJHGCvCXRsAnpcOgKW8JgnS5W+zZ9GaxYFEqRTtwyIWxqNQH1TON3FwkaORpL\nwAzqN0nx5j1Da+RP2HPH+UJRvTmB6rXkT/HOF6qTqgg4nJHydjQ1vRUyakiHipJt\n9rxlxQZrSurd+gaCFCtu0Ny6x99geJ+wOKgsPdECgYBvlSyOGrmPcXUYnGmNOv04\n6O77Mgb3VX8sQTiy3UO5F/ZjO5iFdKTl6GLFUhrXYO9ol9JgOF8yAyQHcSM7pRMT\nMXMr99x8BngTVb5LhU/TSiOHWDJYhowBAoaJd5BgPcuS1clSV5gef0/AaqPg4GIu\ngPT0b4zlkWI3y/6dm0RQKw==\n-----END PRIVATE KEY-----\n",
  }),
  databaseURL: 'https://bbiyak-b8f1d-default-rtdb.firebaseio.com'
});

const db = admin.database();

// prescription 테이블에 데이터 추가
const prescriptionRef = db.ref('prescription');
const newPrescriptionRef = prescriptionRef.push();
newPrescriptionRef.set({
  prescriptionNo: '새로운 처방전 교부번호 값',
  hospitalName: '새로운 병원명칭 값'
});

prescriptionRef.on('value', (snapshot) => {
  
  const data = snapshot.val();

  console.log('changed-->', data);
  client.publish("node"+ data);
});


// medicine 테이블에 데이터 추가
const medicineRef = db.ref('medicine');
const newMedicineRef = medicineRef.push();
newMedicineRef.set({
  prescriptionNo: '새로운 처방전 교부번호 값',
  medicineNo: '새로운 약 번호 값',
  medicineName: '새로운 약 명칭 값',
  daysC: '새로운 일수 값',
  daysNo: '새로운 횟수 값',
  daysTotal: '새로운 총횟수 값',
  daysVolume: '새로운 용량 값'
});

medicineRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed-->', data);
  client.publish("node"+ data);
});


// medicationP 테이블에 데이터 추가
const medicationPRef = db.ref('medicationP');
const newMedicationPRef = medicationPRef.push();
newMedicationPRef.set({
  medicineNo: '새로운 약 번호 값',
  daysC: '새로운 일수 값',
  daysNo: '새로운 횟수 값',
  daysTotal: '새로운 총횟수 값',
  medicationNo: '새로운 복약기 번호 값',
  startD: '새로운 시작일 값'
});

medicationPRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed-->', data);
  client.publish("node"+ data);
});

// notificationI 테이블에 데이터 추가
const notificationIRef = db.ref('notificationI');
const newNotificationIRef = notificationIRef.push();
newNotificationIRef.set({
  autoNo: '새로운 자동번호 값',
  medicationNo: '새로운 복약기 번호 값',
  date: '새로운 일시 값',
  time: '새로운 알림 시각 값',
  notificationC: '새로운 알림 횟수 값',
  medicationT: '새로운 복약 시기 값',
  repatternT: '새로운 재알람 패턴 시간 값'
});

notificationIRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed-->', data);
  client.publish("node"+ data);
});

// timeing 테이블에 데이터 추가
const timeingRef = db.ref('timeing');
const newTimeingRef = timeingRef.push();
newTimeingRef.set({
  time: '새로운 알림 시각 값',
  medicationT: '새로운 복약 시기 값'
});

timeingRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed-->', data);
  client.publish("node"+ data);
});

// sideeffectP 테이블에 데이터 추가
const sideeffectPRef = db.ref('sideeffectP');
const newSideeffectPRef = sideeffectPRef.push();
newSideeffectPRef.set({
  medicationNo: '새로운 복약기 번호 값',
  medicationT: '새로운 복약시기 값'
});

sideeffectPRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed-->', data);
  client.publish("node"+ data);
});

// medication 테이블에 데이터 추가
const medicationRef = db.ref('medication');
const newMedicationRef = medicationRef.push();
newMedicationRef.set({
  medicationNo: '새로운 복약기 번호 값',
  medicationYn: '새로운 복약 여부 값',
  activate: '새로운 활성화 여부 값'
});

medicationRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed-->', data);
  client.publish("node"+ data);
});

// sideeffectIn 테이블에 데이터 추가
const sideeffectInRef = db.ref('sideeffectIn');
const newSideeffectInRef = sideeffectInRef.push();
newSideeffectInRef.set({
  medicineNo: '새로운 약 번호 값',
  date: '새로운 날짜 값',
  medicationT: '새로운 복약시기 값',
  sideeffectInfo: '새로운 부작용입력 값'
});

sideeffectInRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed-->', data);
  client.publish("node"+ data);
});

// get(child(dbRef, 'Player')).then((snapshot) => {   //get함수와 child 함수를 사용하여 db에서 'Player'경로에 대한 스냅샷을 가져옴
//   if (snapshot.exists()) {   //스냅샷이 존재하면 해당 값 콘솔에 출력 //여기서 스냅샷은 db에서 가져온 데이터의 현재 상태를 나타냄, 이 객체를 통해 데이터를 읽고 사용 가능
//     console.log(snapshot.val()); 
//   } else {   //스냅샷 없으면 "No data abailable" 출력
//     console.log("No data available");
//   }
// }).catch((error) => {   //오류 발생하면 오류를 콘솔에 출력
//   console.error(error);
// });
