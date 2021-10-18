import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Pagination from '../Pagination/Pagination';

describe('render Modal component', () => {
  test('should have 6 links with 20 total data and 6 per page', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Pagination datasPerPage={6} totalDatas={20} />
      </Router>
    );
    //  (20/6 ~ 4) + 2 = 6
    expect(screen.getAllByRole('link')).toHaveLength(6);
  });
  test('should have 6 links and 6 dots; with 20 total data and 2 per page', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Pagination datasPerPage={2} totalDatas={20} />
      </Router>
    );
    //  (20/2 ~ 10) + -6 = 6
    expect(screen.getAllByRole('link')).toHaveLength(6);
    expect(screen.getAllByText('.')).toHaveLength(6);
  });
});
