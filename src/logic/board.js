import { WINNER_COMBOS } from "../constants";

// Si hay ganador
export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCheck[a] && // 0 -> x u o
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }
    // Si no hay ganador
    return null;
};

// Si hay empate
export const checkEndGame = (newBoard) => {
    // revisa si no hay mas espacio en el tablero
    return newBoard.every((square) => square != null);
};
