import { OperationManager } from './OperationManager.js';

export class ExpressionParser {
    constructor() {
        this.operationManager = new OperationManager();
    }

    parse(expression) {
        while (expression.includes("(")) {
            expression = expression.replace(/\(([^()]+)\)/, (_, subExpression) => this.parse(subExpression));
        }
        expression = this.operationManager.processOperations(expression, /(-?\d+(?:\.\d+)?)([x])(-?\d+(?:\.\d+)?)/);
        expression = this.operationManager.processOperations(expression, /(-?\d+(?:\.\d+)?)([+-])(-?\d+(?:\.\d+)?)/);

        return parseFloat(expression);
    }
}