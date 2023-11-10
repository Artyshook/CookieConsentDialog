# waulter-test1

A JavaScript library for handling cookie consent dialogs in web applications.

## Installation

You can install `waulter-test1` using npm or yarn:


```bash
npm install waulter-test1 --save
```
### Usage

To use the `CookieConsentDialog` component, follow these steps:

1. Import the `CookieConsentDialog` component into your application:

```javascript
import {CookieConsentDialog} from 'waulter-test1';
```
2. Create a callback function to handle user choices. This function will be called when the user interacts with the dialog:
```javascript
const handleChoice = (choice) => {
    // Handle the user's choice here (e.g., store it in a cookie)
};
```
3. Use the `CookieConsentDialog` component in your application:
```javascript
import React, { useState } from 'react';
import CookieConsentDialog from 'waulter-test1';

function App() {
    const [consentGiven, setConsentGiven] = useState(false);

    const handleChoice = (choice) => {
        // Handle user's choice here (e.g., store it in a cookie)
    };

    return (
        <div>
            <CookieConsentDialog onChoice={handleChoice} />
            {/* Your app content */}
        </div>
    );
}

export default App;

```
4. Customize the appearance and behavior of the dialog by passing props to the CookieConsentDialog component.

### Props
`onChoice` : A callback function that is called when the user makes a choice in the dialog. It receives the selected option as an argument.
