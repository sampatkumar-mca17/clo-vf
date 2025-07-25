import React from 'react';
import Header from "./header/components/Header";
import "./App.scss";
import Filter from "./filter/Filter";
import ContentList from "./content-list/ContentList";
import useProducts from "./custom-hooks/useProducts";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  setProducts,setDeviceType } from "./store/fashionStore.slice";
import { useRef } from "react";
import { SCREEN_SIZES } from "./constants/constants";
function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useProducts({endpoint:"https://closet-recruiting-api.azurewebsites.net/api/data"});
  const headerContainerRef = useRef<HTMLDivElement>(null); 
  const filterContainerRef = useRef<HTMLDivElement>(null); 
  const contentListContainerRef = useRef<HTMLDivElement>(null); 
  const [columnCount, setColumnCount] = useState(1);
  useEffect(()=>{
    setColumnCount(()=>{
      const count = window.innerWidth <= SCREEN_SIZES.MOBILE ? 1 :( window.innerWidth <= SCREEN_SIZES.TABLET ? 2 : (window.innerWidth <= SCREEN_SIZES.DESKTOP ? 3 : 4));
      dispatch(setDeviceType(count==1 ? "mobile" : (count==2 ? "tablet" : "desktop")));
      return count;
    });

  },[])
  useEffect(() => {
    if(data){
      dispatch(setProducts(data));

    }
  }, [data]);

  return (
    <div className="container">
      <div data-testid="header-container" className="header-container" ref={headerContainerRef}>
        <Header/>
      </div>
      <div data-testid="content-container" className="content-container">
        <div data-testid="filter-container" className="filter-container" ref={filterContainerRef}>
          <Filter/>
        </div>
        <div data-testid="content-list-container" className="content-list-container" ref={contentListContainerRef}>
          {isLoading && <div data-testid="loading" className="loading">Loading...</div>}
          {isError && <div data-testid="error" className="loading">Error: {error?.message}</div>}
          {!isLoading && !isError && <ContentList height={window.innerHeight - (headerContainerRef.current?.offsetHeight || 0) - (filterContainerRef.current?.offsetHeight || 0)} width={contentListContainerRef.current?.offsetWidth || 0} columnCount={columnCount}/>}
        </div>     
      </div>
    </div>
  );
}

export default App;
