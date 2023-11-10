import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {useCookieConsent} from "../../hooks";
import {emitConsentUpdate} from "../../utils";
import {CookieConsentDialogProps, CookieOption, cookieOptions} from "./utils/cookieOptions";


export default function CookieConsentDialog({ onChoice }: CookieConsentDialogProps) {
    // State to track if the portal target is available in the DOM
    const [isTargetAvailable, setIsTargetAvailable] = useState(false);

    // State to store the user's consent status
    const consent = useCookieConsent();

    // State to track which cookie option has been chosen by the user
    const [chosenOption, setChosenOption] = useState<string | null>(null);

    // Effect to verify that the body element is available for rendering the portal
    useEffect(() => {
        const targetEl = document.body;
        if (targetEl) {
            setIsTargetAvailable(true);
        }
    }, []);

    // Handler for click events on cookie options
    const handleOptionClick = (option: CookieOption) => {
        // Propagate the chosen option to the parent component
        onChoice(option.text);
        // Update the chosen option state
        setChosenOption(option.id);
        // Emit an event to update the consent state elsewhere in the app
        emitConsentUpdate([option.id]);
    };

    // Conditional rendering to prevent the dialog from showing if consent is already given
    // or if the portal target is not available
    if (!isTargetAvailable || consent) {
        return null;
    }

    // Rendering the dialog using a React Portal to attach it directly to the body
    // This ensures the dialog appears on top of other content
    return ReactDOM.createPortal(
        // Overlay div to create a backdrop for the modal, covering the entire viewport
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* Dialog container with styling */}
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                width: '80%',
                maxWidth: '400px'
            }}>
                {/* Title of the dialog */}
                <h2>Vyberte si jednu z variant</h2>
                {/* Container for the cookie option buttons */}
                <div style={{ marginTop: '20px' }}>
                    {/* Mapping over the predefined cookie options and rendering them */}
                    {cookieOptions.map((option) => (
                        // Individual cookie option button
                        <div
                            key={option.id}
                            style={{
                                backgroundColor: '#7c4dff',
                                color: '#ffffff',
                                padding: '10px 20px',
                                margin: '10px 0',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                                fontSize: '20px',
                                boxShadow: chosenOption === option.id ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
                                transform: chosenOption === option.id ? 'scale(1.05)' : 'none'
                            }}
                            // Click handler for selecting an option
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body // Attaching the portal to the body element
    );
};

