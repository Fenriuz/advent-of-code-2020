const fs = require('fs');

const passwords = fs.readFileSync('day2/passwords.txt', { encoding: 'utf-8' }).split('\n').filter((x) => x);

const partOne = (entries) => {
  let validsPasswords = 0;
  entries.forEach((entry) => {
    const [policy, password] = entry.split(': ');
    const [range, letterToCheck] = policy.split(' ');
    const [initialRange, finalRange] = range.split('-');
    const letterCounter = password.match(new RegExp(letterToCheck, 'g'))?.length;
    if (letterCounter >= initialRange && letterCounter <= finalRange) {
      validsPasswords += 1;
    }
  });
  return validsPasswords;
};

const partTwo = (entries) => {
  let validsPasswords = 0;
  entries.forEach((entry) => {
    const [policy, password] = entry.split(': ');
    const [range, letterToCheck] = policy.split(' ');
    const [initialRange, finalRange] = range.split('-');
    if ((password[initialRange - 1] === letterToCheck) != (password[finalRange - 1] === letterToCheck)) {
      validsPasswords += 1;
    }
  });
  return validsPasswords;
};

console.log(partOne(passwords));
console.log(partTwo(passwords));
