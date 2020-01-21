const cheerio = require('cheerio');
const request = require('request');

const url = 'https://www.melon.com/chart/';

console.log('start');
const title = [];
const artist = [];
const result = [];
const rank = 100;

request(url, (err, res, html) => {
    const $ = cheerio.load(html);
    for (let i = 0; i < rank; i++) {
        $('.ellipsis.rank01 > span > a').each(function(idx){
          var title_info = $(this);
          var title_info_text = title_info.text();
          title[idx] = title_info_text;
        })
    }
    for (let i = 0; i < rank; i++) {
        $('.checkEllipsis').each(function(idx){
          var artist_info = $(this);
          var artist_info_text = artist_info.text();
          artist[idx] = artist_info_text;
        })
    }
    for (let i = 0; i < rank; i ++) {
        result[i] = {
            title: title[i],
            artist: artist[i],
        }
    }
    console.log(result);
});