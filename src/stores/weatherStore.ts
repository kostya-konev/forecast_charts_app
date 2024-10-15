import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {fetchWeather} from "@/services/weather/fetchWeather";
import type {IWeatherResponse} from "@/models";

export const useWeatherStore = defineStore('weather', () => {
  const citiesWeatherData = ref<IWeatherResponse[]>([]);

  const getCitiesWeatherData = computed(() => citiesWeatherData.value)

  const fetchWeatherData = async (city: string): Promise<void> => {
    if (citiesWeatherData.value.some(c => c.name.toLowerCase() === city.toLowerCase())) {
      console.log('City already exists in the list');
    }
    const data = await fetchWeather(city);
    citiesWeatherData.value.push(data);
  };

  const deleteCity = (cityId: number) => {
    citiesWeatherData.value = citiesWeatherData.value.filter(city => city.id !== cityId);
  }

  return {
    citiesWeatherData,
    getCitiesWeatherData,
    fetchWeatherData,
    deleteCity
  };
});
