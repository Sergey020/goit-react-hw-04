// import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import { useState } from 'react'


function App()  {  
    const [query, setQuery] = useState("");

    const onHandleSubmit = (searchQuery) => {
      console.log(searchQuery);
      setQuery(searchQuery);
  }

  return (
    <>
    <SearchBar onSubmit={onHandleSubmit}/>
    <Toaster/>
    </>
  )
}

export default App
