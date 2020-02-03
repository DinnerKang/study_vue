'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

axios.defaults.baseURL = 'https://vue-pwa-776e7.firebaseapp.com';
axios.defaults.headers['Accept'] = 'application/json, text/plain, */*';

module.exports.hello = async (event, ctx, cb) => {
  const title = [];
  const artist = [];
  const result = {};
  const rank = 100;
  const status = event.pathParameters.status;

  if (status !== 'deali') return cb(null, {statusCode: 400});

  const getHtml = async () => {
    try {
        return await axios.get('https://www.melon.com/chart/');
    } catch (err) {
        cb(null, err);
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
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
    },
    body: JSON.stringify({
      result,
      registDate,
    }),
  };
  cb(null, response);
};
