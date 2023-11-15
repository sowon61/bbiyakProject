import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import mqtt from 'mqtt';

//const mqtt = require('mqtt');

// MQTT 브로커 주소 설정
const brokerAddress = 'mqtt://223.195.194.41'; // Mosquitto 브로커 주소로 변경

// MQTT 클라이언트 생성
const client = mqtt.connect(brokerAddress);

// MQTT 브로커에 연결되었을 때 실행
client.on('connect', () => {
  console.log('MQTT 브로커에 연결되었습니다.');

  // 특정 주제(Topic)로 메시지 발행
  const topic = 'wish'; // 발행할 주제
  const message = 'hello'; // 발행할 메시지 내용

  // 메시지 발행
  client.publish(topic, message, (err) => {
    if (!err) {
      console.log(`주제: ${topic}, 메시지 발행 완료: ${message}`);
    } else {
      console.error(`메시지 발행 오류: ${err}`);
    }

    // MQTT 클라이언트 연결 종료
    client.end();
  });
});

// MQTT 연결 오류 처리
client.on('error', (err) => {
  console.error('MQTT 연결 오류:', err);
});
