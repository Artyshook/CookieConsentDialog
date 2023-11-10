export default function emitConsentUpdate(consent: string[]) {
    console.log('emitConsentUpdate called with:', consent); // Add this line
    const event = new CustomEvent('cookie-consent-update', { detail: consent });
    window.dispatchEvent(event);
};

