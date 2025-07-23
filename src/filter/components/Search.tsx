import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch'
import './Search.scss'
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { setSearchValue } from '../../store/fashionStore.slice';
function Search() {
  const dispatch = useDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  let subscription: Subscription;

  useEffect(()=>{
    if(searchInputRef.current && (!subscription || subscription?.closed)){
      subscription = fromEvent(searchInputRef.current as HTMLInputElement,'input')
      .pipe(
        debounceTime(500),
      )
      .subscribe((event: Event) => {
        const target = event.target as HTMLInputElement;
        dispatch(setSearchValue(target.value));
      });
    }
    return () => {
      subscription.unsubscribe();
    };
  },[]);

  return (
    <div className='search'>
        <input ref={searchInputRef} className='search__input' type="text" placeholder="Find the item you're looking for" />
        <FontAwesomeIcon color='#fff' size='lg' icon={faSearch} />
    </div>
  )
}

export default Search