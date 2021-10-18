import { render, screen } from '@testing-library/react';

import NoResultsFound from '../NotFound/NoResultsFound';

test('should render component with given props', () => {
  render(<NoResultsFound />);

  expect(screen.getByText(/search valid input too see results here!/i)).toBeInTheDocument();
});
