const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/signUp', (req, res) => {
    console.log(req.body);
    return res.json({ result: 'success' });
})
app.post('/emailLogin', (req, res) => {
    console.log(req.body);
    return res.json({a: 1});
});

http.createServer(app).listen(5000, () => {
    console.log('서버 시작');
});