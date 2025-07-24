import { ExpressionEvaluator } from './ExpressionEvaluator.js';
import {
    parseChessRow, parseChessBoard, resetState,
    getState, setState, enableChess
} from './ChessParser.js';
import { getChessSolution } from './ChessSolver.js';

register("chat", (message) => {
    try {
        const evaluator = new ExpressionEvaluator();
        const result = evaluator.evaluate(message);
        ChatLib.say(result);
    } catch (error) {
        ChatLib.chat("[MathSolver] Invalid expression.");
    }
}).setCriteria("QUICK MATHS! Solve: ${message}");

register("chat", (message, event) => {
    try {
        const raw = String(message);
        const fullMessage = ChatLib.getChatMessage(event, true);
        const state = getState();

        if (raw.includes("Reply with short al")) {
            state.chessBoard.push(parseChessRow(fullMessage));
            setState(state);
            return;
        }

        if (raw.includes("QUICK CHESS") && raw.includes("to move")) {
            state.currentTurn = raw.includes("Black") ? 'b' : 'w';
            setState(state);
        }

        if (raw.includes("+-------------+") && !state.isChessOn) {
            enableChess();
            return;
        }

        if (!state.isChessOn) return;

        if (state.numberOfRows > 0) {
            state.chessBoard.push(parseChessRow(fullMessage));
            state.numberOfRows--;
            setState(state);
        } else {
            setState({ ...state, isChessOn: false });

            const fenString = parseChessBoard(state.chessBoard);
            getChessSolution(fenString, (result) => {
                if (result != "null") ChatLib.chat(result);
                else ChatLib.chat("No solution found (error)");
                resetState();
            });
        }
    } catch (error) {
        console.error("[ChessHandler] Error: ", error);
    }
}).setCriteria("${message}");
