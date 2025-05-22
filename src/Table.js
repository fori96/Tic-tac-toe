import "./Table.css";

import { useEffect, useState } from "react";

const Table = ({ rounds, Reset }) => {
    const [tableSize, setTableSize] = useState(3);
    const [tiles, setTiles] = useState([]);
    const [end, setEnd] = useState(false);

    const [wins, setWins] = useState("");
    const [round, setRound] = useState(1);
    const [finished, setFinished] = useState(false);
    const [roundWinner, setRoundWinner] = useState("");
    const [winner, setWinner] = useState("");

    const [xIsNext, setXIsNext] = useState(false);

    const [step, setStep] = useState(1);

    const addTiles = () => {
        let array = Array(tableSize)
            .fill(0)
            .map((row) => new Array(tableSize).fill(""));

        setTiles(array);
    };

    useEffect(() => {
        addTiles();
    }, [tableSize]);

    useEffect(() => {
        if (end) {
            if (round < rounds) {
                setRound(round + 1);
            }
            if (checkWinner() === "") {
                addTiles();
                setStep(1);
                setRoundWinner("");
            } else {
                setTableSize(tableSize + 5);
                let w =
                    wins +
                    (step === tableSize * tableSize
                        ? "-"
                        : !xIsNext
                        ? "O"
                        : "X") +
                    " | ";
                setWins(w);
                let xWins = 0;
                let oWins = 0;
                for (let i = 0; i < w.length; i++) {
                    if (w[i] === "O") oWins++;
                    if (w[i] === "X") xWins++;
                }

                if (xWins > rounds / 2) {
                    setFinished(true);
                    setWinner("X");
                }
                if (oWins > rounds / 2) {
                    setFinished(true);
                    setWinner("O");
                }
                setRoundWinner("");
            }
            setEnd(false);
        }
    }, [end]);

    function onTileClick(i, j) {
        if (tiles[i][j] !== "" || end) return;

        const uptdatedTiles = tiles;

        if (xIsNext) {
            uptdatedTiles[i][j] = "X";
        } else {
            uptdatedTiles[i][j] = "O";
        }

        setTiles(uptdatedTiles);
        checkWinner();
        setXIsNext(!xIsNext);

        setStep(step + 1);

        if (roundWinner !== "" || step === tableSize * tableSize) {
            setEnd(true);
        }
    }

    function checkWinner() {
        let winner = "";

        //line checks
        for (let i = 0; i < tableSize; i++) {
            if (tiles[i][0] !== "") {
                let sameInLine = 1;
                const checkFor = tiles[i][0];
                for (let j = 1; j < tableSize; j++) {
                    if (tiles[i][j] === checkFor) sameInLine++;
                }
                if (sameInLine === tableSize) {
                    winner = tiles[i][0];
                }
            }
        }

        //row checks
        for (let i = 0; i < tableSize; i++) {
            if (tiles[0][i] !== "") {
                let sameInLine = 1;
                const checkFor = tiles[0][i];
                for (let j = 1; j < tableSize; j++) {
                    if (tiles[j][i] === checkFor) sameInLine++;
                }
                if (sameInLine === tableSize) {
                    winner = tiles[0][i];
                }
            }
        }

        // \ check
        if (tiles[0][0] !== "") {
            let sameInLine = 1;
            const checkFor = tiles[0][0];
            for (let i = 1; i < tableSize; i++) {
                if (tiles[i][i] === checkFor) sameInLine++;
            }
            if (sameInLine === tableSize) {
                winner = tiles[0][0];
            }
        }

        // / check
        if (tiles[0][tableSize] !== "") {
            let sameInLine = 1;
            const checkFor = tiles[0][tableSize];
            for (let i = 1; i < tableSize; i++) {
                if (tiles[i][tableSize - i] === checkFor) sameInLine++;
            }
            if (sameInLine === tableSize) {
                winner = tiles[0][tableSize];
            }
        }

        setRoundWinner(winner);
    }

    function onResetHangle() {
        setFinished(false);
        setEnd(false);
        Reset();
    }

    return (
        <div className="gameArea">
            <div className="gameInfos">
                {!finished ? (
                    <>
                        <label className="gameInfo">Round: {round}</label>
                        <label className="gameInfo">
                            Previous wins: {wins}
                        </label>
                        <label className="gameInfo">
                            Current turn: {xIsNext ? "X" : "O"}
                        </label>
                    </>
                ) : (
                    <>
                        <label className="winner">Winner: {winner}</label>
                        <button
                            className="reset"
                            onClick={() => onResetHangle()}
                        >
                            Reset
                        </button>
                    </>
                )}
            </div>

            <div
                className="gameTable"
                style={{ "grid-template-columns": `repeat(${tableSize}, 1fr)` }}
            >
                {tiles.map((element, i) => {
                    return (
                        <>
                            {element.map((e, j) => {
                                return (
                                    <div
                                        key={j}
                                        className="tile"
                                        onClick={() => onTileClick(i, j)}
                                    >
                                        {tiles[i][j]}
                                    </div>
                                );
                            })}
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Table;
