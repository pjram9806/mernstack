// Hotels.js
import React, { useState } from "react";

export default function HotelSearch() {
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching hotels for", search, "on", date);
  };

  return (
    <div>
      <div className="container my-3">
        <div className="row">
          <div className="col-2">
            <form action="">
              <input
                type="text"
                placeholder="Search hotel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
