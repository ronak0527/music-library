import { useEffect, useState, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    const API_URL = 'https://itunes.apple.com/search?term='

    useEffect(() => {
        if(search) {			
            let fetchData = async () => {
                document.title = `${search} Music`
				const fetchString = API_URL + search
				console.log(fetchString)				
                const response = await fetch(fetchString,{
					crossDomain:true,
					method: 'GET',
					headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}})
                const resData = await response.json()
                if (resData.results.length > 0) {					
                    return setData(resData.results)
                } else {
                    return setMessage('Not Found')
                }
            }
            fetchData()
        }
    }, [search])
    
    const handleSearch = (e, searchTermValue) => {
        e.preventDefault()
		console.log(searchTermValue)
        setSearch(searchTermValue)
    }

    return (
		<div>
		{message}
			<Router>
				<Routes>
					<Route path="/" element = {
						<Fragment>
							<SearchBar handleSearch = {handleSearch}/>
							<Gallery data={data} />
						</Fragment>
					} />
					<Route path="/album/:id" element={<AlbumView />} />
					<Route path="/artist/:id" element={<ArtistView />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;