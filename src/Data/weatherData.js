import axios from 'axios';

export const weatherData = async (cityName) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${process.env.REACT_APP_APP_ID}&units=metric`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
