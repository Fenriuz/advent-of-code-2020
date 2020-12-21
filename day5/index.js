const fs = require('fs');

const boardingPasses = fs.readFileSync('day5/boarding-passes.txt', { encoding: 'utf-8' }).split('\r\n').filter((x) => x);

const getRow = (splittedPass) => splittedPass.reduce((row, letter, i) => {
  if (letter === 'B') {
    return row + (128 / (2 ** (i + 1)));
  }
  return row;
}, 0);

const getColumn = (splittedPass) => splittedPass.reduce((column, letter, i) => {
  if (letter === 'R') {
    return column + (8 / (2 ** (i + 1)));
  }
  return column;
}, 0);

const partOne = (passes) => passes.reduce((higherPass, pass) => {
  const splittedPass = pass.split('');
  const row = getRow(splittedPass.slice(0, 7));
  const column = getColumn(splittedPass.slice(7, 10));
  const idPass = row * 8 + column;
  if (idPass > higherPass) {
    return idPass;
  }
  return higherPass;
}, 0);

const partTwo = (passes) => {
  const idsPasses = passes.reduce((higherPass, pass) => {
    const splittedPass = pass.split('');
    const row = getRow(splittedPass.slice(0, 7));
    const column = getColumn(splittedPass.slice(7, 10));
    const idPass = row * 8 + column;
    higherPass.push(idPass);
    return higherPass;
  }, []);
  const sortIds = idsPasses.sort((a, b) => a - b);
  // sortIds.forEach((x) => console.log(x));
  let myId;
  sortIds.reduce((previousId, currentId) => {
    if (previousId - currentId === -2) {
      myId = previousId + 1;
    }
    return currentId;
  });
  return myId;
};

console.log(`Part one: ${partOne(boardingPasses)}`);
console.log(`Part two: ${partTwo(boardingPasses)}`);
