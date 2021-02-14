module.exports = (array,groupdelim) => {
  let group = [];
  const retval = [];
  for(let currRow of array) {
    if(currRow === groupdelim) {
      retval.push(group);
      group = [];
    } else {
      group.push(currRow)
    }
  }
  return retval;
}