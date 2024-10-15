import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY;

export const fetchWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return data;
  } catch (e) {
    console.error(e);
  }
};
