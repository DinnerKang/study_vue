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
                     }, privateKey, { expiresIn: '1d' });

                     conn.query('UPDATE user SET access_token = ?, refresh_token = ? WHERE email = ?', [token, token, email], (err, rows) => {
                        if (err) return res.status(500).json({ result: err });
                     });

                    return res.json({ msg: '로그인 성공', result: token });
                } else {
                    return res.status(500).json({ result: '비밀번호가 틀렸습니다.' });
                }
            });
        }
        conn.release();
    });
});

http.createServer(app).listen(5000, () => {
    console.log('서버 시작');
});