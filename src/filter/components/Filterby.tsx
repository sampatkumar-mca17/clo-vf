import { useDispatch, useSelector } from 'react-redux'
import './Filterby.scss'
import type { State } from '../../model/model'
import { setFilterOptions } from '../../store/fashionStore.slice'
function Filterby() {
    const filterOptions = useSelector((state:State)=>state.fashion.filterOptions)
    const dispatch = useDispatch()
    return (
        <div className="filterby">
           
            <div className="pricing-options">
                <div className="pricing-options-text">
                    <span>Pricing Options</span>
                </div>
                <div className="pricing-options-paid">
                    <input 
                    checked={filterOptions.paid} 
                    onChange={(e)=>dispatch(setFilterOptions({...filterOptions,paid:e.target.checked}))} 
                    type="checkbox" />
                    <span>Paid</span>
                </div>
                <div className="pricing-options-free">
                    <input 
                    checked={filterOptions.free} 
                    onChange={(e)=>dispatch(setFilterOptions({...filterOptions,free:e.target.checked}))} 
                    type="checkbox" />
                    <span>Free</span>
                </div>
                <div className="pricing-options-view-only">
                    <input 
                    checked={filterOptions.viewOnly} 
                    onChange={(e)=>dispatch(setFilterOptions({...filterOptions,viewOnly:e.target.checked}))} type="checkbox" />
                    <span>View Only</span>
                </div>
            </div>
            <div className="reset-option">
                <span onClick={()=>dispatch(setFilterOptions({free:false,paid:false,viewOnly:false}))}>Reset</span>
            </div>
            
        </div>
    )
}

export default Filterby