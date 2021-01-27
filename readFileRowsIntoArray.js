const fs = require('fs');
function readFileRowsIntoArray(file) {
  return fs.readFileSync(file).toString().split("\n"); 
}

module.exports = {
  readFileRowsIntoArray
}