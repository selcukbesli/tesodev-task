import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../Input/Input';

describe('render Input component', () => {
  test('should have an input type text "', () => {
    render(
      <Input
        placeholder="Enter a valid input to search by name"
        input=""
        setInput={jest.fn()}
        error={false}
      />
    );

    expect(screen.getByPlaceholderText(/enter a valid input to search by name/i)).toHaveAttribute(
      'type',
      'text'
    );
  });

  test('should have error text, and input haveClass "input-error"', () => {
    render(
      <Input
        placeholder="Enter a valid input to search by name"
        input=""
        setInput={jest.fn()}
        error={true}
      />
    );
    expect(screen.getByText(/plase enter a valid Input!/i)).toHaveClass('error');
    expect(screen.getByPlaceholderText(/enter a valid input to search by name/i)).toHaveClass(
      'input-error'
    );
  });
});
