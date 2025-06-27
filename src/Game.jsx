import SetupForm from "./SetupForm";
import Table from "./table/Table";
import { useState } from "react";

const Game = () => {
    const [gameOptions, setGameOptions] = useState({
        round: 0,
        continuous: false,
        starterTableSize: 3,
        //player1 and player2 settings: icon, icon color, bg, bg color or img
    });
    const [ready, setReady] = useState(false);

    function SetupGameOptions(options) {
        setGameOptions({ ...options });
        setReady(true);
    }

    function Reset() {
        setReady(false);
    }

    return (
        <div className="main">
            {ready ? (
                <Table gameOptions={gameOptions} Reset={Reset} />
            ) : (
                <SetupForm SetupGameOptions={SetupGameOptions} />
            )}
        </div>
    );
};

export default Game;
