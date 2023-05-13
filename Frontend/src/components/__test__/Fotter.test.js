import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import '@testing-library/jest-dom/extend-expect';
describe('Footer component', () => {
    it('should render the current year', () => {
        const { getByTestId } = render(<Footer />);
        const footer = getByTestId('footer');
        expect(footer).toBeInTheDocument();

        const currentYear = new Date().getFullYear();
        const yearText = screen.getByText(`Copyright ⓒ ${currentYear}`);
        expect(yearText).toBeInTheDocument();
    });
});