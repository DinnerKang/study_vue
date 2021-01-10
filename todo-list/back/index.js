const express = require('express');
const cors = require('cors');
const http = require('http');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

let user = [];
const privateKey = 'dinner';

app.post('/signUp', (req, res) => {
    console.log('회원 추가: ', req.body);
    user.push(req.body);
    console.log('회원: ', user);
    return res.json({ result: 'success' });
});
app.post('/emailLogin', (req, res) => {
    if (user.filter(i => i.email === req.body.email && i.password === req.body.password).length === 0) {
        console.log('아이디 없듬');
        return res.json({ result: '땡' });
    }
    const token = jwt.sign({ 
        email: req.body.email,
        info: '토큰에 넣고싶은거',
     }, privateKey, { expiresIn: '1d' });
     console.log('성공 ID: ', req.body.email);
    return res.json({ token });
});

http.createServer(app).listen(5000, () => {
    console.log('서버 시작');
});