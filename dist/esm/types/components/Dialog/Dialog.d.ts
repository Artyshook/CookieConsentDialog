import { ConsentChoice } from "./types";
import React from "react";
interface Props {
    onConsent: (choice: ConsentChoice) => void;
}
declare const CookieConsentDialog: ({ onConsent }: Props) => React.JSX.Element | null;
export default CookieConsentDialog;
