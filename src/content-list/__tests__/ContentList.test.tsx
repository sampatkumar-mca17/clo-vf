import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ContentList from '../ContentList';
import { store } from '../../store/store';
import { setProducts } from '../../store/fashionStore.slice';
describe('ContentList', () => {
test('should render ContentList component with no products', () => {
    
   
    render(
        <Provider store={store}>
            <ContentList height={100} width={100} columnCount={1} />
        </Provider>
    );
    const contentList = screen.getByText('No products found');
    expect(contentList).toBeInTheDocument();
});

    test('should render ContentList component with products', () => {
        store.dispatch(setProducts([{id:"s",title:'test',price:100,imagePath:'test',creater:'test-creator',pricingOption:0}]));
        render(
            <Provider store={store}>
                <ContentList height={100} width={100} columnCount={1} />
            </Provider>
        );
        const contentList = screen.getByTestId('card-virtualizer');
        expect(contentList).toBeInTheDocument();
        const card = screen.getByTestId('card');
        expect(card).toBeInTheDocument();
        const cardTitle = screen.getByTestId('card-title-text');
        expect(cardTitle).toBeInTheDocument();
        expect(cardTitle).toHaveTextContent('test');
        const cardDescription = screen.getByTestId('card-description');
        expect(cardDescription).toBeInTheDocument();
        expect(cardDescription).toHaveTextContent('test-creator');
        const cardPrice = screen.getByTestId('card-price');
        expect(cardPrice).toBeInTheDocument();
        expect(cardPrice).toHaveTextContent('0$');
        const cardImage = screen.getByTestId('card-image');
        expect(cardImage).toBeInTheDocument();
        expect(cardImage).toHaveAttribute('src', 'test');
    })
})