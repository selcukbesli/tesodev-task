import { render, screen } from '@testing-library/react';

import Button from '../Button/Button';

describe('render  component properly  depends on props', () => {
  test('should have "class=button-primary" and type="button"', () => {
    render(<Button onClick={jest.fn()} children="Search" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('button-primary');
    expect(button).toHaveAttribute('type', 'button');
  });
  test('should have "class=button-clear" and type="submit"', () => {
    render(<Button onClick={jest.fn()} children="Search" type="submit" buttonClear={true} />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('button-clear');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
