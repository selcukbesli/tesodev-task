import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Results from '../Results';

describe('render component', () => {
  test('should render logo image and subText', () => {
    const history = createMemoryHistory();
    history.push('/results/1?searchBy=ar&orderBy=nameAscending');

    render(
      <Router history={history}>
        <Results />
      </Router>
    );

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  test('should error message appear/disappear onSubmit', () => {
    const history = createMemoryHistory();
    history.push('/results/1?searchBy=ar&orderBy=nameAscending');

    render(
      <Router history={history}>
        <Results />
      </Router>
    );

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

  test('should render 6 links on pagination 22/6 ~4', () => {
    const history = createMemoryHistory();
    history.push('/results/1?searchBy=ar&orderBy=nameAscending');

    render(
      <Router history={history}>
        <Results />
      </Router>
    );

    expect(screen.getAllByRole('link')).toHaveLength(6);
  });
  test('should render NoResultFound text if no match', () => {
    const history = createMemoryHistory();
    history.push('/results/1?searchBy=arasdasd&orderBy=nameAscending');

    render(
      <Router history={history}>
        <Results />
      </Router>
    );

    expect(screen.getByText(/search valid input too see results here!/i)).toBeInTheDocument();
  });
});
