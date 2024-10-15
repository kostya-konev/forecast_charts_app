import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {fetchWeather} from "@/services/weather/fetchWeather";

export const useWeatherStore = defineStore('weather', () => {
  const citiesWeatherData = ref([]);
  const favoriteCities = ref<string[]>([]);

  const getCitiesWeatherData = computed(() => citiesWeatherData.value)
  const getIsCityFavorite = (city: string) => computed(() => favoriteCities.value.includes(city));

  const fetchWeatherData = async (city: string) => {
    if (citiesWeatherData.value.some(c => c.name.toLowerCase() === city.toLowerCase())) {
      console.log('City already exists in the list');
      return;
    }
    const data = await fetchWeather(city);
    citiesWeatherData.value.push(data);
  };

  const deleteCity = (cityId) => {
    citiesWeatherData.value = citiesWeatherData.value.filter(city => city.id !== cityId);
  }

  return {
    citiesWeatherData,
    getCitiesWeatherData,
    getIsCityFavorite,
    fetchWeatherData,
    deleteCity
  };
});
