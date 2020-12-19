console.time('test');

const csv = require('csv-parser');
const fs = require('fs');

const TREE = '#';
let dataRay = [];
let treeCounts = [];

fs.createReadStream('day3p1.csv')
    .pipe(csv())
    .on('data', (row) => {
        dataRay.push(row.row.split(''));
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        treeCounts.push(travel(dataRay, [1, 1]));
        treeCounts.push(travel(dataRay, [3, 1]));
        treeCounts.push(travel(dataRay, [5, 1]));
        treeCounts.push(travel(dataRay, [7, 1]));
        treeCounts.push(travel(dataRay, [1, 2]));
        console.log(treeCounts.reduce((a, b) => a * b));
        console.timeEnd('test');
    });


const travel = (map, slope) => {
    const horSlope = slope[0];
    const verSlope = slope[1];
    const rowLength = map[0].length;

    let treeCount = 0;
    let i = 0;
    let pos = 0;

    while (i < map.length) {

        if (map[i][pos] === TREE) {
            treeCount++;
        }

        pos += horSlope;

        if (pos > (rowLength - 1)) {
            pos -= rowLength;
        }

        i += verSlope;

    }

    console.log('Trees encountered:', treeCount);
    return treeCount;
}

