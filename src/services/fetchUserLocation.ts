import axios from 'axios';

const API_KEY = import.meta.env.VITE_IPINFO_TOKEN;

export const fetchUserLocation = async (): Promise<IUser[]> => {
  try {
    const { data } = await axios.get(`https://ipinfo.io/json?token=${API_KEY}`);
    return {
      city: data.city,
      countryCode: data.country
    }
  } catch (error) {
    console.error(error);
  }
};
