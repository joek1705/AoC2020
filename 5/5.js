const { readFileRowsIntoArray } = require('../readFileRowsIntoArray');
const fileRows = readFileRowsIntoArray('input5');

function divide(str,front,back) {
  let high = Math.pow(2,str.length) - 1;
  let low = 0;
  const charArray = Array.from(str);
  for(let i = 0; i < charArray.length; i++) {
    let middle = low + Math.floor((high - low) / 2);
    const char = charArray[i];
    if(char === front) {
      high = middle;
    } else if(char === back) {
      low = middle + 1;
    }
  }
  return high;
}

let results = []

for(let row of fileRows) {
  const rowStr = row.slice(0,row.length - 3);
  const colStr = row.slice(row.length - 3);
  const value = divide(rowStr,'F','B') * 8 + divide(colStr,'L','R');
  const item = [rowStr,colStr,value];
  results.push(item);
}
results = results.sort((a,b) => a[2] - b[2]);
for(let i = 0 ; i < results.length - 2; i++) {

  // explainer for part 2:
  // Just sort the list and find two adjacent values that differ
  // by more than one
  if(results[i + 1][2] - results[i][2] > 1) {
    console.log(results[i+1],results[i]);
  }
}

console.log(divide('FFFFFFF','F','B') * 8 + divide('RRR','L','R'));