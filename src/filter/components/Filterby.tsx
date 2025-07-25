import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Filterby.scss'
import type { State } from '../../model/model'
import { setFilterOptions } from '../../store/fashionStore.slice'
function Filterby() {

    const priceRangeRef = useRef<HTMLInputElement>(null)
    const filterOptions = useSelector((state:State)=>state.fashion.filterOptions)
    const dispatch = useDispatch()
    return (
        <div className="filterby">
           
            <div className="pricing-options">
                <div className="pricing-options__text">
                    <span>Pricing Options</span>
                </div>
                <div className="pricing-options__paid">
                    <input 
                    checked={filterOptions.paid} 
                    data-testid="paid-checkbox"
                    onChange={(e)=>dispatch(setFilterOptions({...filterOptions,paid:e.target.checked}))} 
                    type="checkbox" />
                    <span>Paid</span>
                </div>
                <div className="pricing-options__free">
                    <input 
                    data-testid="free-checkbox"
                    checked={filterOptions.free} 
                    onChange={(e)=>dispatch(setFilterOptions({...filterOptions,free:e.target.checked}))} 
                    type="checkbox" />
                    <span>Free</span>
                </div>
                <div className="pricing-options__view-only">
                    <input 
                    data-testid="view-only-checkbox"
                    checked={filterOptions.viewOnly} 
                    onChange={(e)=>dispatch(setFilterOptions({...filterOptions,viewOnly:e.target.checked}))} type="checkbox" />
                    <span>View Only</span>
                </div>
                <div className={`pricing-options__price-slider ${!filterOptions.paid ? 'disabled' : ''}`}>
                    <span>Price Slider</span>
                    <input data-testid="price-range" ref={priceRangeRef} className={`pricing-options__price-slider__input ${!filterOptions.paid ? 'disabled' : ''}`} disabled={!filterOptions.paid} type="range" min={0} max={100} value={filterOptions.priceRange} onChange={(e)=>dispatch(setFilterOptions({...filterOptions,priceRange:Number(e.target.value)}))}/>
                    <span>{filterOptions.priceRange}$+</span>
                </div>
            </div>
            <div className="reset-option">
                <span onClick={()=>dispatch(setFilterOptions({free:false,paid:false,viewOnly:false,priceRange:0}))}>Reset</span>
            </div>
            
        </div>
    )
}

export default Filterby