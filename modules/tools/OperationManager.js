export class OperationManager {
    processOperations(expression, regex) {
        while (regex.test(expression)) {
            expression = expression.replace(regex, (_, num1, operator, num2) => {
                return this.calculate(parseFloat(num1), operator, parseFloat(num2));
            });
        }
        return expression;
    }

    calculate(num1, operator, num2) {
        switch (operator) {
            case "x":
                return num1 * num2;
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            default:
                throw new Error("OperationManager chyba: " + operator);
        }
    }
}