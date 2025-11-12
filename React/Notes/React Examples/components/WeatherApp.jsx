import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState(null);
  let [loading, setLoading] = useState("");
  let [error, setError] = useState(false);

  let fetchWeatherApi = async () => {
        if (!city.trim()) {
        setError("Please Enter A City Name");
        return;
        }

    try {
      setLoading(true);
      setWeather(null);
      setError("");

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            appid: "bd83e9329956c3d0f9c70e181db542d5",
            units: "metric",
          },
        }
      );
      setWeather(response.data);
    } catch (err) {
      setError("City Not Found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="container py-3">
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                <p className="h3">Weather App</p>
              </div>
              <div className="card-body">
                <label className="form-label">Enter City</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="e.g. Hyderabad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <button
                  className="btn btn-primary w-100"
                  onClick={fetchWeatherApi}
                  disabled={loading}
                >
                  {loading ? "Fetching..." : "Get Weather"}
                </button>

                {/* Error Message */}
                {error && <p className="text-danger mt-3">{error}</p>}

                {/* Weather Result */}
                {weather && (
                  <div className="mt-4 text-center">
                    <h4>
                      {weather.name}, {weather.sys.country}
                    </h4>
                    <p className="h2">{weather.main.temp}°C</p>
                    <p className="lead">
                      {weather.weather[0].main} —{" "}
                      {weather.weather[0].description}
                    </p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WeatherApp;
