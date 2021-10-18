import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import React from 'react';

import App from '../App';

test('should finish the search flow', async () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  // find input with placeholder and type "ar" to search
  const searchInput = screen.getByPlaceholderText(/enter a valid input/i);
  userEvent.clear(searchInput);
  userEvent.type(searchInput, 'ar');

  // find submit button and click
  const submitButton = screen.getByRole('button', { name: /search/i });
  userEvent.click(submitButton);

  // expext to see 3 emails on page
  const emailTexts = screen.getAllByText(/email/i);
  expect(emailTexts).toHaveLength(3);

  // find showmore button and click to redirect
  const showMoreButton = screen.getByRole('button', { name: /show more.../i });
  userEvent.click(showMoreButton);

  // expext input text to persist on new page
  const resultsInput = screen.getByPlaceholderText(/enter a valid input/i);
  expect(resultsInput).toHaveValue('ar');

  // expext to see 6 emails on page
  const emailResults = screen.getAllByText(/email/i);
  expect(emailResults).toHaveLength(6);

  // find all links and than click "3" and "Next" and expect to see 4 email results
  const links = screen.getAllByRole('link');
  userEvent.click(links[3]);
  userEvent.click(links[5]);
  const emailFinalResults = screen.getAllByText(/email/i);
  expect(emailFinalResults).toHaveLength(4);

  // find orderby button  to use multiple times
  const orderByButton = screen.getByRole('button', { name: /order by/i });

  // click orderBy button, find and click "Name Descending", expect() specified email on page
  userEvent.click(orderByButton);
  const nameDescLink = screen.getByRole('link', { name: /name descending/i });
  userEvent.click(nameDescLink);
  expect(screen.getByText(/email: nam.tempor/i)).toBeInTheDocument();

  // click orderBy button, find and click "Year Ascending", expect() specified email on page
  userEvent.click(orderByButton);
  const yearAscLink = screen.getByRole('link', { name: /year ascending/i });
  userEvent.click(yearAscLink);
  expect(screen.getByText(/email: pede.blandit/i)).toBeInTheDocument();

  // click orderBy button, find and click "Year Descending", expect() specified email on page
  userEvent.click(orderByButton);
  const yearDescLink = screen.getByRole('link', { name: /year descending/i });
  userEvent.click(yearDescLink);
  expect(screen.getByText(/email: In.mi/i)).toBeInTheDocument();
});
