'use strict';

var React = require('react');

// const CookieConsentDialog = () => {
//     return <>MyDialogLibraryHEREE</>
// }
const CookieConsentDialog = ({ onConsent }) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const handleConsent = (choice) => {
        setIsVisible(false);
        onConsent(choice);
    };
    if (!isVisible) {
        return null;
    }
    return (React.createElement("div", { className: "overlay" },
        React.createElement("div", { className: "dialog" },
            React.createElement("p", null, "Please select your cookie consent preference:"),
            React.createElement("button", { onClick: () => handleConsent('ACCEPT_ALL') }, "Accept All"),
            React.createElement("button", { onClick: () => handleConsent('REJECT_ALL') }, "Reject All"),
            React.createElement("button", { onClick: () => handleConsent('CUSTOMIZE') }, "Customize"),
            React.createElement("button", { onClick: () => handleConsent('LEARN_MORE') }, "Learn More"))));
};

exports.Dialog = CookieConsentDialog;
//# sourceMappingURL=index.js.map
