<template>
  <form class="form">
    <div class="form__wrapper">
      <label for="name" class="form__label">Name</label>
      <input
        id="name"
        v-model="userName"
        type="text"
        placeholder="Input username"
        class="form__input"
      />
    </div>

    <div class="form__wrapper">
      <label for="password" class="form__label">Password</label>
      <input
        id="password"
        v-model="password"
        :type="isShowPassword ? 'text' : 'password'"
        placeholder="Input password"
        class="form__input form__input--password"
      />
      <ShowHideButton
        :show="isShowPassword"
        class="form__show-password-button"
        @show-hide="handleShowHide"
      />
    </div>

    <ActionButton
      type="submit"
      text="Sign in"
      :disabled="!userName || !password"
      class="form__button"
    />
  </form>
</template>

<script>
import { ref } from "vue";
import ShowHideButton from "@/components/ShowHideButton.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  name: "SignIn",
  components: { ShowHideButton, ActionButton },
  setup() {
    const userName = ref("");
    const password = ref("");
    const isShowPassword = ref(false);

    function handleShowHide() {
      isShowPassword.value = !isShowPassword.value;
    }

    return {
      userName,
      password,
      isShowPassword,
      handleShowHide,
    };
  },
};
</script>

<style scoped lang="less">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__wrapper {
    position: relative;
    width: 100%;
    min-width: 320px;
    max-width: 400px;
    margin-bottom: 20px;
  }

  &__input {
    width: 100%;
    height: 30px;
    padding: 0 10px;
    background-color: var(--vt-c-white);

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-background-clip: text;
      transition: background-color 5000s ease-in-out 0s;
    }

    &--password {
      padding-right: 30px;
    }
  }

  &__show-password-button {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
