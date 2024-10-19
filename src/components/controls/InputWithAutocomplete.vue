<template>
  <div class="form">
    <input
      type="text"
      v-model="query"
      @input="fetchCities"
      @focus="showSuggestions = true"
      @blur="hideSuggestions"
      :placeholder="$t('weather_page.placeholders.select_city')"
      class="form__input"
    />
    <ul v-if="showSuggestions && cities.length && !isPreloaderShown" class="form__cities">
      <li
        v-for="(city, index) of cities"
        :key="index"
        class="form__selectedCity"
        @click="selectCity(city)"
      >
        {{ city.name }} ({{ city.country }})
      </li>
    </ul>
    <Preloader v-if="isPreloaderShown" width="50" height="50" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import {debounce} from "lodash";
import Preloader from "@/components/loaders/Preloader.vue";

interface City {
  name: string;
  country: string;
}

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY;

const emit = defineEmits(['addCity'])

const query = ref('');
const selectedCity = ref<City | null>(null);
const showSuggestions = ref(false);
const cities = ref<City[]>([]);
const isPreloaderShown = ref(false);

const fetchCities = async () => {
  isPreloaderShown.value = true;
  await fetchCitiesDebounced();
}

const fetchCitiesDebounced = debounce(async () => {
  if (query.value) {
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${query.value}&limit=3&appid=${API_KEY}`);
      if (data) {
        showSuggestions.value = true;
        isPreloaderShown.value = false;
        cities.value = data.list.map((city: any) => ({
          name: city.name,
          country: city.sys.country,
        }));
      }
    } catch (error) {
      console.error('Error', error);
    }
  }
}, 500);

const selectCity = (city: City) => {
  console.log(city);
  selectedCity.value = null;
  query.value = "";
  showSuggestions.value = false;
  emit('addCity', city.name);
  cities.value = [];
};

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 2000);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/weather/form-input.scss';
</style>
