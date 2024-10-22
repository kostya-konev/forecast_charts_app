<template>
  <div class="container">
    <button class="switch-lang" @click="mainStore.switchLang">
      {{$t('switchLang')}}
    </button>
    <div class="modal">
      <form @submit.prevent="login" class="form">
        <div class="form__title">{{$t('login.title')}}</div>
        <div class="form__input-container">
          <label for="username" class="form__label">{{$t('login.placeholders.username')}}:</label>
          <input v-model="username" type="text" id="username" required @input="validateUsername" class="form__input"/>
          <p v-if="usernameError" class="form__error">{{ usernameError }}</p>
        </div>
        <div class="form__input-container">
          <label for="phone" class="form__label">{{$t('login.placeholders.phone_number')}}:</label>
          <input v-model="phoneNumber" type="text" id="phone" required @input="validatePhoneNumber" class="form__input"/>
          <p v-if="phoneNumberError" class="form__error">{{ phoneNumberError }}</p>
        </div>

        <button type="submit" class="form__button">{{$t('buttons.login')}}</button>
        <p v-if="loginError" class="form__authorization-error">{{$t('login.errors.response')}}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie';
import type {IUser} from "@/models";
import {fetchUsers} from "@/services/fetchUsers";
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();

const { t } = useI18n();
const router = useRouter();

const username = ref<string>("");
const phoneNumber = ref<string>("");
const usernameError = ref<string>("");
const phoneNumberError = ref<string>("");
const loginError = ref<boolean>(false);

const validateUsername = () => {
  loginError.value = false;
  if (!/^[a-zA-Z\s]+$/.test(username.value.trim()) && username.value !== "") {
    usernameError.value = t('login.errors.username');
  } else {
    usernameError.value = "";
  }
};

const validatePhoneNumber = () => {
  loginError.value = false;

  if (!/^[^a-zA-Z]*x?[0-9]*[^a-zA-Z]*$/.test(phoneNumber.value) && phoneNumber.value !== "") {
    phoneNumberError.value = t('login.errors.phone_number');
  } else {
    phoneNumberError.value = "";
  }
};

const login = async (): Promise<void> => {
  if (usernameError.value || phoneNumberError.value) {
    return;
  }
  const data: IUser[] = (await fetchUsers()) || [];
  const userExists = data.some(
    (user) => user.username === username.value && user.phone === phoneNumber.value
  );

  if (!userExists) {
    loginError.value = true;
  } else {
    const currentUser: IUser | undefined = data.find(
      (user) => user.username === username.value && user.phone === phoneNumber.value
    );
    Cookies.set('authorizationToken', Math.random().toString(), { expires: 7 });
    if (currentUser) {
      await router.push({ path: '/weather' });
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/general/login-page.scss';
</style>
