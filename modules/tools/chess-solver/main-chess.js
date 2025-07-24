const { Chess } = require('chess.js');

function findWinningMove(fen) {
    const chess = new Chess(fen);
    const possibleMoves = chess.moves();
    for (const move of possibleMoves) {
        chess.move(move);
        if (chess.isCheckmate()) {
            chess.undo();
            return `${move}`;
        }
        chess.undo();
    }
    return "null";
}

const fen = decodeURIComponent(process.argv[2]);
try {
    let result = findWinningMove(fen);
    console.log(result);
} catch (error) {
    console.log("null: " + error);
}
