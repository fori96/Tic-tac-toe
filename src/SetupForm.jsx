import "./SetupForm.css";

import { useState } from "react";

const SetupForm = ({ SetupGameOptions }) => {
    const [roundError, setRoundError] = useState(false);

    function handleSubmit(formData) {
        const roundValue = formData.get("roundInput");
        const continuous = formData.get("continuous");
        const starterTableSize = formData.get("tableSize");
        if (roundValue % 2 === 0) {
            setRoundError(true);
        } else {
            setRoundError(false);
            SetupGameOptions({
                round: roundValue,
                continuous: continuous === "on",
                starterTableSize: parseInt(starterTableSize),
            });
        }
    }

    return (
        <form action={handleSubmit} className="gameSetupForm">
            <div>
                <label for={"roundInput"} className="inputLabel">
                    Number of Rounds:{" "}
                </label>
                <input
                    id="roundInput"
                    name="roundInput"
                    defaultValue={3}
                    type="number"
                />
            </div>
            <span hidden={!roundError} className="error">
                No even number, please!
            </span>
            <div>
                <label for={"continuous"} className="inputLabel">
                    Countinous:{" "}
                </label>
                <input id="continuous" name="continuous" type="checkbox" />
            </div>
            <div>
                <label for={"tableSize"} className="inputLabel">
                    Starter table size:{" "}
                </label>
                <input
                    id="tableSize"
                    name="tableSize"
                    defaultValue={3}
                    type="number"
                />
            </div>
            <button type="submit" className="submit">
                Ready!
            </button>
        </form>
    );
};

export default SetupForm;
