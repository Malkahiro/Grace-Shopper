import React from 'react'
import './SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({products, setSearchResults}) => {
    const handleSubmit = (event) =>{
        event.preventDefault();
    }

    const handleSearchChange = (event) =>{
        if(!event.target.value){
            return setSearchResults(products)
        }
        const resultsArr = products.filter((product) => product.name.includes(event.target.value));
        setSearchResults(resultsArr);
    }
    return (
        <header>
            <form className="search" onSubmit={handleSubmit}>
                <input type="text" className="search__input" id="search"  onChange={handleSearchChange}/>
                <button className="search__button"></button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </form>
        </header>
    );
}
 
export default SearchBar;