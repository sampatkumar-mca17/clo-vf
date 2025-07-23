import type { FilterOptions, Product } from "../model/model";

export const searchProducts = (filterOptions: FilterOptions, searchText: string, products: Product[]) => {
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
    return filteredProducts;
}
