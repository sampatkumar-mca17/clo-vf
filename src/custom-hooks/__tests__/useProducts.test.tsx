import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import useProducts from '../useProducts'
import { useQuery } from '@tanstack/react-query'
import type { Product } from '../../model/model'
jest.mock('@tanstack/react-query');
const mockedUseQuery = jest.mocked(useQuery);
describe('useProducts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('should return products', () => {
        const mockedData:Product[] = [{
            id: "1",
            title: 'Product 1',
            price: 10,
            creater: 'Creator 1',
            imagePath: 'Image 1',
            pricingOption: 0,
        }]
        mockedUseQuery.mockReturnValue({ data: mockedData, isLoading: false, isError: false, error: null } as any)
        const { data, isLoading, isError, error } = useProducts({ endpoint: 'https://fakestoreapi.com/products' })
        expect(data).toBeDefined()
        expect(data).toEqual(mockedData)
        expect(isLoading).toBe(false)
        expect(isError).toBe(false)
        expect(error).toBe(null)
    })
    test('should return error', () => {
        mockedUseQuery.mockReturnValue({ data: null, isLoading: false, isError: true, error: new Error('Something went wrong') } as any)
        const { data, isLoading, isError, error } = useProducts({ endpoint: 'https://fakestoreapi.com/products' })
        expect(data).toBeDefined()
        expect(data).toEqual(null)
        expect(isLoading).toBe(false)
        expect(isError).toBe(true)
        expect(error).toBeDefined()
    })
    test('should return loading', () => {
        mockedUseQuery.mockReturnValue({ data: null, isLoading: true, isError: false, error: null } as any)
        const { data, isLoading, isError, error } = useProducts({ endpoint: 'https://fakestoreapi.com/products' })
        expect(data).toBeDefined()
        expect(data).toEqual(null)
        expect(isLoading).toBe(true)
        expect(isError).toBe(false)
        expect(error).toBe(null)
    })
})
