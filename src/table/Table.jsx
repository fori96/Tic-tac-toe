import "./Table.css";

import { useEffect, useReducer } from "react";

import { ActionTypes } from "./TableReducer";
import gameReducer from "./TableReducer";

const initialState = {
    tableSize: 3,
    tiles: [],
    continuous: false,
    end: false,
    wins: "",
    round: 1,
    finished: false,
    roundWinner: "",
    winner: "",
    xIsNext: false,
    step: 1,
};

const Table = ({ gameOptions, Reset }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        dispatch({ type: ActionTypes.INIT_TILES, gameOptions });
    }, [state.round]);

    useEffect(() => {
        const rounds = gameOptions.round;
        if (state.end) {
            if (state.round <= rounds) {
                dispatch({ type: ActionTypes.END_ROUND, rounds });
            }
        }
    }, [state.end]);

    function onTileClick(i, j) {
        dispatch({
            type: ActionTypes.CLICK_TILE,
            idxs: { i, j },
        });
    }

    function onResetHandle() {
        dispatch({ type: ActionTypes.RESET, initialState });
        Reset();
    }

    console.log(state);
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
                            onClick={() => onResetHandle()}
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
                        <div key={i}>
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Table;
