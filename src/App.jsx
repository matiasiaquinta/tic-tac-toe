/*
  Seguir -> https://cursoreact.dev/02-use-state-use-effect
  (1:16:01)

*/

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { WinnerModal } from "./components/WinnerModal";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkEndGame, checkWinner } from "./logic/board";

function App() {
    // Tablero
    //console.log("render");
    const [board, setBoard] = useState(() => {
        //console.log("inicializar estado del board");
        const boardFromStorage = window.localStorage.getItem("board");
        // manera: ternaria
        return boardFromStorage
            ? JSON.parse(boardFromStorage)
            : Array(9).fill(null);
    });

    // Turnos
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem("turn");
        return turnFromStorage ?? TURNS.x;
    });

    // Ganador - null no hay / false empate / true ganador
    const [winner, setWinner] = useState(null);

    // Restart Game
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.x);
        setWinner(null);

        window.localStorage.removeItem("board");
        window.localStorage.removeItem("turn");
    };

    // Mira el tablero para ver si hay ganador
    const updateBoard = (index) => {
        // Si hay ganador frenamos el juego
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = turn; //x u o;
        setBoard(newBoard);

        const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
        setTurn(newTurn);

        // Guardar datos por si se refresca la pagina
        window.localStorage.setItem("board", JSON.stringify(newBoard));
        window.localStorage.setItem("turn", newTurn);

        // Revisar si hay ganador
        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            confetti();
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinner(false); // empate
        }
    };

    // Solo se ejecuta cuando cambia el winner
    //useEffect(() => {
    //    console.log("useEffect");
    //}, [winner]);

    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Reiniciar</button>
            <section className="game">
                {board.map((square, index) => {
                    return (
                        <Square
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {square}
                        </Square>
                    );
                })}
            </section>

            <section className="turn">
                <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
                <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
            </section>

            <WinnerModal resetGame={resetGame} winner={winner} />
        </main>
    );
}

export default App;
