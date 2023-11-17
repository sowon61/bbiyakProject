# bbiyakProject
장기복용자를 위한 스마트 복약 서비스를 개발했습니다.
![image](https://github.com/sowon61/bbiyakProject/assets/115778827/4211d8e8-8220-4cf3-9073-edcd0aa96a90)

먼저, 저희의 전체적인 프로젝트 구성내용입니다.
![image](https://github.com/sowon61/bbiyakProject/assets/115778827/d50bd625-2f19-49f0-aa32-d0dcaf6fa541)

(ppt만들기) + 폴더 넣으면서 기여도 같이 넣기 
- ocr 서버 코드
firebase 폴더
ocrServer 폴더

-센서 및 기기 코드
서랍형tray_ESP32_small 폴더
약통형bottle_ESP32_LDS 폴더
자동공급기형feeder_sample_ESP32 폴더

-Nodejs 서버 코드
bbiyakMain.js
mqtt_publish.js
mqtt_subscribe.js

-안드로이드 코드 



저희는 프로젝트 초기, 약 2-3개월 간 기존 시장 분석을 통해 문제점을 찾은 후 해결하는 방안을 찾아 나아갔습니다. 
![image](https://github.com/sowon61/bbiyakProject/assets/115778827/177faffa-2c46-41e4-b9a5-908a7bdd3106)

저희가 진행하는 서비스의 전체적인 프로세스 입니다. 
![image](https://github.com/sowon61/bbiyakProject/assets/115778827/0ced3b2c-26fd-4355-83af-0ead9c56c229)

초기의 시스템 기술 구조도이며 여러 분석과 탐색을 통하여 최종 결과물과는 다른 점이 있습니다. 
![image](https://github.com/sowon61/bbiyakProject/assets/115778827/06d5a6d6-b1fc-4f6a-bcf2-3b3c25556263)

초기 와이어프레임 입니다.
![image](https://github.com/sowon61/bbiyakProject/assets/115778827/bf1f216b-3c99-41fe-8acf-c3dbf412777a)

최종 설계된 DB입니다.
![image](https://github.com/sowon61/bbiyakProject/assets/115778827/45051531-c029-4078-b773-e4abd1d9b9c3)
<<firebase url 삽입>>

처방전 인식 기능을 구현, db에 전송까지 완료하였습니다. (코드는 ocrServer폴더에 있습니다.)
![image](https://github.com/sowon61/bbiyakProject/assets/115778827/5e1a64da-c5c4-4790-89f6-fa470ce3bf53)

또한 창업공모전 2차 심사 선발로 대전expo가서 전시할 수 있는 기회가 있었습니다. 그 당시 실시간 시연을 위해 만들었었던 node-red 화면입니다. 



최종 결과물인 제품입니다. 저희는 복약이 중요하신 모든 만성질환자 분들이 적절한 복용시기를 놓치지 않는 마음에서 개발하였습니다.
![image](https://github.com/sowon61/bbiyakProject/assets/115778827/8279e039-f132-4ea8-bd3f-6d85a46d6654)
