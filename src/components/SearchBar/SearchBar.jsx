import { useState } from "react"
import { toast } from 'react-hot-toast'

const SearchBar = ({onSubmit}) => {
    const [searchQuery,setSearchQuery] = useState("")

    const handleChenge = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) {
            return toast.error("Can not be empty!")
        }
        onSubmit(searchQuery);
        setSearchQuery("")
    }


  return (
    < header > 
  < form onSubmit = {handleSubmit}> 
    < input 
    onChange={handleChenge}
      value={searchQuery}
      type = "text" 
      autoComplete = "off" 
      autoFocus 
      placeholder = "Search images and photos" 
    /> 
    < button  type = "submit" > Search </ button > 
  </ form > 
</ header >
  )
}

export default SearchBar