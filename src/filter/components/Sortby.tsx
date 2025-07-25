import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setSortValue } from '../../store/fashionStore.slice';
import "./Sortby.scss";
import type { State } from '../../model/model';

function Sortby() {
    const dispatch = useDispatch();
    const sortValue = useSelector((state:State)=>state.fashion.sortValue);
  return (
   <div className="sort">
    <h3>Sort by</h3>
    <select id="product_sort" className="sort__select" value={sortValue} onChange={(e)=>dispatch(setSortValue(e.target.value as "relavance"|"higherPrice"|"lowerPrice"))}>
        <option value="relavance">Relevance</option>
        <option value="higherPrice">Higher Price</option>
        <option value="lowerPrice">Lower Price</option>
    </select>
   </div>
  )
}

export default Sortby