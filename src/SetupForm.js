import "./SetupForm.css";

import { useState } from "react";

const SetupForm = ({ Round }) => {
    const [roundError, setRoundError] = useState(false);

    function handleSubmit(formData) {
        const roundValue = formData.get("query");
        if (roundValue % 2 === 0) {
            setRoundError(true);
        } else {
            setRoundError(false);
            Round(formData);
        }
    }

    return (
        <form action={handleSubmit} className="gameSetupForm">
            <label for={"query"}>Number of Rounds: </label>
            <input id="query" name="query" type="number" />
            <br />
            <span hidden={!roundError}>No even number, please!</span>
            <br />
            <button type="submit" className="submit">
                Ready!
            </button>
        </form>
    );
};

export default SetupForm;
