import "./styles.css"

export const SearchBar = ({searchValue, handleChange}) => (
  <input type="search" onChange={handleChange} value={searchValue} placeholder="type your search"/>
)