<template>
  <div class="container">
    <button class="switch-lang" @click="mainStore.switchLang(locale)">
      {{$t('switchLang')}}
    </button>
    <div class="description-container">
      <h1>{{$t('title')}}</h1>
      <p>{{ $t('description')}}</p>
      <RouterLink to="login" class="login">{{$t('buttons.login')}}</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore'
const mainStore = useMainStore()
</script>

<style scoped lang="scss">
@use '@/assets/styles/general/home-page.scss';
</style>
