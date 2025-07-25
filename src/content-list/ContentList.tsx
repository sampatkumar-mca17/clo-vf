import React from "react";
import type { Product } from "../model/model";
import "./ContentList.scss"
import { useSelector } from "react-redux";
import CardVirtualizer from "./components/CardVirtualizer";
function ContentList({height, width, columnCount}: {height: number, width: number, columnCount: number}) {
    const products: Product[] = useSelector((state: any) => state.fashion.filteredProducts);
    return (
        <>
            {
                products.length > 0 && <CardVirtualizer
                products={products} 
                height={height - 70} 
                width={width} 
                rowCount={products.length/(products.length >= columnCount ? columnCount : products.length)} 
                columnCount={products.length >= columnCount ? columnCount : products.length} 
                rowHeight={392.5} 
                columnWidth={(width/columnCount)-10}/>
            }
            {
                products.length === 0 && <div className="loading">No products found</div>
            }
        </>
    )
}
export default ContentList
