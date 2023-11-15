import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import mqtt from 'mqtt';

var client = mqtt.connect('mqtt://223.195.194.41');
client.publish("bbiyak1004", "T1");
client.subscribe("bbiyak");
client.on('message', (topic, message) => {
  console.log(`주제: ${topic}, 메시지: ${message.toString()}`);
});

const firebaseConfig = {
  apiKey: "AIzaSyBj4iybDOsYcIhk3SNAZuz-WcqRwHbyyv4",
  authDomain: "bbiyak-12cb5.firebaseapp.com",
  databaseURL: "https://bbiyak-12cb5-default-rtdb.firebaseio.com",
  projectId: "bbiyak-12cb5",
  storageBucket: "bbiyak-12cb5.appspot.com",
  messagingSenderId: "221022930944",
  appId: "1:221022930944:web:d618cf2ffa45cf8decf0e5",
  measurementId: "G-PX15MD2VP0"
};

const app = initializeApp(firebaseConfig);  //firebase 앱 초기화, 이때 firebase구성 객체를 전달함.
const database = getDatabase(app);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "bbiyak-12cb5",
    clientEmail: "firebase-adminsdk-7zqsf@bbiyak-12cb5.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDAG51yY+rZ31iP\nWhfM0VhhCKGoLQx5MJHW+TW4J/ml/eHQGRc2maJbRh0Rg+waaKQv+OdO41FVMOMM\nGhrBcU0F8tyP7M2LkVBn9O5ToRRZ0I5nYuKFK6Xbwbd2RFnZ7ECCmbAyewZeDXZz\nVSHoPFa5QGGt7TxV/y0B5LHj7I3IQn5+VcQ/Y0TV2QXwPKUSPjhHsBuFWi7uZDc1\nu8Soqd21PEpRtxcg8T9ifIHoU4VaodH5k2szAXDebXiefa15nuOoi6IoaWQHUUsz\nktPB5QL+0KHgO8QQpv5ZgKnqU/uifmRSDBxQ3imIjFgUJeHHb+YX6zopoFMT0NzZ\n82m+p/ZpAgMBAAECggEACpxL2zJVGaEKJ2rKtzuV1dAv+5W3Y2cxGu5LTwdYNNib\ntQ55t4CPVNq/xsSiUQgYD3VAM11/U8T+OWAku6v6HNq/32wtIykMx50h37kdImPQ\nRboSuFfDkqp1q2DVlKGFo6EA+BzO6nl0YiTg2U6h3JwHeR+KDlbogbsDr0rUvuuC\nyA11UIRyoLik+0dBWavIcJC4zCeGs2pGa+dCxIvdmUneNgxRdbHh5pKZUyIEK+/D\n4uBYnLQocP1IOB8abRevjNoKJOq/9W9uzu4/AfrN7eIpXEFXs+Z4zgbic78XOzKe\n2FHu5n2/SqQef/4CiIz8ZJoi6drgoRVYh/iy7sb4IQKBgQDiEWzGyGvwzLP3NfKL\nLF3mguTgZyzDBsMnM9tprMmvs1ZyV78RjrFWB92YFaoyr0O3qR39bf0kG2EWOcRY\n2XoJiNFpy6qxxQVsu6SgeMEZDujJeqkd3KqGzAQxYbuUUjIu017aSYsIdTc9Pmsr\nOtw4/5s27bq68klAZrfzY2hRUQKBgQDZixwPxBtDVUbQP9DNStd9JoENVVqbK2/H\nsrBgFu9/qf3IkJJWy720GkfKLPNiRGYyCCnKjgc0+IjcJm3vtR+FITlT2+UXD8pA\nbf1yDd6zM6tuNj6mnDg/t4SI5Y7N8qcw9H/fmuVPwrtp3C6gX4Zd02iR9C5DbNV8\nozyr4LpNmQKBgCKgNJ8F17KcR/xXYPz8IK3L4q6UXwDIKl/4y2SWOJYWy+jbk8Jm\nrrbUoZZHyzfULHUXDCbjD+DV6Lr0wiQxu0V2lUy1C0ILQVd0LjT+CeWCqRkjFoAi\namQXH5VIuOhw5orRiTe6B/eVrI5O3y9R5qU8UVPKec1kit+4W/iFg1bhAoGAZIIQ\nAfzB99cDc524U9EbRFgw0b84sG5eI66cLJkMKDia5zpcUjuptvdZacBg5mrhqIX7\nAPmjvMaDPOuIaXKOUIzsFqGG86O49xGaQkLEPJlHwBDR21pb5pxcYH9m/iH5OvYL\nynyfK721pxAyfqgDxX+yVZSydzZmYEJu+p5GlSkCgYAyQZciQIjQ0GEZuLGpte7+\nYRKTVhSf0G5mkOkPmT+MeBOU6V1WHncebapZjnha61VR5IV3Nia7bfEyDQEYmnjK\ngdZkyjboDUSwJ0VjKC0/pOpSMNw77cZ+0Q5o29LxAjnuw6qPXugbzTAUyz7n06WR\nxJh3Dla8u+z1teoDvmsp0Q==\n-----END PRIVATE KEY-----\n",
  }),
  databaseURL: 'https://bbiyak-12cb5-default-rtdb.firebaseio.com'
});

const db = admin.database();

// user 사용자 테이블에 데이터 추가 
const userRef = db.ref('user');
const newUserRef = userRef.push();
newUserRef.set({
  userID: '사용자 아이디',
  userPw: '사용자 비밀번호'
});

// prescription 처방전 테이블에 데이터 추가
const prescriptionRef = db.ref('user/prescription');
const newPrescriptionRef = prescriptionRef.push();
newPrescriptionRef.set({
  // userID: '사용자 아이디',
  // prescriptionNo: '처방전 교부번호',
  // hospitalName: '병원 명칭'
});

prescriptionRef.on('value', (snapshot) => {
  
  const data = snapshot.val();

  console.log('changed --> prescription table', data);
  client.publish("node"+ data);
});


// medicine 의약품 테이블에 데이터 추가
const medicineRef = db.ref('user/medicine');
const newMedicineRef = medicineRef.push();
newMedicineRef.set({
  // prescriptionNo: '처방전 교부번호',
  // medicineNo: '약 번호',
  // medicineName: '약 명칭',
  // daysC: '일수',
  // daysNo: '횟수',
  // daysTotal: '총 횟수',
  // daysVolume: '용량'
});

medicineRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed --> medicine table', data);
  client.publish("node"+ data);
});


// medicationP 복약 패턴 테이블에 데이터 추가
const medicationPRef = db.ref('user/medicationP');
const newMedicationPRef = medicationPRef.push();
newMedicationPRef.set({
  medicineNo: '약 번호',
  daysC: '일수',
  daysNo: '횟수',
  daysTotal: '총 횟수',
  medicationNo: '복약기 번호',
  startD: '시작일'
});

medicationPRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed --> medicationP table', data);
  client.publish("node"+ data);
});

// notificationI 알림정보 테이블에 데이터 추가
const notificationIRef = db.ref('user/notificationI');
const newNotificationIRef = notificationIRef.push();
newNotificationIRef.set({
  autoNo: '자동번호',
  medicationNo: '복약기 번호',
  date: '일시',
  notificationC: '알림 횟수',
  medicationM: '아침',
  medicationL: '점심',
  medicationD: '저녁',
  medicationS: '취침 전',
  repatternM: '재알람 패턴 시간',
  repatternL: '재알람 패턴 시간',
  repatternD: '재알람 패턴 시간',
  repatternS: '재알람 패턴 시간'
});

notificationIRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed --> notificationI table', data);
  client.publish("node"+ data);
});

// timing 알람시간 테이블에 데이터 추가
const timingRef = db.ref('user/timing');
const newTimingRef = timingRef.push();
newTimingRef.set({
  medicationM: "알림시각",
  medicationL: "알림시각",
  medicationD: "알림시각",
  medicationS: "알림시각"
});

timingRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed --> timing table', data);
  client.publish("node"+ data);
});

// sideeffectP 복약기 패턴 테이블에 데이터 추가
const sideeffectPRef = db.ref('user/sideeffectP');
const newSideeffectPRef = sideeffectPRef.push();
newSideeffectPRef.set({ //내복약, 서랍형, 약통 이렇게 들어감
  // medicationNo: '복약기 번호',
  // medicationM: '아침',
  // medicationL: '점심',
  // medicationD: '저녁',
  // medicationS: '취침 전'  
});

sideeffectPRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed --> sideeffectP', data);
  client.publish("node"+ data);
});

// medication 복약기 테이블에 데이터 추가
const medicationRef = db.ref('user/medication');
const newMedicationRef = medicationRef.push();
newMedicationRef.set({
  medicationNo: '복약기 번호',
  medicationYn: '복약 여부',
  activate: '활성화 여부'
});

medicationRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed --> medication table', data);
  client.publish("node"+ data);
});

// sideeffectIn 부작용 입력 테이블에 데이터 추가
const sideeffectInRef = db.ref('user/sideeffectIn');
const newSideeffectInRef = sideeffectInRef.push();
newSideeffectInRef.set({
  date: '',
  checkbox1: 'true',
  checkbox2: 'true',
  checkbox3: 'true',
  checkbox4: 'true',
  checkbox5: 'true',
  checkbox6: 'true',
  checkbox7: 'true',
  checkbox8: 'true',
});

sideeffectInRef.on('value', (snapshot) => {
  
  const data = snapshot.val();
  
  console.log('changed --> sideeffectIn table', data);
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
