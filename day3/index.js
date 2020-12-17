const fs = require('fs');

const initialMap = fs.readFileSync('day3/map.txt', 'utf8').split('\r\n').filter((x) => x);

const part1 = (map) => {
  let treeCounter = 0;
  let locationX = 0;
  const lineLength = map[0].length;
  map.forEach((currentValue) => {
    if (currentValue[locationX] === '#') {
      treeCounter += 1;
    }
    locationX = (locationX + 3) % lineLength;
  });
  return treeCounter;
};

const part2 = (map) => {
  const routes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  const lineLength = map[0].length;
  let treeMultiplication = 1;
  routes.forEach((route) => {
    const position = [0, 0];
    let treeCounter = 0;
    for (let i = 0; i < map.length; i += route[1]) {
      if (map[i][position[0]] === '#') {
        treeCounter += 1;
      }
      position[0] = (position[0] + route[0]) % lineLength;
    }
    treeMultiplication *= treeCounter;
  });
  return treeMultiplication;
};

console.log(part1(initialMap));
console.log(part2(initialMap));
