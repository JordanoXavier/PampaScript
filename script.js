const fs = require('fs');
const peg = require('pegjs');

const grammar = fs.readFileSync('pampa.pegjs', 'utf-8');
const parser = peg.generate(grammar);

function compileProgram(ast) {
  const variables = {};

  function evaluateExpression(expression) {
    let expressionPayload;

    if (expression.length > 1) {
      expressionPayload = expression[1][1] || expression[1]
      //workaround to deal with pegjs strange output
    }
    else {
      expressionPayload = expression
    }

    if (expressionPayload.type === 'integer') {
      return expressionPayload.value;
    } else if (expressionPayload.type === 'variable') {
      if (!(expressionPayload.name in variables)) {
        throw new Error(`Variável ${expressionPayload.name} não definida.`);
      }
      return variables[expressionPayload.name];
    } else if (expressionPayload.type === 'binary') {
      return evaluateCondition(expressionPayload)
    }
  }

  function evaluateCondition(condition) {
    if (condition.type === 'binary') {
      const left = evaluateExpression(condition.left);
      const right = evaluateExpression(condition.right);

      switch (condition.operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return left / right;
        case '>':
          return left > right;
        case '<':
          return left < right;
        case '>=':
          return left >= right;
        case '<=':
          return left <= right;
        case '==':
          return left === right;
        case '!=':
          return left !== right;
        default:
          throw new Error(`Operador desconhecido: ${condition.operator}`);
      }
    }
  }

  function executeAssignment(node) {
    const value = evaluateExpression(node.expression);
    variables[node.variable] = value;
  }

  function executeIfStatement(node) {
    const condition = evaluateCondition(node.condition);

    if (condition) {
      node.trueBranch.forEach(runCommand);
    }
  }

  function executeWhileLoop(node) {
    while (evaluateExpression(node.condition)) {
      node.body.forEach(runCommand);
    }
  }

  function executeWriteCommand(node) {
    const value = evaluateExpression(node.expression);
    console.log(value);
  }

  function runCommand(command) {
    switch (command.type) {
      case 'assignment':
        executeAssignment(command);
        break;
      case 'if':
        executeIfStatement(command);
        break;
      case 'while':
        executeWhileLoop(command);
        break;
      case 'write':
        executeWriteCommand(command);
        break;
      default:
        throw new Error(`Tipo de comando desconhecido: ${command.type}`);
    }
  }

  ast.forEach(runCommand);
}

const inputCode = fs.readFileSync("./example.pampa", 'utf8');

try {
  const parsedProgram = parser.parse(inputCode);
  // console.log(JSON.stringify(parsedProgram, null, 2));
  compileProgram(parsedProgram);
} catch (error) {
  console.error(error.message);
}

module.exports = compileProgram;
