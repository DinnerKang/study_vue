'use strict';

const cheerio = require('cheerio');
const axios = require('axios');
const firebase = require('firebase/app');
require('firebase/database');
const config = require('./firebaseConfig');
firebase.initializeApp(config);

module.exports.hello = async (event, ctx, cb) => {
  const title = [];
  const artist = [];
  const result = {};
  const rank = 100;
  const getHtml = async () => {
    try {
        return await axios.get('https://www.melon.com/chart/');
    } catch (err) {
        console.error(err);
    }
  }

  const html = await getHtml();
  const $ = cheerio.load(html.data);
  for (let i = 0; i < rank; i++) {
      $('.ellipsis.rank01 > span > a').each( function(idx){
        const title_info = $(this);
        const title_info_text = title_info.text();
        title[idx] = title_info_text;
      })
  }
  
  for (let i = 0; i < rank; i++) {
      $('.checkEllipsis').each(function(idx){
        const artist_info = $(this);
        const artist_info_text = artist_info.text();
        artist[idx] = artist_info_text;
      })
  }
  for (let i = 0; i < rank; i ++) {
      result[i] = {
           title: title[i],
           artist: artist[i],
      }
  }
  
  const registDate = String(new Date());
  firebase.database().ref(`melon`).set({
      result,
      registDate,
  });
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: [result, new Date],
      input: event,
    }),
  };
  cb(null, response);
};
