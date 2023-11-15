import cron from "node-cron";


cron.schedule("48 16 24 9 *", () => {
  const db = admin.database();
  const ref = db.ref("/bbiyak/medicine/daysC"); // 가져올 데이터의 경로

  ref.once("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // 데이터 파싱 예제
        const medicineName = data.medicineName;
        const daysC = data.daysC;
        const medicineNo = data.medicineNo;
        const prescriptionNo = data.prescriptionNo;
  
        console.log("medicineName:", medicineName);
        console.log("daysC:", daysC);
        console.log("medicineNo:", medicineNo);
        console.log("prescriptionNo:", prescriptionNo);
  
        // 원하는 작업을 수행하세요
      } else {
        console.error("데이터가 없습니다.");
      }
  }, (error) => {
    console.error("Firebase에서 데이터 가져오기 실패:", error);
  });
});
