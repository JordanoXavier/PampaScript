{
  const trim = text => text.trim();
}

Program
  = _ commands:Command+ _ { return commands; }

Command
  = Assignment
  / IfStatement
  / WhileLoop
  / WriteCommand

Assignment
  = _ variable:Identifier _ "=" _ expression:Expression _ ";" _ { return { type: "assignment", variable, expression }; }

IfStatement
  = _ "SE" _ condition:Condition _ "ENTÃO" _ trueBranch:Command+ _ "FIMSE" _ { return { type: "if", condition, trueBranch }; }

WhileLoop
  = _ "ENQUANTO" _ condition:Condition _ "FAÇA" _ body:Command+ _ "FIMENQUANTO" _ { return { type: "while", condition, body }; }

WriteCommand
  = _ "ESCREVA" _ expression:Expression _ ";" _ { return { type: "write", expression }; }

Condition
  = _ left:Expression _ ">" _ right:Expression _ { return { type: "binary", operator: ">", left, right }; }
  / _ left:Expression _ "<" _ right:Expression _ { return { type: "binary", operator: "<", left, right }; }
  / _ left:Expression _ ">=" _ right:Expression _ { return { type: "binary", operator: ">=", left, right }; }
  / _ left:Expression _ "<=" _ right:Expression _ { return { type: "binary", operator: "<=", left, right }; }
  / _ left:Expression _ "==" _ right:Expression _ { return { type: "binary", operator: "==", left, right }; }
  / _ left:Expression _ "!=" _ right:Expression _ { return { type: "binary", operator: "!=", left, right }; }
  / _ Expression _

Expression
  = _ left:Term _ "+" _ right:Expression _ { return { type: "binary", operator: "+", left, right }; }
  / _ left:Term _ "-" _ right:Expression _ { return { type: "binary", operator: "-", left, right }; }
  / _ Term _

Term
  = _ left:Factor _ "*" _ right:Term _ { return { type: "binary", operator: "*", left, right }; }
  / _ left:Factor _ "/" _ right:Term _ { return { type: "binary", operator: "/", left, right }; }
  / _ Factor _

Factor
  = _ number:Integer _ { return { type: "integer", value: parseInt(number, 10) }; }
  / _ variable:Identifier _ { return { type: "variable", name: variable }; }
  / _ "(" _ expression:Expression _ ")" _ { return expression; }

Identifier
  = _ [a-zA-Z_] [a-zA-Z0-9_]* _ { return trim(text()); }

Integer
  = _ [0-9]+ _ { return text(); }

_ "whitespace"
  = [ \t\n\r]* { }
