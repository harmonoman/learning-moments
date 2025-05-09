export const SearchBar = ({ setSearchTerm }) => {
    
    return (
        <input
            onChange={(event) => {setSearchTerm(event.target.value)}}
            type="text"
            placeholder="Search Tickets"
            className="h-10 px-3 w-70 border-2 border-[#CC5500] rounded text-left"
        />
    )
}