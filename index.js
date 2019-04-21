#!/usr/bin/env node
const request = require('request');
const fs = require('fs');
'use strict';
const options = {
    url: 'https://api.github.com/emojis',
    headers: {
        'User-Agent': 'request'
    }
};

function callback(err, res, body) {
    if(err) {
        console.log(err);
    } 
    const mojis = JSON.parse(body);
    const names = Reflect.ownKeys(mojis);
    console.log(`一共找到了 ${names.length} 个 gitmoji, 现在开始下载到 /images 文件夹...`);
    console.log(`finds ${names.length} emojis, downloading all to /images filefolder now...`);
    names.forEach((name,index) => {
        console.log(`download ${index + 1} / ${names.length}`);
        createImage(name, mojis[name]);
    });

}
function createImage(name, originUrl) {
    request(originUrl).pipe(fs.createWriteStream(`./images/${name}.png`));
}

request(options, callback);