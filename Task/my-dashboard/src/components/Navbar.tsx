const Navbar = () => {
    return (
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Reports</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Download
        </button>
      </div>
    );
  };
  
  export default Navbar;
  