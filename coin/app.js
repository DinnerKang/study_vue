const express = require('express');
const request = require('request')
const { v4: uuidv4 } = require("uuid")
const sign = require('jsonwebtoken').sign

const access_key = 'onbiXafZDglpOxjNC7ECsIK5EkUt0823tTmZpj0D';
const secret_key = 'PC33bTgtkEdExeHDm4lkJoS3jBxg7UsP6Dxm7LoZ'
const server_url = 'https://api.upbit.com';
const app = express();

let token = ''; 

const initLogin = () => {
  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
  };
  token = sign(payload, secret_key)

  const options = {
      method: "GET",
      url: server_url + "/v1/accounts",
      headers: {Authorization: `Bearer ${token}`},
  };

  request(options, (error, response, body) => {
      if (error) throw new Error(error)
  })
};

app.get(`/`, (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

app.get("/sound.MP3", (req, res)=>{ 
  res.sendFile(__dirname + '/sound.MP3');
});
app.get("/bird.MP3", (req, res)=>{ 
  res.sendFile(__dirname + '/bird.MP3');
});

app.get('/token', (req, res) => {
  initLogin();

  res.json({
    token,
  });
});

const httpServer = app.listen(3000, () => {
  console.log('open port 3000');
});
