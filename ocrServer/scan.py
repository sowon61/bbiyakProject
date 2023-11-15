from transfrom import four_point_transform
from skimage.filters import threshold_local

import numpy as np
import argparse
import cv2
import imutils
import requests
import uuid
import time
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import datetime


ap = argparse.ArgumentParser()
ap.add_argument('-1', '--images', required=True,
                help='Path to the image to be scanned')
args = vars(ap.parse_args())


image = cv2.imread(args["images"])
ratio = image.shape[0] / 500.0
orig = image.copy()
image = imutils.resize(image, height = 500)
image = imutils.rotate(image, 90)


gray = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
gray = cv2.GaussianBlur(image,(5,5), 0)

edged = cv2.Canny(gray, 75, 200)

print('STEP 1: Edge detecion')


cnts = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
cnts = imutils.grab_contours(cnts)
cnts = sorted(cnts, key = cv2.contourArea, reverse = True)[:5]

for c in cnts:
	peri = cv2.arcLength(c, True)
	approx = cv2.approxPolyDP(c, 0.02 * peri, True)
	if len(approx) == 4:
		screenCnt = approx
		break
print("STEP 2: Find contours of paper")



warped = four_point_transform(orig, screenCnt.reshape(4, 2) * ratio)

sharpening= np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
warped = cv2.filter2D(warped , -1, sharpening)
warped = cv2.cvtColor(warped, cv2.COLOR_BGR2GRAY)
warped = cv2.GaussianBlur(warped,(5,5), 0)
T = threshold_local(warped, 11, offset = 10, method = "gaussian")
warped = (warped > T).astype("uint8") * 255


file_name = str(uuid.uuid4())
image_file_name = file_name + '.jpg'
cv2.imwrite(image_file_name, warped)

print("STEP 3: Apply perspective transform")



#OCR
api_url = 'https://22867nvy9a.apigw.ntruss.com/custom/v1/25315/56a7ce454d8246990cc3ee3baeeabb7bba95fd331521455e6473fa63038eb26e/infer'
secret_key = 'U1hZYWNqZHBHUElOQ1lxWnFrTmxubU1maGpYa2NMTEo='

image_file = image_file_name
output_file = file_name + '.json'

request_json = {

    'images' : [
        {
            'format': 'jpg',
            'name': 'demo',
        }
    ],
    'requestId': str(uuid.uuid4()),
    'version': 'V2',
    'timestamp': int(round(time.time() * 1000))


}

payload = {'message': json.dumps(request_json).encode('UTF-8')}
files = [
  ('file', open(image_file,'rb'))
]
headers = {
  'X-OCR-SECRET': secret_key
}

response = requests.request("POST", api_url, headers=headers, data = payload, files = files)

res = json.loads(response.text.encode('utf8'))

img = cv2.imread(image_file)
roi_img = img.copy()



 

    
with open(output_file, 'w', encoding='utf-8') as outfile:
    json.dump(res, outfile, indent=4, ensure_ascii=False)
    
    
print("STEP 4: OCR End")

# Firebase 인증 키 파일의 경로 (다운로드한 JSON 파일)
cred = credentials.Certificate("./account-key.json")

# Firebase 앱 초기화
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://bbiyak-12cb5-default-rtdb.firebaseio.com'
})

# 업로드할 JSON 파일 경로
json_file_path = output_file

#데이터 정리를 위한 
fild = 0
a=0
i=7

for field in res['images'][0]['fields']:
    text = field['inferText']
    name = field['name']
   
    if text=='':
        break
    elif name =='prescriptionNo':
        
        # 사용자가 지정한 경로
        custom_path1 = "user/prescription/"+text+"/"
        custom_path2 = "user/medicine/"+text+"/"
      
        data_to_save1 = {
            name : text,
            'hospitalName': 'null'
        }
        # Firebase Realtime Database에 데이터 저장
        try:
            ref1 = db.reference(custom_path1)
   
            ref1.set(data_to_save1)
            print("데이터 저장 성공")
        except Exception as e:
            print(f"데이터 저장 실패: {e}")
    elif name =='hospitalName':
        
        data_to_save = {
            'hospitalName' : text
        }
        # Firebase Realtime Database에 데이터 저장
        try:
            ref = db.reference(custom_path1)           
            ref.update(data_to_save)
            print("데이터 저장 성공")
        except Exception as e:
            print(f"데이터 저장 실패: {e}")
    elif fild < i :
        custom_path = custom_path2+str(a)+"/" 
        data_to_save = {
            name : text
        }
        # Firebase Realtime Database에 데이터 저장
        try:
            ref = db.reference(custom_path)           
            ref.update( data_to_save)
        except Exception as e:
            print(f"데이터 저장 실패: {e}")
        print("데이터 저장 성공")
    else:
        a+=1
        custom_path = custom_path2+str(a)+"/" 
        data_to_save = {
            name : text
        }
        # Firebase Realtime Database에 데이터 저장
        try:
            ref = db.reference(custom_path)           
            ref.update( data_to_save)
        except Exception as e:
            print(f"데이터 저장 실패: {e}")
        i+=5
        
    fild+=1

current_datetime = datetime.datetime.now()
current_date = current_datetime.date()

# 현재 시간 출력 (시, 분)
current_time = current_datetime.time()
try:
    with open(json_file_path, 'r', encoding='utf-8') as json_file:
        json_data = json.load(json_file)
    
    # Firebase Realtime Database에 데이터 저장
    ref = db.reference('user/json/'+str(current_date)+'/' )  # 데이터를 저장할 경로 지정
    ref.update(json_data)
    
    print("JSON upload O")
except Exception as e:
    print("JSON upload error:", e)


print("STEP 5: firebase")
