const fs = require('fs');
const Promise = require('./promise');

const readFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            reject(err)
        }
        resolve(data)
    })
})

// 前一个 then return 的东西直接当后一个 then 的参数了
readFile('1')
    .then(data => data, e => { console.log(e) })
    .then(data => { console.log(data) }, e => { console.log(e) })