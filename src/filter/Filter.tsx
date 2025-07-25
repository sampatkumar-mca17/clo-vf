
import React from 'react';
import Search from './components/Search'
import Filterby from './components/Filterby'
import Sortby from './components/Sortby'
import './Filtes.scss'
function Filter() {
    return (
        <div className='filter-container'>
          <div className='search-container'>
            <Search/>
          </div>
          <div className='filterby-container'>
            <Filterby/>
          </div>
          <div className='sortby-container'>
            <Sortby/>
          </div>
        </div>
    )
}

export default Filter