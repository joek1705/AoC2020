const readline = require("readline");
const fs = require("fs");
let data = fs.readFileSync("input1.txt").toString().split("\n");
// let data = [1721, 979, 366, 299, 675, 1456];
let n = 2020;
for (let i = 0; i < data.length - 2; i++) {
  let current = Number(data[i]);
  let subtracted = n - current;
  if (data.includes(subtracted.toString())) {
    console.log(current, subtracted, current * subtracted);
    break;
  }
}
