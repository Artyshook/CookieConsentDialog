import React from 'react';

interface CookieConsentDialogProps {
    onChoice: (choice: string) => void;
}

declare function CookieConsentDialog({ onChoice }: CookieConsentDialogProps): React.ReactPortal | null;

declare function useCookieConsent(): string[] | null;

declare function emitConsentUpdate(consent: string[]): void;

export { CookieConsentDialog, emitConsentUpdate, useCookieConsent };
