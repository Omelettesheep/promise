const Promise = require('./promise');
const p = new Promise((resolve, reject) => {
    resolve('hello world');
    reject('err');
});

p.then(data => {
    console.log(data);
}, err => {
    console.log(err)
})