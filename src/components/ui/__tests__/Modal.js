import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Modal from '../Modal/Modal';

describe('render Modal component', () => {
  test('should NOT show Modal"', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Modal showModal={false} handleClose={jest.fn()} />
      </Router>
    );
    expect(screen.getAllByText('')[1]).toBeEmptyDOMElement();
  });
  test('should open modal and modal have 4 links"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Modal showModal={true} handleClose={jest.fn()} />
      </Router>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
  });
});
