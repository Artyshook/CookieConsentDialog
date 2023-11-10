'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

function useCookieConsent() {
    const [consent, setConsent] = React.useState(null);
    React.useEffect(() => {
        const savedConsent = localStorage.getItem('userConsent');
        if (savedConsent) {
            setConsent(JSON.parse(savedConsent));
        }
        const handleConsentUpdate = (event) => {
            if (event.type === 'cookie-consent-update') {
                const detail = event.detail;
                setConsent(detail);
                localStorage.setItem('userConsent', JSON.stringify(detail));
            }
        };
        window.addEventListener('cookie-consent-update', handleConsentUpdate);
        return () => {
            window.removeEventListener('cookie-consent-update', handleConsentUpdate);
        };
    }, []);
    return consent;
}

function emitConsentUpdate(consent) {
    console.log('emitConsentUpdate called with:', consent); // Add this line
    const event = new CustomEvent('cookie-consent-update', { detail: consent });
    window.dispatchEvent(event);
}

const cookieOptions = [
    { id: 'necessary', text: 'Nezbytné cookies' },
    { id: 'analytics', text: 'Analytické cookies' },
    { id: 'marketing', text: 'Marketingové cookies' },
    { id: 'socialMedia', text: 'Cookies pro sociální média' }
];

function CookieConsentDialog({ onChoice }) {
    // State to track if the portal target is available in the DOM
    const [isTargetAvailable, setIsTargetAvailable] = React.useState(false);
    // State to store the user's consent status
    const consent = useCookieConsent();
    // State to track which cookie option has been chosen by the user
    const [chosenOption, setChosenOption] = React.useState(null);
    // Effect to verify that the body element is available for rendering the portal
    React.useEffect(() => {
        const targetEl = document.body;
        if (targetEl) {
            setIsTargetAvailable(true);
        }
    }, []);
    // Handler for click events on cookie options
    const handleOptionClick = (option) => {
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
    React.createElement("div", { style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        } },
        React.createElement("div", { style: {
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                width: '80%',
                maxWidth: '400px'
            } },
            React.createElement("h2", null, "Vyberte si jednu z variant"),
            React.createElement("div", { style: { marginTop: '20px' } }, cookieOptions.map((option) => (
            // Individual cookie option button
            React.createElement("div", { key: option.id, style: {
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
                }, 
                // Click handler for selecting an option
                onClick: () => handleOptionClick(option) }, option.text)))))), document.body // Attaching the portal to the body element
    );
}

exports.CookieConsentDialog = CookieConsentDialog;
exports.emitConsentUpdate = emitConsentUpdate;
exports.useCookieConsent = useCookieConsent;
//# sourceMappingURL=index.js.map
