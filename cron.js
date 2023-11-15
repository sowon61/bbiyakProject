import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
// import cron from 
const cron = import("node-cron");

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const fetchDataFromFirebase = () => {
  const dbRef = ref(database, "/bbiyak/medicine"); // 실제 데이터 경로로 변경 //여기부분 모르겠음//데이터베이스경로를 쓰라는데
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Fetched data:", data);
        // 여기에서 데이터를 원하는 방식으로 처리 가능
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// 분 시 날 월 요일 
cron.schedule("58 15 24 9 *", () => { 
  console.log("Running Cron job to fetch data from Firebase...");
  fetchDataFromFirebase();
});
