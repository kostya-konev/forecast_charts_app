<template>
  <div id="app">
    <nav v-if="isNavDisplayed">
      <RouterLink to="/weather">
        <img
          src="/images/logo_white_cropped.png"
          alt="Logo"
          class="logo"
        >
        <button class="switch-lang" @click="mainStore.switchLang(locale)">
          {{$t('switchLang')}}
        </button>
      </RouterLink>
    </nav>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
import {useMainStore} from "@/stores/mainStore";
import {useWeatherStore} from "@/stores/weatherStore";
const route = useRoute();

const mainStore = useMainStore();
const { setUserLocation } = mainStore;
const weatherStore = useWeatherStore();


const isNavDisplayed = computed(() => {
  const routedWithoutNav = ['home', 'login']
  return route.name ? !routedWithoutNav.includes(route.name as string) : false
});

onMounted(async () => {
  await setUserLocation();
  await weatherStore.fetchWeatherData(mainStore.getUserLocation.city);
});
</script>
<style scoped lang="scss">
@use '@/assets/styles/general/root-page.scss';
</style>
