import type { FilterOptions, Product } from "../model/model";

export const searchProducts = (filterOptions: FilterOptions, searchText: string, products: Product[], priceRange: number) => {
    const filteredProducts = products.filter((product: Product) => {
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
    return searchProductsByPriceRange(filteredProducts, priceRange);
}

export const sortProducts = ( sortValue: "relavance"|"higherPrice"|"lowerPrice", products: Product[]) => {
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
    return sortedProducts;
}

const searchProductsByPriceRange = (products: Product[], priceRange: number) => {
    const filteredProductsByPriceRange = products.filter((product: Product) => {
        return product.price >= priceRange;
    });
    return filteredProductsByPriceRange;
}
    