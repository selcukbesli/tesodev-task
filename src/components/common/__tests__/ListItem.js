import { render, screen } from '@testing-library/react';

import ListItem from '../ListItem/ListItem';

test('should render component with given props', () => {
  render(
    <ListItem
      name="Hyacinth Vincent"
      email="iaculis.enim@magnaCrasconvallis.ca"
      date="28/06/2022"
      country="Eritrea"
      city="Lyubertsy"
    />
  );

  expect(screen.getByText('Hyacinth Vincent - 2022')).toBeInTheDocument();
  expect(screen.getByText('Email: iaculis.enim@magnaCrasconvallis.ca')).toBeInTheDocument();
  expect(screen.getByText('Eritrea - Lyubertsy')).toBeInTheDocument();
});
