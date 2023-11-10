// import { useEffect, useState } from 'react';
//
// export const useCookieConsent = () => {
//     const [consent, setConsent] = useState<string[] | null>(null);
//
//     useEffect(() => {
//         // Funkce, která se zavolá, když uživatel udělá výběr
//         const handleConsentUpdate = (event: CustomEvent<string[]>) => {
//             setConsent(event.detail);
//         };
//
//         // Připojíme posluchač událostí na window
//         window.addEventListener('cookie-consent-update', handleConsentUpdate);
//
//         return () => {
//             // Odebereme posluchače při odmontování komponenty
//             window.removeEventListener('cookie-consent-update', handleConsentUpdate);
//         };
//     }, []);
//
//     return consent;
// };


// import { useEffect, useState } from 'react';
//
// export default function useCookieConsent  (){
//     const [consent, setConsent] = useState<string[] | null>(null);
//
//     useEffect(() => {
//         // Typový guard pro ověření, že událost je správného typu
//         const isConsentEvent = (event: Event): event is CustomEvent<string[]> => {
//             return event.type === 'cookie-consent-update';
//         };
//
//         // Funkce, která se zavolá, když uživatel udělá výběr
//         const handleConsentUpdate: EventListener = (event) => {
//             if (isConsentEvent(event)) {
//                 setConsent(event.detail);
//             }
//         };
//
//         // Připojíme posluchač událostí na window
//         window.addEventListener('cookie-consent-update', handleConsentUpdate);
//
//         return () => {
//             // Odebereme posluchače při odmontování komponenty
//             window.removeEventListener('cookie-consent-update', handleConsentUpdate);
//         };
//     }, []);
//
//     return consent;
// };
//


import {useEffect, useState} from "react";

export default function useCookieConsent() {
    const [consent, setConsent] = useState<string[] | null>(null);

    useEffect(() => {
        const handleConsentUpdate: EventListener = (event) => {
            if (event.type === 'cookie-consent-update') {
                const detail = (event as CustomEvent<string[]>).detail;
                console.log('Consent received:', detail); // Add this line
                setConsent(detail);
            }
        };

        window.addEventListener('cookie-consent-update', handleConsentUpdate);
        return () => {
            window.removeEventListener('cookie-consent-update', handleConsentUpdate);
        };
    }, []);

    return consent;
}