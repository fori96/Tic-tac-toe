import { Icons } from "../components/icons";

export const ActionTypes = {
    INIT_TILES: "INIT_TILES",
    INIT_NEXTROUND: "INIT_NEXTROUND",
    CLICK_TILE: "CLICK_TILE",
    END_ROUND: "END_ROUND",
    RESET: "RESTET",
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.INIT_TILES:
            let newState = {
                ...state,
            };
            if (state.round === 1) {
                newState.tableSize = action.gameOptions.starterTableSize;
                newState.continuous = action.gameOptions.continuous;
            }
            newState.player1 = Icons.find(
                (i) => i.id === action.gameOptions.player1
            );
            newState.player2 = Icons.find(
                (i) => i.id === action.gameOptions.player2
            );
            return {
                ...newState,
                tiles: setTiles(newState),
            };
        case ActionTypes.INIT_NEXTROUND:
            return {
                ...state,
                tiles: setTiles(state.tableSize, state.tiles),
            };
        case ActionTypes.CLICK_TILE: {
            const { i, j } = action.idxs;
            if (state.tiles[i][j] !== "" || state.end) return state;

            const newTiles = state.tiles.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    rowIndex === i && colIndex === j
                        ? state.xIsNext
                            ? "P1"
                            : "P2"
                        : cell
                )
            );

            const newStep = state.step + 1;
            const newWinner = checkWinner(newTiles, state.tableSize);

            const roundEnded =
                newWinner !== "" ||
                newStep === state.tableSize * state.tableSize;

            return {
                ...state,
                tiles: newTiles,
                xIsNext: !state.xIsNext,
                step: newStep,
                roundWinner: newWinner,
                end: roundEnded,
            };
        }
        case ActionTypes.END_ROUND: {
            let newWins =
                state.wins +
                (state.roundWinner === "" ? "-" : state.roundWinner) +
                " | ";

            let xWins = (newWins.match(/X/g) || []).length;
            let oWins = (newWins.match(/O/g) || []).length;

            let gameFinished = false;
            let winner = "";
            if (xWins > action.rounds / 2) {
                gameFinished = true;
                winner = "P1";
            }
            if (oWins > action.rounds / 2) {
                gameFinished = true;
                winner = "P2";
            }

            return {
                ...state,
                round: state.round + 1,
                tableSize: state.tableSize + 5,
                step: 1,
                roundWinner: "",
                xIsNext: false,
                end: false,
                wins: newWins,
                winner: winner,
                finished: gameFinished,
            };
        }
        case ActionTypes.RESET:
            return action.initialState;

        default:
            return state;
    }
};

export default gameReducer;

function checkWinner(tiles, tableSize) {
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
            winner = checkFor;
        }
    }

    return winner;
}

function setTiles(state) {
    const newTable = Array(state.tableSize)
        .fill(0)
        .map(() => new Array(state.tableSize).fill(""));

    if (state.round > 1 && state.continuous) {
        for (let i = 0; i < state.tableSize - 5; i++) {
            for (let j = 0; j < state.tableSize - 5; j++) {
                newTable[j + 2][i + 2] = state.tiles[j][i];
            }
        }
    }
    return newTable;
}
