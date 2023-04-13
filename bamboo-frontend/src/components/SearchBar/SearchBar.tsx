import React, {FunctionComponent} from 'react'
import './searchBar.scss';
import {BiSearch} from 'react-icons/bi'


const SearchBar: FunctionComponent = () => {
  return (
    <div className="searchbar_container">
        <div className="searchbar_container_search_field">
            <input type='text' placeholder='Search'/>
            <div className="search_field_icon">
                <BiSearch/>
            </div>
        </div>

        <div className="searchbar_profile_infos">
            <p className="searchbar_profile_username">Timmy</p>
            <div className="searchbar_profile_pic">
             <img src="https://images.pexels.com/photos/7747512/pexels-photo-7747512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='searchbar_profile_img' />
            </div>
            
        </div>

    </div>
  )
}

export default SearchBar