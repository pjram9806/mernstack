// Hotels.js
import React, { useState, useEffect } from "react";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  return (
    <div>
      <h2>Available Hotels</h2>
      <ul>
        {hotels.map((h, i) => (
          <li key={i}>{h.name}</li>
        ))}
      </ul>
    </div>
  );
}
