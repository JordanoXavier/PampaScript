const fs = require('fs');
const peg = require('pegjs');

const grammar = fs.readFileSync('pampa.pegjs', 'utf-8');
const parser = peg.generate(grammar);

function runProgram(ast) {
    const variables = {};
  
    function evaluateExpression(expression) {
      // console.log(expression)
        if (expression[1][1].type === 'integer') {
          return expression[1][1].value;
        } else if (expression.type === 'variable') {
          if (!(expression.name in variables)) {
            throw new Error(`Variável ${expression.name} não definida.`);
          }
          return variables[expression.name];
        } else if (expression.type === 'binary') {
          const left = evaluateExpression(expression.left);
          const right = evaluateExpression(expression.right);
      
          switch (expression.operator) {
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
              throw new Error(`Operador desconhecido: ${expression.operator}`);
          }
        }
      }
      
  
    function executeAssignment(node) {
      const value = evaluateExpression(node.expression);
      variables[node.variable] = value;
    }
  
    function executeIfStatement(node) {
      const condition = evaluateExpression(node.condition);
  
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
  
    for (let i = 0; i < ast.length; i++) {
      runCommand(ast[i]);
      console.log(variables)
    }
}
  
const input = `
  X = 10;
  SE X > 5 ENTÃO
    Y = X * 2;
  FIMSE
  ENQUANTO X > 2 FAÇA
    X = X - 1;
  FIMENQUANTO
  ESCREVA X;
`;

try {
  const ast = parser.parse(input);
  // console.log(JSON.stringify(ast, null, 2));
  runProgram(ast);
} catch (error) {
  console.error(error.message);
}
