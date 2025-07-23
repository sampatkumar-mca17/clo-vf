import React from 'react'
import {FixedSizeGrid} from 'react-window';
import Card from './Card';
import type { Product } from '../../model/model';
import { PRICING_OPTIONS } from '../../constants/constants';
import "./CardVirtualizer.scss"
function CardVirtualizer({products, height, width, rowCount, columnCount, rowHeight, columnWidth}: {products: Product[], height: number, width: number, rowCount: number, columnCount: number, rowHeight: number, columnWidth: number}) {
    const Row = ({ columnIndex, rowIndex, style,data }: {columnIndex: number; rowIndex: number; style: React.CSSProperties; data: any}) => {
      const item = data[(rowIndex*columnCount)+columnIndex];
      return (
        <div style={{...style, padding: '1rem'}} className='grid-item'>
            <Card style={{ padding: '1rem'}} key={item?.id} title={item?.title} description={item?.creater} priceOption={PRICING_OPTIONS[item?.pricingOption]} image={item?.imagePath}/>
        </div> 
      )
    }
    return (
      <div className="content-list">  
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