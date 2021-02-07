const express = require('express');
const cors = require('cors');
const http = require('http');
const jwt = require('jsonwebtoken');

const mySql = require('mysql');
const pool = mySql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'testDB',
});

const app = express();
app.use(cors());
app.use(express.json());

const privateKey = 'dinner';
const refreshKey = 'refresh';

app.post('/signUp', (req, res) => {
    console.log('회원 추가: ', req.body);
    const data = {
        email: req.body.email,
        password: req.body.password,
    };
    pool.getConnection((err, conn) => {
        if (!err) {
            conn.query('INSERT INTO user (email, password) VALUES (?,?)', [data.email, data.password], (err, rows) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(500).json({ msg: '중복 아이디' });
                    } else {
                        return res.status(500).json({ result: err });
                    }
                };
                return res.json({ result: 'success' });
            });
        }
        conn.release();
    });
});
app.post('/emailLogin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(500).json({ result: '아이디나 비밀번호를 입력해주세요.' });
    pool.getConnection((err, conn) => {
        if (!err) {
            conn.query('SELECT * FROM user WHERE email = ?', [email], (err, rows) => {
                if (err) return res.status(500).json({ result: err });
                if (rows.length === 0) return res.status(500).json({ result: '아이디가 없습니다.' });
                if (rows[0].password === password) {
                    const token = jwt.sign({ 
                        email: req.body.email,
                        info: '토큰에 넣고싶은거',
                     }, privateKey, { expiresIn: '60s' });
                     const refreshToken = jwt.sign({ 
                        email: req.body.email,
                        info: '리프레시토큰입니다',
                     }, refreshKey, { expiresIn: '3d' });

                     conn.query('UPDATE user SET access_token = ?, refresh_token = ? WHERE email = ?', [token, refreshToken, email], (err, rows) => {
                        if (err) return res.status(500).json({ result: err });
                     });

                    return res.json({ msg: '로그인 성공', result:  { access_token: token, refresh_token: refreshToken} });
                } else {
                    return res.status(500).json({ result: '비밀번호가 틀렸습니다.' });
                }
            });
        }
        conn.release();
    });
});

app.get('/testAPI', (req, res) => {
    const token = req.headers['access-token'];
    // 토큰 검증
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) return res.status(401).json({ result: err });
        return res.json({ msg: '성공', result:  { access_token: '123' } });
    });
});
app.get('/refreshToken', (req, res) => {
    const token = req.headers['refresh-token'];
    console.log('refresh', token);
    // 토큰 검증
    jwt.verify(token, refreshKey, (err, decoded) => {
        if (err) return res.status(500).json({ result: err });
        const token = jwt.sign({ 
            email: req.body.email,
         }, privateKey, { expiresIn: '60s' });
         return res.json({ msg: '리프레쉬 성공', result:  { access_token: token } });
    });
});

http.createServer(app).listen(5000, () => {
    console.log('서버 시작');
});