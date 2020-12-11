`
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
Each line gives the password policy and then the password. 
The password policy indicates the lowest and 
highest number of times a given letter must appear for the 
password to be valid. 
For example, 1-3 a means that the password must contain a at 
least 1 time and at most 3 times.

In the above example, 2 passwords are valid. 
The middle password, cdefg, is not; it contains no instances of b, 
but needs at least 1. The first and third passwords are valid: 
they contain one a or nine c, 
both within the limits of their respective policies.`

console.time('test');

const csv = require('csv-parser');
const fs = require('fs');

let dataRay = [];

class Validate {

  constructor({ policy, password }) {
    this.policy = policy;
    this.password = password;
    this.valid = false;
    this.check();
  }

  check() {
    let min, max, char;
    [min, max, char] = this.policy.split(/[\s-]+/);
    const count = this.password.split('').filter(a => a == char).length;
    (min <= count && count <= max) ? this.valid = true : this.valid = false;
  }
}

fs.createReadStream('day2p1.csv')
  .pipe(csv({ headers: ['policy', 'password'], separator: ':' }))
  .on('data', (row) => {
    dataRay.push(new Validate(row));
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(dataRay.filter(a => a.valid).length)
  });

console.timeEnd('test');