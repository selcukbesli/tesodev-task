import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Landing from '../Landing';

describe('render component', () => {
  test('should render logo image and subText', () => {
    render(<Landing />);

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText(/search web app/i)).toBeInTheDocument();
  });

  test('should error message appear/disappear onSubmit', () => {
    render(<Landing />);

    const input = screen.getByPlaceholderText(/enter a valid input to search by name/i);
    userEvent.clear(input);

    const submitButton = screen.getByRole('button', { name: /search/i });
    userEvent.click(submitButton);

    const errorText = screen.getByText(/plase enter a valid Input!/i);
    expect(errorText).toHaveClass('error');

    userEvent.type(input, 'ss');
    userEvent.click(submitButton);

    expect(errorText).not.toBeInTheDocument();
  });

  test('should render Not found text by default', () => {
    render(<Landing />);

    expect(screen.getByText(/search valid input too see results here!/i)).toBeInTheDocument();
  });
});
