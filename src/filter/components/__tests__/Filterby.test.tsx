import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store'; // Verify this path is correct
import Filterby from '../Filterby';
import { setFilterOptions } from '../../../store/fashionStore.slice';
describe('Filterby Component', () => {
    // beforeEach(() => {
    //     screen.getByTestId('paid-checkbox')?.setAttribute('checked','false');
    // });
    test('should render Filterby component', () => {
        render(
            <Provider store={store}>
                <Filterby />
            </Provider>
        );
        const pricingOptions = screen.getByText('Pricing Options');
        expect(pricingOptions).toBeInTheDocument();
        const paid = screen.getByText('Paid');
        expect(paid).toBeInTheDocument();
        const free = screen.getByText('Free');
        expect(free).toBeInTheDocument();
        const viewOnly = screen.getByText('View Only');
        expect(viewOnly).toBeInTheDocument();
        const reset = screen.getByText('Reset');
        expect(reset).toBeInTheDocument();
    });
    
    test('should update filter options when checkbox is clicked', () => {
        render(
            <Provider store={store}>
                <Filterby />
            </Provider>
        );
        
        const paid = screen.getByTestId('paid-checkbox');
        fireEvent.click(paid);
    
        const free = screen.getByTestId('free-checkbox');
        fireEvent.click(free);
        expect(store.getState().fashion.filterOptions.free).toBe(true);
    
        const viewOnly = screen.getByTestId('view-only-checkbox');
        fireEvent.click(viewOnly);
        expect(store.getState().fashion.filterOptions.viewOnly).toBe(true);
    
        const reset = screen.getByText('Reset');
        fireEvent.click(reset);
        expect(store.getState().fashion.filterOptions).toEqual({ paid: false, free: false, viewOnly: false,priceRange:0 });
    });
    
    test('should update price range when slider is changed', () => {
        render(
            <Provider store={store}>
                <Filterby />
            </Provider>
        );
        const paid = screen.getByTestId('paid-checkbox');
        fireEvent.click(paid);
        const priceRange = screen.getByTestId('price-range');
        expect(priceRange).toBeEnabled();
        fireEvent.change(priceRange,{target:{value:50}});
        expect(store.getState().fashion.filterOptions.priceRange).toBe(50);
    });
    
    test('should disable price range when paid is not checked', () => {
        store.dispatch(setFilterOptions({paid:false,free:false,viewOnly:false,priceRange:0}))
        render(
            <Provider store={store}>
                <Filterby />
            </Provider>
        );
        const priceRange = screen.getByTestId('price-range');
        expect(priceRange).toBeDisabled();
    });
})
