const { readFileRowsIntoArray } = require('../readFileRowsIntoArray');

const rows = readFileRowsIntoArray('input4')
let count = 0;
const passPorts = [];
while(count < rows.length) {
  let temp_count = count;
  let steps = 0;
  const passPort = {}
  while(temp_count < rows.length && rows[temp_count].length > 0) {
    const key_values = rows[temp_count].match(/\w{3}:[A-Za-z0-9#]+\s*/gi);
    for(kv of key_values) {
      const colonIndex = kv.indexOf(':');
      const key = kv.slice(0,colonIndex);
      const value = kv.slice(colonIndex + 1).replace(' ','');
      passPort[key] = value;
    }
    temp_count += 1;
    steps += 1;
  }
  passPorts.push(passPort)
  count += (steps + 1);
}

const requiredKeys = 
  [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
]

const validators = {
  'byr': /^((19[2-9]\d)|(200[0-2]))$/,
  'iyr': /^((201[0-9])|(2020))$/,
  'eyr': /^((202[0-9])|(2030))$/,
  'hgt': /^((1[5-8][0-9]cm)|(19[0-3]cm)|(59in)|(6[0-9]in)|(7[0-6]in))$/,
  'hcl': /^#[0-9\w]{6}$/,
  'ecl': /^amb|blu|brn|gry|grn|hzl|oth$/,
  'pid': /^\d{9}$/
}

// const optionalKeys = ['cid'];
let validCount = 0;

for(const passPort of passPorts) {
  let isValid = true;
  for(let key of requiredKeys) {
    if(!passPort.hasOwnProperty(key)) {
      isValid = false;
      break;
    } else {
      isValid = validators[key].test(passPort[key]);
      if(!isValid) { break; }
    }
  }
  if(isValid) {
    console.log(passPort,"\n");
    validCount += 1;
  }
}

console.log('Number of valid passports %d', validCount);