import { BiSearch } from "react-icons/bi"

const Search = () => {
  return (
    <div>
        <div className="relative mb-2"> 
            <input type="text" className="placeholder-slate-400 bg-slate-600 shadow-sm text-slate-500 w-full rounded focus:outline-none py-1 px-3 focus:shadow-lg" placeholder="Search..."/> 
            <BiSearch className="absolute right-3 top-2 text-slate-400"/>
        </div>
    </div>
  )
}

export default Search