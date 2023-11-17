const fs = require('fs');
const peg = require('pegjs');


const args = process.argv.slice(2);

if (args.length !== 2) {
    console.error('Usage: yarn transpile file.pampa output.json');
    process.exit(1);
}

const param1 = args[0];
const param2 = args[1]

const grammar = fs.readFileSync('pampa.pegjs', 'utf-8');
const parser = peg.generate(grammar);

const inputCode = fs.readFileSync(param1, 'utf8');

try {
    const parsedProgram = parser.parse(inputCode);
    fs.writeFileSync(param2, JSON.stringify(parsedProgram, null, 2));
} catch (error) {
    console.error(error.message);
}