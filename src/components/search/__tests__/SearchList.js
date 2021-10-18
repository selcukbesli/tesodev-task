import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import SearchList from '../SearchList/SearchList';

const DATA = [
  {
    city: 'Colwood',
    company: 'Volutpat Nunc Associates',
    country: 'British Indian Ocean Territory',
    date: '24/03/2021',
    email: 'iaculis@estMauris.org',
    name: 'Brenden Martinez',
  },
  {
    city: 'Camborne',
    company: 'Fames Corp.',
    country: 'Cocos (Keeling) Islands',
    date: '19/02/2021',
    email: 'ut.molestie.in@commodohendrerit.org',
    name: 'Alden Carr',
  },
  {
    city: 'Cour-sur-Heure',
    company: 'Elit Pharetra Industries',
    country: 'Brunei',
    date: '12/04/2021',
    email: 'et@non.ca',
    name: 'Samantha Marquez',
  },
];

describe('should render properly for 3 differents array length of search result', () => {
  test('should render "Show more..." if result length >2', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <SearchList data={DATA} searchBy="ar" />
      </Router>
    );

    expect(screen.getByRole('button', { name: /show more.../i })).toBeInTheDocument();
  });

  test('should NOT render "Show more..." if  result  0> length >2', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <SearchList data={DATA.filter((_, index) => index < 2)} searchBy="ar" />
      </Router>
    );

    expect(screen.queryByRole('button', { name: /show more.../i })).not.toBeInTheDocument();
  });

  test('should render NoResultsFound if  result length = 0', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <SearchList data={[]} searchBy="ar" />
      </Router>
    );
    expect(screen.getByText(/search valid input too see results here!/i)).toBeInTheDocument();
  });
});
