const FilterBar = () => {
    return (
      <div className="flex justify-between mb-6">
        <select className="p-2 border rounded-lg">
          <option>Last 7 Days</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
        <select className="p-2 border rounded-lg">
          <option>All</option>
          <option>Group A</option>
          <option>Group B</option>
        </select>
        <select className="p-2 border rounded-lg">
          <option>All Topics</option>
          <option>Topic A</option>
          <option>Topic B</option>
        </select>
      </div>
    );
  };
  
  export default FilterBar;
  