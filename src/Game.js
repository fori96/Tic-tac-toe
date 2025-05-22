import SetupForm from "./SetupForm";
import Table from "./Table";
import { useState } from "react";

const Game = () => {
    const [round, setRound] = useState(0);
    const [ready, setReady] = useState(false);

    function Round(formData) {
        const roundValue = formData.get("query");
        setRound(roundValue);
        setReady(true);
    }

    function Reset() {
        setReady(false);
    }

    return (
        <div className="main">
            {ready ? (
                <Table rounds={round} Reset={Reset} />
            ) : (
                <SetupForm Round={Round} />
            )}
        </div>
    );
};

export default Game;
