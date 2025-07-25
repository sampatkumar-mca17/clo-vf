import React, { use } from 'react';
import useProducts from '../custom-hooks/useProducts';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "../App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
jest.mock('../custom-hooks/useProducts');
const mockedUseProducts =jest.mocked(useProducts);
describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    const queryClient = new QueryClient();
    test('should render App component with products', () => {
        mockedUseProducts.mockImplementation(() => ({
            data: [],
            isLoading: false,
            isError: false,
            error: null
        }));
        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                <App />
                </QueryClientProvider>
            </Provider>
        );
        const headerContainer = screen.getByTestId('header-container');
        expect(headerContainer).toBeInTheDocument();
        const contentContainer = screen.getByTestId('content-container');
        expect(contentContainer).toBeInTheDocument();
        const filterContainer = screen.getByTestId('filter-container');
        expect(filterContainer).toBeInTheDocument();
        const contentListContainer = screen.getByTestId('content-list-container');
        expect(contentListContainer).toBeInTheDocument();
    });
    test('should render App component with loading indicator', () => {
        mockedUseProducts.mockImplementation(() => ({
            data: [],
            isLoading: true,
            isError: false,
            error: null
        }));
        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                <App />
                </QueryClientProvider>
            </Provider>
        );
  
        const loading = screen.getByTestId('loading');
        expect(loading).toBeInTheDocument();
    });
    test('should render App component with error message', () => {
        mockedUseProducts.mockImplementation(() => ({
            data: [],
            isLoading: false,
            isError: true,
            error: new Error('Something went wrong')
        }));
        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                <App />
                </QueryClientProvider>
            </Provider>
        );
  
        const error = screen.getByTestId('error');
        expect(error).toBeInTheDocument();
    });
});
