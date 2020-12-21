const fs = require('fs');

const passportsData = fs.readFileSync('day4/passports.txt', { encoding: 'utf-8' }).split(/\r\n\s*\n/).filter((x) => x);

const validFields = {
  byr: {
    length: 4,
    min: 1920,
    max: 2002,
  },
  iyr: {
    length: 4,
    min: 2010,
    max: 2020,
  },
  eyr: {
    length: 4,
    min: 2020,
    max: 2030,
  },
  hgt: {
    allow: {
      cm: {
        min: 150,
        max: 193,
      },
      in: {
        min: 59,
        max: 76,
      },
    },
  },
  hcl: {
    length: 6,
    isHex: /^[0-9A-F]{6}$/i,
  },
  ecl: {
    allow: [
      'amb',
      'blu',
      'brn',
      'gry',
      'grn',
      'hzl',
      'oth',
    ],
  },
  pid: {
    length: 9,
  },
};

const validateFields = (field, data) => {
  const validationSchema = validFields[field];
  let isValid = false;
  switch (field) {
    case 'byr':
      isValid = (validationSchema.length === data.length
        && validationSchema.min <= data
        && validationSchema.max >= data);
      break;
    case 'iyr':
      isValid = (validationSchema.length === data.length
        && validationSchema.min <= data
        && validationSchema.max >= data);
      break;
    case 'eyr':
      isValid = (
        validationSchema.length === data.length
        && validationSchema.min <= data
        && validationSchema.max >= data
      );
      break;
    case 'hgt':
      const [number, unit] = data.match(/[a-z]+|[0-9]+/g);
      isValid = (
        validationSchema.allow[unit]?.min <= number
        && validationSchema.allow[unit]?.max >= number
      );
      break;
    case 'hcl':
      const color = data.split('#')[1];
      isValid = (
        validationSchema.length === color?.length
        && validationSchema.isHex.test(color)
      );
      break;
    case 'ecl':
      isValid = validationSchema.allow.includes(data);
      break;
    case 'pid':
      isValid = validationSchema.length === data.length;
      break;
  }
  return isValid;
};

const partOne = (passports) => {
  const validFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const numberFieldsRequired = validFields.length;
  let validPassports = 0;
  passports.forEach((passport) => {
    const passportLines = passport.split(/\n/).filter((x) => x);
    let fieldCounter = 0;
    passportLines.forEach((passportLine) => {
      const passportFields = passportLine.split(' ');
      passportFields.forEach((passportField) => {
        const field = passportField.split(':')[0];
        if (validFields.includes(field)) {
          fieldCounter += 1;
        }
      });
    });
    if (fieldCounter === numberFieldsRequired) {
      validPassports += 1;
    }
  });
  return validPassports;
};

const partTwo = (passports) => {
  const numberFieldsRequired = Object.keys(validFields).length;
  let validPassports = 0;
  passports.forEach((passport) => {
    const passportLines = passport.split(/\r\n/).filter((x) => x);
    let fieldCounter = 0;
    passportLines.forEach((passportLine) => {
      const passportFields = passportLine.split(' ');
      passportFields.forEach((passportField) => {
        const [field, data] = passportField.split(':');
        if (field != 'cid' && validateFields(field, data)) {
          fieldCounter += 1;
        }
      });
    });
    if (fieldCounter === numberFieldsRequired) {
      validPassports += 1;
    }
  });
  return validPassports;
};

console.log(`First: ${partOne(passportsData)}`);
console.log(`Second: ${partTwo(passportsData)}`);
