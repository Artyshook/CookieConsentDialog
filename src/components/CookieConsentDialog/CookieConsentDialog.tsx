import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {useCookieConsent} from "../../hooks";
import {emitConsentUpdate} from "../../utils";

// Definujeme typ pro jednotlivou cookie možnost
interface CookieOption {
    id: string;
    text: string;
}

// Definujeme typ pro props komponenty
interface CookieConsentDialogProps {
    onChoice: (choice: string) => void;
}

// Předdefinované možnosti cookies
const cookieOptions: CookieOption[] = [

    { id: 'necessary', text: 'Nezbytné cookies' },
    { id: 'analytics', text: 'Analytické cookies' },
    { id: 'marketing', text: 'Marketingové cookies' },
    { id: 'socialMedia', text: 'Cookies pro sociální média' }
];

export default function  CookieConsentDialog ({ onChoice }: CookieConsentDialogProps) {
    const [isTargetAvailable, setIsTargetAvailable] = useState(false);
    const consent = useCookieConsent(); // Just getting consent
    const [chosenOption, setChosenOption] = useState<string | null>(null);


    useEffect(() => {
        const targetEl = document.body;
        if (targetEl) {
            setIsTargetAvailable(true);
        }
    }, []);

    const handleOptionClick = (option: CookieOption) => {
        onChoice(option.text)
        setChosenOption(option.id);
        emitConsentUpdate([option.id]); // Emitting the event will update the consent state in the hook
    };
    if (!isTargetAvailable || consent) {
        // Don't render if the target is not available or consent has been given
        return null;
    }

    // Portal rendering logic
    return ReactDOM.createPortal(
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
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                width: '80%',
                maxWidth: '400px'
            }}>
                <h2>Vyberte si jednu z variant</h2>
                <div style={{ marginTop: '20px' }}>
                    {cookieOptions.map((option) => (
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
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );

};


