let numberOfRows = 0;
let isChessOn = false;
let chessBoard = [];
let currentTurn = 'w';

export function parseChessRow(row) {
    row = row.replace(/^.*?\|/, "");
    row = row.replace(/\|.*$/, ""); 
    row = row.replace(/\?/g, ".");
    row = row.trim();
    
    let processedRow = [];
    let i = 0;

    while (i < row.length) {
        let part = row[i];

        if (row[i] === "&" && row[i + 1] === "r" && row[i + 2] === "&") {
            let colorCode = row.slice(i, i + 5);
            let piece = row[i + 5]; 
            if (piece) processedRow.push(extractSymbol(colorCode + piece));
            i += 6;
        } else {
            processedRow.push(extractSymbol(part));
            i++;
        }
    }

    return processedRow.join('');
}

function extractSymbol(part) {
    const specialChars = /[^a-zA-Z0-9&\s]/g;
    part = part.replace(specialChars, ".");

    if (part.includes("&r&f")) return part.replace(/.*&f/, "").trim().toUpperCase();
    if (part.includes("&r&7") || part.includes("&r&8")) return part.replace(/.*&[78]/, "").trim().toLowerCase();
    return part.trim();
}

export function parseChessBoard(board) {
    let fenRows = board.map(row => {
        let parsedRow = [], empty = 0;
        for (let char of row) {
            if (char === ".") empty++;
            else {
                if (empty > 0) { parsedRow.push(empty); empty = 0; }
                parsedRow.push(char);
            }
        }
        if (empty > 0) parsedRow.push(empty);
        return parsedRow.join("");
    });

    return `${fenRows.join("/")} ${currentTurn} - - 0 1`;
}

export function getState() {
    return { numberOfRows, isChessOn, chessBoard, currentTurn };
}

export function setState(state) {
    numberOfRows = state.numberOfRows;
    isChessOn = state.isChessOn;
    chessBoard = state.chessBoard;
    currentTurn = state.currentTurn;
}

export function resetState() {
    numberOfRows = 8;
    isChessOn = false;
    chessBoard = [];
    currentTurn = 'w';
}

export function enableChess() {
    numberOfRows = 8;
    isChessOn = true;
}
