// SeachBar.js
import { useState } from 'react'

function SearchBar(props) {
    let [searchTerm, setSearchTerm] = useState('')

    function setComponetValue(value)
    {
        console.log(value)
        setSearchTerm(value);
    }

    return (
        <form onSubmit={(e) => props.handleSearch(e, searchTerm)}>

            <input type="text" placeholder="Enter a search term here" onChange={
                (e) => setComponetValue(e.target.value)
            }/>

            <input type="submit" />

        </form>
    )
}

export default SearchBar