import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import {fetchUserLocation} from "@/services/fetchUserLocation";

export const useMainStore = defineStore('counter', () => {
  const changeLocale = inject('changeLocale') as (newLocale: string) => void;

  const lang = ref('en')
  const userLocations = ref({
    city: "",
    countryCode: ""
  })
  const getLang = computed(() => lang.value)
  const getUserLocation = computed(() => userLocations.value)
  const switchLang = () => {
    if (lang.value === 'en') {
      lang.value = 'ru'
      changeLocale('ru')
    } else {
      lang.value = 'en'
      changeLocale('en')
    }
  }
  const setUserLocation = async () => {
    const data = await fetchUserLocation();
    userLocations.value.city = data.city;
    userLocations.value.countryCode = data.countryCode;
  }

  return {
    lang,
    userLocations,
    getLang,
    getUserLocation,
    switchLang,
    setUserLocation
  }
})
