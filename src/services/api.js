const AlbionApi = require('albion-api');
const apiObj = {};

const promisify = foo => new Promise((resolve, reject) => {
    console.log('Inside promise', foo);
    foo((error, result) => {
      console.log('Inside foo', result);
      if(error) {
        reject(error)
      } else {
        console.log('result', result)
        resolve(result)
      }
    })
  });

for (const key in AlbionApi) {
  apiObj[key] = (...args) => promisify(cb => {
    if (args) {
      AlbionApi[key](...args, cb);
    } else {
      AlbionApi[key](cb);
    }
  });
}

module.exports = apiObj;