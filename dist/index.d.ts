import React from 'react';

type ConsentChoice = 'ACCEPT_ALL' | 'REJECT_ALL' | 'CUSTOMIZE' | 'LEARN_MORE';

interface Props {
    onConsent: (choice: ConsentChoice) => void;
}
declare const CookieConsentDialog: ({ onConsent }: Props) => React.JSX.Element | null;

export { CookieConsentDialog as Dialog };
