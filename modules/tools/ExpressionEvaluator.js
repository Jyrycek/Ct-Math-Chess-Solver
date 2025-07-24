import { ExpressionParser } from './ExpressionParser.js';

export class ExpressionEvaluator {
    constructor() {
        this.parser = new ExpressionParser();
    }

    evaluate(expression) {
        try {
            expression = expression.replace(/\s+/g, "");

            return this.parser.parse(expression);
        } catch (error) {
            throw new Error("ExpressionEvulator chyba: " + error.message);
        }
    }
}
