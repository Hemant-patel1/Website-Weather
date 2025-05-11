import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faGem,
  faWind,
  faEye,
  faGlobe,
  faSyncAlt, // Import the icon for reverse functionality
} from "@fortawesome/free-solid-svg-icons";
import { weatherData } from "../Data/weatherData.js";
import WeatherInfo from "../WeatherInfo.js";

function Section() {
  const [data, setData] = useState(null);
  const [icon, setIcon] = useState("");
  const [isRTL, setIsRTL] = useState(false); // State to manage text direction

  const iconMapping = {
    "01d": `${process.env.PUBLIC_URL}/clear-sky-sun.png`,
    "01n": `${process.env.PUBLIC_URL}/clear-sky-night.png`,
    "02d": `${process.env.PUBLIC_URL}/few-clouds-day.png`,
    "02n": `${process.env.PUBLIC_URL}/few-clouds-night.png`,
    "03d": `${process.env.PUBLIC_URL}/Scattered-clouds.png`,
    "03n": `${process.env.PUBLIC_URL}/Scattered-clouds-night.png`,
    "04d": `${process.env.PUBLIC_URL}/Broken-clouds.png`,
    "04n": `${process.env.PUBLIC_URL}/Broken-clouds-night.png`,
    "09d": `${process.env.PUBLIC_URL}/shower-rain.png`,
    "09n": `${process.env.PUBLIC_URL}/shower-rain-night.png`,
    "10d": `${process.env.PUBLIC_URL}/rain.png`,
    "10n": `${process.env.PUBLIC_URL}/rain.png`,
    "11d": `${process.env.PUBLIC_URL}/thunder.png`,
    "11n": `${process.env.PUBLIC_URL}/thunder.png`,
    "13d": `${process.env.PUBLIC_URL}/snowy.png`,
    "13n": `${process.env.PUBLIC_URL}/snowy.png`,
    "50d": `${process.env.PUBLIC_URL}/mist.png`,
    "50n": `${process.env.PUBLIC_URL}/mist.png`,
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const input = event.target.elements.inputText.value.trim();
    if (input) {
      const user = await weatherData(input);
      setData(user);
    }
  };

  useEffect(() => {
    if (data) {
      const iconPath = iconMapping[data.weather?.[0].icon];
      setIcon(iconPath);
    }
  }, [data]);

  // Toggle function to switch between LTR and RTL
  const toggleDirection = () => {
    setIsRTL((prevIsRTL) => !prevIsRTL);
  };

  return (
    <section className={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          {!data ? (
            <div className={`mx-auto max-w-lg p-4 text-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}>
              <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                Enter a location to check the weather
              </h2>

              <form onSubmit={handleSearch} className="relative mt-4">
                <label htmlFor="inputText" className="sr-only">
                  Search Location
                </label>
                <input
                  type="text"
                  id="inputText"
                  placeholder="Search for..."
                  className="w-full rounded-lg border border-gray-300 p-3 pr-12 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  aria-label="Enter location"
                  required
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          ) : (
            <div
              className={`mx-auto max-w-lg p-6 bg-primary_light_mode rounded-lg shadow-lg lg:mx-0 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <div className="block overflow-hidden rounded-lg transition-shadow hover:shadow-lg focus:shadow-lg">
                <div className="flex justify-center">
                  <img
                    alt="Weather icon"
                    src={icon}
                    className="h-[256px] rounded-md object-cover"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-center items-center text-gray-800 font-bold">
                    <span
                      className={`${
                        data.main?.temp < 0
                          ? "text-blue-500"
                          : data.main?.temp < 20
                          ? "text-green-500"
                          : "text-red-500"
                      } text-5xl`}
                    >
                      {Math.round(data.main?.temp ?? 0)}
                    </span>
                    <span className="text-2xl align-top">°C</span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`${process.env.PUBLIC_URL}/weather-situations.png`}
                        alt="Weather condition"
                      />
                      <div>
                        <p className="text-gray-700 font-bold">Condition</p>
                        <p className="font-medium text-primary_text_light_mode">
                          {data.weather?.[0].description ?? "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={`${process.env.PUBLIC_URL}/cloundiness.png`}
                        alt="Cloudiness"
                      />
                      <div>
                        <p className="text-gray-700 font-bold">Cloudiness</p>
                        <p className="font-medium text-primary_text_light_mode">
                          {data.clouds?.all ?? "N/A"}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faGlobe} />
                      <div>
                        <p className="text-gray-700 font-bold">Coordinates</p>
                        <p className="font-medium text-primary_text_light_mode">
                          {data.coord
                            ? `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {data && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <WeatherInfo
                icon={faGem}
                title="Pressure"
                value={`${data.main?.pressure} hPa`}
                description={
                  data.main?.pressure < 1013 ? "Low Pressure" : "High Pressure"
                }
              />

              <WeatherInfo
                icon={faMapLocation}
                title="Location"
                value={data.name ?? "N/A"}
              />

              <WeatherInfo
                icon={faWind}
                title="Wind"
                value={`${data.wind?.speed ?? "N/A"} m/s`}
                description={
                  data.wind?.speed > 10 ? "Strong Wind" : "Moderate Wind"
                }
              />

              <WeatherInfo
                image={`${process.env.PUBLIC_URL}/dew.png`}
                title="Humidity"
                value={`${data.main?.humidity}%`}
                description={
                  data.main?.humidity > 70
                    ? "High Humidity"
                    : data.main?.humidity < 30
                    ? "Low Humidity"
                    : "Moderate Humidity"
                }
              />

              <WeatherInfo
                icon={faEye}
                title="Visibility"
                value={`${data.visibility / 1000} km`}
                description={
                  data.visibility < 1000
                    ? "Poor Visibility"
                    : data.visibility < 5000
                    ? "Moderate Visibility"
                    : "Good Visibility"
                }
              />

              <WeatherInfo
                image={`${process.env.PUBLIC_URL}/sunrise.png`}
                title="Sunrise & Sunset"
                value={`Sunrise: ${new Date(
                  data.sys?.sunrise * 1000
                ).toLocaleTimeString()} 
                Sunset: ${new Date(
                  data.sys?.sunset * 1000
                ).toLocaleTimeString()}`}
              />
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={toggleDirection}
              className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
              aria-label="Toggle text direction"
            >
              <FontAwesomeIcon icon={faSyncAlt} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section;
