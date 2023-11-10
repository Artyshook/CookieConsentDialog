import React from 'react';
import CookieConsentDialog from './CookieConsentDialog';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from "@testing-library/react"; // This line is all you need

describe('CookieConsentDialog', () => {
    it('renders options and calls onChoice with the right option when clicked', () => {
        const handleChoice = jest.fn();
        render(<CookieConsentDialog onChoice={handleChoice} />);

        const option = screen.getByText('Nezbytné cookies');
        fireEvent.click(option);
        expect(handleChoice).toHaveBeenCalledWith('Nezbytné cookies');
    });

});