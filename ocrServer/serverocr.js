// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// const { exec, ChildProcess } = require('child_process');

import express from 'express';
import bodyParser from 'body-parseArgs';
import fs from 'fs';
import path from 'path';
import exec from 'child_process';

const app = express();

const uploadDirectory = path.join(__dirname, 'uploads');

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

app.use('/uploads', express.static('uploads'));

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

                const pythonScript = './scan.py';
                const command = `python ${pythonScript} -1 ${imagePath}`;

                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Python 스크립트 실행 오류: ${error.message}`);
                        return res.status(500).json({ message: 'Python 스크립트 실행 중 오류가 발생했습니다.' });
                    }

                    return res.status(200).json({ message: '이미지가 성공적으로 업로드되었고, 처리가 완료되었습니다.' });
                });
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
