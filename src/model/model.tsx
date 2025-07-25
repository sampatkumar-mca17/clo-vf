export interface Product{
    creater:string,
    id:string,
    imagePath:string,
    price:number,
    pricingOption:number,
    title:string
}

export interface State{
    fashion:FashionState;
}

export interface FashionState{
    products:Product[];
    filteredProducts:Product[];
    filterOptions:FilterOptions,
    sortValue:"relavance"|"higherPrice"|"lowerPrice",
}
export interface FilterOptions{
    free:boolean,
    paid:boolean,
    viewOnly:boolean,
    priceRange:number,
}
    