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
    console.log(req.body);
    user.push(req.body);
    console.log(user);
    return res.json({ result: 'success' });
})
app.post('/emailLogin', (req, res) => {
    console.log(req.body);
    const token = jwt.sign({ 
        foo: 'bar',
     }, privateKey, { expiresIn: '1d' });
    return res.json({a: token});
});

http.createServer(app).listen(5000, () => {
    console.log('서버 시작');
});