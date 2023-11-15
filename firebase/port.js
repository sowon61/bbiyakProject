const express = require('express');
const app = express();

const port = 3000;

const server = require('./service.js');

app.use('/',server);

app.use((req, res, next) => { 
    res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});