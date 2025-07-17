const Filter = ({ phonebookFilter, handlePhonebookFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter">Filter shown with:</label>
      <input
        id="filter"
        type="text"
        value={phonebookFilter}
        onChange={handlePhonebookFilterChange}
      />
    </div>
  )
}

export default Filter;