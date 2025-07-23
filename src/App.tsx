import Header from "./header/components/Header";
import "./App.scss";
import Filter from "./filter/Filter";
import ContentList from "./content-list/ContentList";
import useProducts from "./custom-hooks/useProducts";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilteredProducts, setProducts } from "./store/fashionStore.slice";
import { useRef } from "react";
function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useProducts({endpoint:"https://closet-recruiting-api.azurewebsites.net/api/data"});
  const headerContainerRef = useRef<HTMLDivElement>(null); 
  const filterContainerRef = useRef<HTMLDivElement>(null); 
  const contentListContainerRef = useRef<HTMLDivElement>(null); 
  const [columnCount, setColumnCount] = useState(1);
  useEffect(() => {
    if(data){
      dispatch(setProducts(data));
      dispatch(setFilteredProducts(data));
    }
  }, [data]);
  useEffect(()=>{
    setColumnCount(window.innerWidth < 480 ? 1 :( window.innerWidth < 768 ? 2 : (window.innerWidth < 1200 ? 3 : 4)));
  },[window.innerWidth])
  return (
    <div className="container">
      <div className="header-container" ref={headerContainerRef}>
        <Header/>
      </div>
      <div className="content-container">
        <div className="filter-container" ref={filterContainerRef}>
          <Filter/>
        </div>
        <div className="content-list-container" ref={contentListContainerRef}>
          {isLoading && <div className="loading">Loading...</div>}
          {isError && <div className="loading">Error: {error?.message}</div>}
          {!isLoading && !isError && <ContentList height={window.innerHeight - (headerContainerRef.current?.offsetHeight || 0) - (filterContainerRef.current?.offsetHeight || 0)} width={contentListContainerRef.current?.offsetWidth || 0} columnCount={columnCount}/>}
        </div>     
      </div>
    </div>
  );
}

export default App;
