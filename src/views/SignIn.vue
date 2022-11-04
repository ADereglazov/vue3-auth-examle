<template>
  <form class="form">
    <div class="form__wrapper">
      <label for="name" class="form__label">Name</label>
      <input
          id="name"
          type="text"
          placeholder="Input username"
          class="form__input"
      >
    </div>

    <div class="form__wrapper">
      <label for="password" class="form__label">Password</label>
      <input
          id="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Input password"
          class="form__input form__input--password"
      >
      <ShowHideButton
        :show="showPassword"
        class="form__show-password-button"
        @show-hide="handleShowHide"
      />
    </div>

    <button type="submit" class="form__button">Sign in</button>
  </form>
</template>

<script>
import { ref } from "vue";
import ShowHideButton from "@/components/ShowHideButton.vue"

export default {
  name: "SignIn",
  components: { ShowHideButton },
  setup() {
    const showPassword = ref(false);

    function handleShowHide() {
      showPassword.value = !showPassword.value;
    }

    return {
      showPassword,
      handleShowHide
    }
  }
}
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

    &--password {
      padding-right: 30px;
    }
  }

  &__show-password-button {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &__button {
    display: block;
    min-width: 100px;
    max-width: 400px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: var(--vt-c-white-soft);
    background-color: var(--green-light);
    padding: 10px;
    border: 0;
    border-radius: 8px;

    &:hover {
      cursor: pointer;
      background-color: var(--green-dark);
    }

    &:active {
      color: var(--vt-c-white-mute);
      background-color: var(--green);
    }

    &:disabled {
      background-color: var(--vt-c-divider-dark-1);
      cursor: default;
    }
  }
}
</style>
