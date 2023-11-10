import {useEffect, useState} from "react";

export default function useCookieConsent() {
    const [consent, setConsent] = useState<string[] | null>(null);

    useEffect(() => {
        const savedConsent = localStorage.getItem('userConsent');
        if (savedConsent) {
            setConsent(JSON.parse(savedConsent));
        }

        const handleConsentUpdate: EventListener = (event) => {
            if (event.type === 'cookie-consent-update') {
                const detail = (event as CustomEvent<string[]>).detail;
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
