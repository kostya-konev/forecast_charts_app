<template>
  <div class="container weather">
    <InputWithAutocomplete @addCity="addCity"/>
    <div
      v-for="cityWeatherData in weatherStore.getCitiesWeatherData"
      class="weather-block"
    >
      <WeatherCityCard
        :cityWeatherData="cityWeatherData"
        @setCurrentCity="setCurrentCity"
        @openConfirmationModal="openConfirmationModal"
        @setCityToBeDeleted="setCityToBeDeleted"
      />
    </div>
    <TemperatureChart v-if="currentCity" :currentCity="currentCity" />
    <WarningModal
      v-if="isModalVisible"
      :cityToBeDeleted="cityToBeDeleted"
      @cancelDelete="isModalVisible = false"
      @confirmDelete="deleteCity"
    >
      <template #default>
        You sure, you want delete {{ cityToBeDeleted.name }}?
      </template>
    </WarningModal>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { useWeatherStore } from '@/stores/weatherStore';
import InputWithAutocomplete from '@/components/controls/InputWithAutocomplete.vue';
import WeatherCityCard from '@/components/cards/WeatherCityCard.vue';
import TemperatureChart from '@/components/charts/TemperatureChart.vue';
import WarningModal from "@/components/modals/WarningModal.vue";

const weatherStore = useWeatherStore();

const currentCity = ref(null);
const isModalVisible = ref(false);
const cityToBeDeleted = ref({});

const setCurrentCity = (city) => {
  currentCity.value = city;
};

const addCity = (city) => {
  weatherStore.fetchWeatherData(city)
}

const openConfirmationModal = (city) => {
  isModalVisible.value = true;
  cityToBeDeleted.value = city;
}

const setCityToBeDeleted = (city) => {
  cityToBeDeleted.value = city;
}

const deleteCity = (cityId) => {
  weatherStore.deleteCity(cityId);
  isModalVisible.value = false;
  currentCity.value = null;
}
</script>

<style>
.weather-block {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
