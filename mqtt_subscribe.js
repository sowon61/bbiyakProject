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

  // 특정 주제(Topic)를 구독
  const topic = 'bbiyak'; // 구독할 주제로 변경
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`주제: ${topic}를 구독합니다.`);
    } else {
      console.error(`주제 구독 오류: ${err}`);
    }
  });
});

// MQTT 메시지를 수신할 때 실행
client.on('message', (topic, message) => {
  console.log(`주제: ${topic}, 메시지: ${message.toString()}`);
});

// MQTT 연결 오류 처리
client.on('error', (err) => {
  console.error('MQTT 연결 오류:', err);
});
