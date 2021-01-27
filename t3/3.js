const { readFileRowsIntoArray } = require("../readFileRowsIntoArray");



function cycleString(s, n) {
  let retval = "";
  for (let i = 0; i < n; i++) {
    retval += s;
  }
  return retval;
}

const data = readFileRowsIntoArray("input3");

function solve(step) {
  const numRows = data.length;
  const rowsPerRowLen = Math.floor(data[0].length / step);
  const numRepetitions = Math.ceil(numRows / rowsPerRowLen);
  let currentRow = 0;
  const newArray = [];

  for (let i = 0; i < numRows; i++) {
    const str = cycleString(data[i], numRepetitions);
    newArray.push(str);
  }
  currentRow = 0;
  let col = 0;
  let count = 0;
  while (currentRow < numRows - 1) {
    currentRow += 1;
    col += step;
    const currVal = newArray[currentRow][col];
    count += newArray[currentRow][col] = currVal === "#" ? 1 : 0;
  }
  return count;
}

let count = (solve(1) * solve(3) * solve(5) * solve(7));

const downTwosCount = Math.floor(data.length / 2);

let newArray = [];

for(let i = 0; i < data.length; i++) {
  const str = cycleString(data[i],downTwosCount);
  newArray.push(str);
}

let i = 0;
let row = 0;
let right = 0;
let res = 0;
while( i < downTwosCount ) {
  row += 2;
  right++;
  console.log(newArray[row][right]);
  res += (newArray[row][right] === '#') ? 1 : 0;
  i++;
}

console.log(res * count);

