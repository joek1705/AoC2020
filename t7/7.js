const fileClient = require('../readFileRowsIntoArray');

const inputArray = fileClient.readFileRowsIntoArray('input7');

const bagsMap = new Map();

for (const row of inputArray) {
    const containStartIndex = row.indexOf('contain');
    const key = row.slice(0,containStartIndex - 1).replace(/\s/g,'');
    const values = row.slice(containStartIndex + 8).split(',');
    const subBags = values.reduce((acc,curr) => {
        let currFiltered = curr.replace(/[.\s]/g,'');
        currFiltered = currFiltered.replace(/bag$/g,'bags');
        if (currFiltered !== 'nootherbags') {
            const subBag = currFiltered.slice(1);
            const numBags = Number(currFiltered[0]);
            acc.set(subBag,numBags);
        }
        return acc;
    }, new Map())
    bagsMap.set(key,subBags);
}

const containsGoldBag = (bag,subBagsMap) => {
    if(bag === 'shinygoldbags') {
        return false;
    } else if(subBagsMap.size === 0) {
        return false;
    } else if(subBagsMap.has('shinygoldbags')) {
        return true;
    } else {
        const vals = [];
        for([key,value] of subBagsMap) {
            vals.push(containsGoldBag(key,bagsMap.get(key)));
        }
        return vals.indexOf(true) !== -1;
    }
}

// part1
let count = 0;
for([key,value] of bagsMap) {
    count += containsGoldBag(key,bagsMap.get(key)) ? 1 : 0;
}
console.log("Part one answer: ", count);

// part2
const countContainedBags = function(bag, subBagsMap) {
    if(subBagsMap.size === 0) {
        return 0;
    } else {
        let count = 0;
        for([key,value] of subBagsMap) {
            count += value;
            count += (value * countContainedBags(key,bagsMap.get(key)));
        }
        return count;
    }
}

count = 0;
const bag = "shinygoldbags"
count += countContainedBags(bag,bagsMap.get(bag))
console.log("Part two answer: ", count);