import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store'; // Verify this path is correct
import Sortby from '../Sortby';
import Search from '../Search';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { setSearchValue } from '../../../store/fashionStore.slice';

describe('Search Component', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
  
    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  
    test('renders input and search icon', () => {
      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
  
      const input = screen.getByPlaceholderText("Find the item you're looking for");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
  
      const icon = screen.getByTestId('search-icon');
      expect(icon).toBeInTheDocument();
    });
  
    test('debounces and dispatches search value on input change', () => {
      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
  
      const input = screen.getByPlaceholderText("Find the item you're looking for");
  
      // Simulate input change
      fireEvent.input(input, { target: { value: 'test query' } });
  
      // Before debounce time, no dispatch
      jest.advanceTimersByTime(499);
      expect(store.getState().fashion.searchValue).toBe('');
  
      // After debounce, dispatch happens
      jest.advanceTimersByTime(1);
      expect(store.getState().fashion.searchValue).toBe('test query');
    });
  
    test('handles multiple input changes with debounce (only last value dispatched)', () => {
      store.dispatch(setSearchValue(''));
      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
  
      const input = screen.getByPlaceholderText("Find the item you're looking for");
  
      // Rapid changes within debounce window
      fireEvent.input(input, { target: { value: 't' } });
      jest.advanceTimersByTime(200);
  
      fireEvent.input(input, { target: { value: 'te' } });
      jest.advanceTimersByTime(200);
  
      fireEvent.input(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(200);
  
      // Still no dispatch (total time from last change: 200ms)
      expect(store.getState().fashion.searchValue).toBe('');
  
      // Advance past debounce from last change
      jest.advanceTimersByTime(300);
      expect(store.getState().fashion.searchValue).toBe('test');
    });
  
    test('unsubscribes from RxJS subscription on unmount', () => {
      const unsubscribeSpy = jest.spyOn(Subscription.prototype, 'unsubscribe');
  
      const { unmount } = render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
  
      // Simulate some activity to ensure subscription is active
      const input = screen.getByPlaceholderText("Find the item you're looking for");
      fireEvent.input(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(500);
  
      // Unmount the component
      unmount();
  
      // Verify unsubscribe was called
      expect(unsubscribeSpy).toHaveBeenCalledTimes(3);
    });
        
  });

