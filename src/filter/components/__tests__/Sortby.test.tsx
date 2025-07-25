import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store'; // Verify this path is correct
import Sortby from '../Sortby';


test('should have default value of relevance', () => {
    render(
    <Provider store={store}>
      <Sortby />
    </Provider>
  );
  const select = screen.getByRole('combobox');
  expect(select).toBeInTheDocument(); // Use toBeInTheDocument instead of toBeTruthy
  expect(select).toHaveValue('relavance'); // Check the select's value
});

test('changing value of sort should update the store', async () => {
    render(
    <Provider store={store}>
      <Sortby />
    </Provider>
  );
  const select = screen.getByRole('combobox');
  await fireEvent.change(select, { target: { value: 'higherPrice' } });
  expect(store.getState().fashion.sortValue).toBe('higherPrice');
});