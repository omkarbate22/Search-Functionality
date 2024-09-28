import React, { useEffect, useState } from 'react';
import './Search.css';

const Search = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  // Fetching data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
               // Store the original data
        setFilterData(data);     // Also store it in filterData for filtering
      })
      .catch(err => console.log(err));
  }, []);

  // Filter function
  const handleFilter = (value) => {
    if (value === "") {
      // If the search bar is cleared, show "No results found"
      setData([]);
    } else {
      // Filter data based on the input value
      const filtered = filterData.filter(user => 
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setData(filtered);
    }
  }

  return (
    <div>
      <div className='Search-top'>
        <input 
          type="text" 
          placeholder='Search Here..' 
          onChange={e => handleFilter(e.target.value)}
        />
      </div>

      <div className='Search-Result'>
        {data.length > 0 ? (
          data.map((d, i) => (
            <div key={i}>
              {d.name}
            </div>
          ))
        ) : (
          <div className='no-results'>No results found</div>
        )}
      </div>
    </div>
  );
}

export default Search;
