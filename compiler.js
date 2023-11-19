const fs = require('fs');
const peg = require('pegjs');
const { compileProgram } = require('./script');


const args = process.argv.slice(1);

const param1 = args[0];

if (!param1) {
    console.error('Usage: yarn compile file.pampa');
    process.exit(1);
}

const grammar = fs.readFileSync('pampa.pegjs', 'utf8');
const parser = peg.generate(grammar);

const inputCode = fs.readFileSync(param1, 'utf8');

try {
    const parsedProgram = parser.parse(inputCode);
    compileProgram(parsedProgram);
} catch (error) {
    console.error(error.message);
}