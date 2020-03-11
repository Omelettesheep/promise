const fs = require('fs');

const readFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            reject(err)
        }
        resolve(data)
    })
})

// readFile('1').then(data => {
//     readFile(data).then(data => {
//         readFile(data).then(data => {
//             console.log(data)
//         }, err => { console.log(err) })
//     }, err => { console.log(err) })
// }, err => { console.log(err) })

// 前一个 then return 的东西直接当后一个 then 的参数了
readFile('1')
    .then(data => readFile(data), e => { console.log(e) })
    .then(data => readFile(data), e => { console.log(e) })
    .then(data => console.log(data))