`
Each policy actually describes two positions in the password, 
where 1 means the first character, 2 means the second character, and so on. 
(Be careful; Toboggan Corporate Policies have no concept of "index zero"!) 
Exactly one of these positions must contain the given letter. 
Other occurrences of the letter are irrelevant for the purposes of policy enforcement.
`

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
        let posA, posB, char;
        [posA, posB, char] = this.policy.split(/[\s-]+/);
        const sushi = this.password.split('');
        (sushi[posA] === char ^ sushi[posB] === char) ? this.valid = true : this.valid = false;
    }
}

fs.createReadStream('day2p2.csv')
    .pipe(csv({ headers: ['policy', 'password'], separator: ':' }))
    .on('data', (row) => {
        dataRay.push(new Validate(row));
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        console.log(dataRay.filter(a => a.valid).length)
    });

console.timeEnd('test');