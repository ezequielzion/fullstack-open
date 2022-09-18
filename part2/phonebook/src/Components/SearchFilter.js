const SearchFilter = ({search, handleSearch}) => (
    <div>
        filter shown with <input onChange={handleSearch} value={search}/>
    </div>
)

export default SearchFilter