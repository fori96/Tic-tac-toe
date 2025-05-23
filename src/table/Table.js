import "./Table.css";

import { useEffect, useReducer } from "react";

import gameReducer from "./TableReducer";

const initialState = {
    tableSize: 3,
    tiles: [],
    end: false,
    wins: "",
    round: 1,
    finished: false,
    roundWinner: "",
    winner: "",
    xIsNext: false,
    step: 1,
};

const Table = ({ rounds, Reset }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        dispatch({ type: "INIT_TILES" });
    }, [state.tableSize]);

    useEffect(() => {
        if (state.end) {
            if (state.round <= rounds) {
                dispatch({ type: "END_ROUND", rounds });
            }
        }
    }, [state.end]);

    function onTileClick(i, j) {
        dispatch({
            type: "CLICK_TILE",
            idxs: { i, j },
        });
    }

    function onResetHangle() {
        dispatch({ type: "RESET", initialState });
        Reset();
    }

    return (
        <div className="gameArea">
            <div className="gameInfos">
                {!state.finished ? (
                    <>
                        <label className="gameInfo">Round: {state.round}</label>
                        <label className="gameInfo">
                            Previous wins: {state.wins}
                        </label>
                        <label className="gameInfo">
                            Current turn: {state.xIsNext ? "X" : "O"}
                        </label>
                    </>
                ) : (
                    <>
                        <label className="winner">Winner: {state.winner}</label>
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
                style={{
                    "grid-template-columns": `repeat(${state.tableSize}, 1fr)`,
                }}
            >
                {state.tiles.map((element, i) => {
                    return (
                        <>
                            {element.map((e, j) => {
                                return (
                                    <div
                                        key={j}
                                        className="tile"
                                        onClick={() => onTileClick(i, j)}
                                    >
                                        {state.tiles[i][j]}
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
