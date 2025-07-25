import { createSlice } from '@reduxjs/toolkit';
import type { FilterOptions, Product } from '../model/model';
import type { PayloadAction } from '@reduxjs/toolkit';
import { searchProducts, sortProducts } from '../utils/utils';
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
            priceRange:0,
        },
        searchValue:"",
        sortValue:"relavance",
    },
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.filteredProducts = sortProducts(state.sortValue as "relavance"|"higherPrice"|"lowerPrice", action.payload);
        },
        setFilterOptions: (state, action: PayloadAction<FilterOptions>) => {
            state.filterOptions = action.payload;
            state.filteredProducts = searchProducts(action.payload, state.searchValue, state.products, state.filterOptions.priceRange);
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
            state.filteredProducts = searchProducts(state.filterOptions, action.payload, state.products, state.filterOptions.priceRange);
        },
        setSortValue: (state, action: PayloadAction<"relavance"|"higherPrice"|"lowerPrice">) => {
            state.sortValue = action.payload;
            state.filteredProducts = sortProducts(action.payload, state.filteredProducts);
        },
    },
});

export const { setProducts, setFilterOptions,setSearchValue,setSortValue } = fashionSlice.actions;
export default fashionSlice.reducer;