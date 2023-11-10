export declare const cookieOptions: CookieOption[];
export interface CookieOption {
    id: string;
    text: string;
}
export interface CookieConsentDialogProps {
    onChoice: (choice: string) => void;
}
