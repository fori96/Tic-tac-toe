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
            return {
                ...state,
                tiles: setTiles(state.tableSize),
                continuous: action.continuous,
            };
        case ActionTypes.INIT_NEXTROUND:
            return {
                ...state,
                tiles: setTiles2(state.tableSize, state.tiles),
                tableSize: state.tableSize + 5,
            };
        case ActionTypes.CLICK_TILE: {
            const { i, j } = action.idxs;
            if (state.tiles[i][j] !== "" || state.end) return state;

            const newTiles = state.tiles.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    rowIndex === i && colIndex === j
                        ? state.xIsNext
                            ? "X"
                            : "O"
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
                winner = "X";
            }
            if (oWins > action.rounds / 2) {
                gameFinished = true;
                winner = "O";
            }

            return {
                ...state,
                round: state.round + 1,
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

function setTiles(tableSize) {
    return Array(tableSize)
        .fill(0)
        .map(() => new Array(tableSize).fill(""));
}

function setTiles2(tableSize, tiles) {
    const newTable = Array(tableSize + 5)
        .fill(0)
        .map(() => new Array(tableSize + 5).fill(""));

    for (let i = 0; i < tableSize; i++) {
        for (let j = 0; j < tableSize; j++) {
            newTable[j + 2][i + 2] = tiles[j][i];
        }
    }

    return newTable;
}
