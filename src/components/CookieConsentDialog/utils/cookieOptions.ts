
export const cookieOptions: CookieOption[] = [

    { id: 'necessary', text: 'Nezbytné cookies' },
    { id: 'analytics', text: 'Analytické cookies' },
    { id: 'marketing', text: 'Marketingové cookies' },
    { id: 'socialMedia', text: 'Cookies pro sociální média' }
];

export interface CookieOption {
    id: string;
    text: string;
}

export interface CookieConsentDialogProps {
    onChoice: (choice: string) => void;
}
