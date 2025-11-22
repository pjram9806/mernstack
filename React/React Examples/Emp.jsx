import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Emp() {
  const [options, setOptions] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/options')
      .then(res => setOptions(res.data))
      .catch(err => console.error('Error fetching options:', err));
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.Label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="Emp" style={{ width: 300, margin: '50px auto' }}>
      <h3>Search & Select</h3>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <select style={{ width: '100%' }}>
        {filteredOptions.map(opt => (
          <option key={opt.Id} value={opt.Id}>
            {opt.Label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Emp;
