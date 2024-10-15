<template>
  <div class="forecast_container">
    <p class="forecast_container__title">{{cityWeatherData.name}}</p>
    <hr />
    <p class="forecast_container__price">{{Math.round(cityWeatherData.main.temp)}}&deg;</p>
    <hr />
    <p class="forecast_container__cloud">{{cityWeatherData.weather[0].description}}</p>
    <hr />
    <div class="forecast_container__features">
      <img :src="weatherIconURLString" alt="weather">
    </div>
    <div>
      <button @click="openConfirmationModal">
        Delete city
      </button>
      <button @click="showChart">
        Show chart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps} from 'vue';

const props = defineProps<{
  cityWeatherData: {};
}>();

const emit = defineEmits(['setCurrentCity, openConfirmationModal']);

const showChart = () => {
  emit('setCurrentCity', props.cityWeatherData)
}

const openConfirmationModal = () => {
  emit('openConfirmationModal', props.cityWeatherData)
}

const weatherIconURLString = `https://openweathermap.org/img/wn/${props.cityWeatherData.weather[0].icon}@2x.png`;
</script>

<style scoped lang="scss">
.forecast_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  border: 2px solid lightgreen;
}
hr {
  width: 100%;
  height: 1px;
  background-color: lightgreen;
  border: none;
  margin: 10px 0;
}
</style>
