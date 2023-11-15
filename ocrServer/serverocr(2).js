const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// 이미지를 저장할 디렉토리
const uploadDirectory = path.join(__dirname, 'uploads');

// POST 요청을 처리할 수 있도록 bodyParser 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 이미지 업로드를 위한 미들웨어 설정
app.use('/uploads', express.static('uploads'));

// 이미지 업로드 핸들러
app.post('/processImage', (req, res) => {
    try {
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory);
        }

        if (req.body && req.body.image) {
            const base64Image = req.body.image;
            const decodedImage = Buffer.from(base64Image, 'base64');
            const imageName = `image_${Date.now()}.jpg`;
            const imagePath = path.join(uploadDirectory, imageName);

            fs.writeFile(imagePath, decodedImage, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: '이미지 저장 중 오류가 발생했습니다.' });
                }

                // 이미지를 성공적으로 저장한 경우 처리
                // 여기에서 이미지를 OCR 또는 다른 작업에 사용할 수 있습니다.
                return res.status(200).json({ message: '이미지가 성공적으로 업로드되었습니다.' });
            });
        } else {
            res.status(400).json({ message: '이미지 데이터가 없습니다.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});