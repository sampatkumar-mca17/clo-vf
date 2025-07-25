import React from 'react'
import {FixedSizeGrid} from 'react-window';
import Card from './Card';
import type { Product } from '../../model/model';
import { PRICING_OPTIONS } from '../../constants/constants';
import "./CardVirtualizer.scss"
function CardVirtualizer({products, height, width, rowCount, columnCount, rowHeight, columnWidth}: {products: Product[], height: number, width: number, rowCount: number, columnCount: number, rowHeight: number, columnWidth: number}) {
    const Row = ({ columnIndex, rowIndex, style,data }: {columnIndex: number; rowIndex: number; style: React.CSSProperties; data: any}) => {
      console.log(rowIndex, columnCount, rowCount);
      const item:Product = data[(rowIndex*columnCount)+columnIndex];
      if(item){
        return (
            <div style={{...style, padding: '0 1rem 1rem 1rem'}} className='grid-item'>
                <Card style={{ padding: '1rem'}} key={item?.id} title={item?.title} description={item?.creater} priceOption={item?.pricingOption !== 0 ? PRICING_OPTIONS[item?.pricingOption] : `${item.price}$`} image={item?.imagePath}/>
            </div> 
          )
      }
    }
    return (
      <div className="content-list" data-testid="card-virtualizer">  
        <FixedSizeGrid
          height={height}
          width={width}
          rowCount={rowCount}
          rowHeight={rowHeight}
          columnCount={columnCount}
          columnWidth={columnWidth}
          itemData={products}
        >
          {Row}
        </FixedSizeGrid>
      </div>
    );
}

export default CardVirtualizer