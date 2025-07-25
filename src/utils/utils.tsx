import type { FilterOptions, Product } from "../model/model";

export const searchProducts = ():((filterOptions: FilterOptions, searchText: string, products: Product[], priceRange: number, sortValue: "relavance"|"higherPrice"|"lowerPrice") => Product[]) => {
    
    const memo = new Map();
    return (filterOptions: FilterOptions, searchText: string, products: Product[], priceRange: number, sortValue: "relavance"|"higherPrice"|"lowerPrice") =>{
        const key = JSON.stringify({filterOptions, searchText, products, priceRange, sortValue});
        if(memo.has(key)){
            console.warn('Search from cache');
            return JSON.parse(memo.get(key)) as Product[];
        }
        const filteredProducts = filterAndSearch(products, filterOptions, searchText);
        const filteredProductsByPriceRange = searchProductsByPriceRange(filteredProducts, priceRange);
        memo.set(key, JSON.stringify(filteredProductsByPriceRange));
        return filteredProductsByPriceRange;
    }
}

export const sortProducts = ():((sortValue: "relavance"|"higherPrice"|"lowerPrice", products: Product[]) => Product[]) => {
    const memo = new Map();
    return (sortValue: "relavance"|"higherPrice"|"lowerPrice", products: Product[]):Product[] =>{
        const key = JSON.stringify({sortValue, products});
        if(memo.has(key)){
            console.warn('Sort from cache');
            return JSON.parse(memo.get(key)) as Product[];
        }
        const productsCopy = [...products];
        const sortedProducts = productsCopy.sort((a: Product, b: Product) => {
            if(sortValue === "relavance"){
                return a.title.localeCompare(b.title);
            }else if(sortValue === "higherPrice"){
            return b.price - a.price;
        }else{
            return a.price - b.price;
        }
        });
        memo.set(key, JSON.stringify(sortedProducts));
        return sortedProducts;
    }
}

const searchProductsByPriceRange = (products: Product[], priceRange: number) => {
    const filteredProductsByPriceRange = products.filter((product: Product) => {
        return product.price >= priceRange;
    });
    return filteredProductsByPriceRange;
}

const filterAndSearch = (products: Product[], filterOptions: FilterOptions, searchText: string):Product[] => {
    return products.filter((product: Product) => {
        let filterProduct = false;
        if(!filterOptions.free && !filterOptions.paid && !filterOptions.viewOnly){
            filterProduct = true;
        }else{
            filterProduct = filterOptions.free && product.pricingOption === 1 || filterOptions.paid && product.pricingOption === 0 || filterOptions.viewOnly && product.pricingOption === 2;
        }
        if(searchText?.length > 0){
            filterProduct = filterProduct && product.title.toLowerCase().includes(searchText.toLowerCase());
        }
        return filterProduct;
    });
}
    