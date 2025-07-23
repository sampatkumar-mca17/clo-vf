import { createSlice } from '@reduxjs/toolkit';
import type { FilterOptions, Product } from '../model/model';
import type { PayloadAction } from '@reduxjs/toolkit';
import { searchProducts } from '../utils/utils';
const products: Product[] = [];
export const fashionSlice = createSlice({
    name: 'fashion',
    initialState: {
        products: products,
        filteredProducts: products,
        filterOptions:{
            free:false,
            paid:false,
            viewOnly:false,
        },
        searchValue:"",
    },
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setFilteredProducts: (state, action: PayloadAction<Product[]>) => {
            state.filteredProducts = action.payload;
        },
        setFilterOptions: (state, action: PayloadAction<FilterOptions>) => {
            state.filterOptions = action.payload;
            state.filteredProducts = searchProducts(action.payload, state.searchValue, state.products);
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
            state.filteredProducts = searchProducts(state.filterOptions, action.payload, state.products);
        },
    },
});

export const { setProducts, setFilteredProducts,setFilterOptions,setSearchValue } = fashionSlice.actions;
export default fashionSlice.reducer;