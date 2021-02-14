const { readFileRowsIntoArray } = require('../readFileRowsIntoArray');
const groupRows = require('../groupRows');

const input = readFileRowsIntoArray('input6');
const groups = groupRows(input,'');
const askedSet = new Set();
let count = 0;

for(const group of groups) {
  for(const member of group) {
    for(const char of Array.from(member)) {
      askedSet.add(char);
    }
  }
  count += askedSet.size;
  askedSet.clear();
}

console.log('count p1:',count);

count = 0;
const askedMap = new Map();
for(const group of groups) {
  for(const member of group) {
    for(const char of Array.from(member)) {
      askedMap.set(char,(askedMap.get(char) || 0) + 1)
    }
  }
  for(let key of askedMap.keys()) {
    if(askedMap.get(key) === group.length) {
      count += 1;
    } 
  }
  askedMap.clear();
}

console.log('count p2:',count);