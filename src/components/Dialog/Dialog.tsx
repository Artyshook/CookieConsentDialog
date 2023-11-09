import {ConsentChoice} from "./types";
import React, {useState} from "react";

interface Props {
    onConsent: (choice: ConsentChoice) => void;
}

const CookieConsentDialog = ({ onConsent } : Props) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleConsent = (choice: ConsentChoice) => {
        setIsVisible(false);
        onConsent(choice);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="dialog">
                <p>Please select your cookie consent preference:</p>
                <button onClick={() => handleConsent('ACCEPT_ALL')}>Accept All</button>
                <button onClick={() => handleConsent('REJECT_ALL')}>Reject All</button>
                <button onClick={() => handleConsent('CUSTOMIZE')}>Customize</button>
                <button onClick={() => handleConsent('LEARN_MORE')}>Learn More</button>
            </div>
        </div>
    );
};

export default CookieConsentDialog;
