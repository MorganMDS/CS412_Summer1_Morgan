// Problem2:

function evaluate(expression) {
    var num1 = parseInt(expression.charAt(0));
    var num2 = parseInt(expression.charAt(2));
    var operator = expression.charAt(1);
    switch (operator) {
        case '+':
            return str => num1 + num2;
        case '-':
            return str => num1 - num2;
        case '*':
            return str => num1 * num2;
        case '/':
            return str => num1 / num2;
        case '^':
            return str => Math.pow(num1, num2);
    }
}

expression = '2^4';
let operator = evaluate(expression);
console.log(`${expression} = ${operator(expression)}`);