<template>
  <form class="form" @click.prevent="handleSubmit">
    <h1 class="form__title">Auth</h1>

    <div class="form__wrapper">
      <label for="name" class="form__label">
        <span class="form__label-text">Email</span>
        <input
          id="name"
          v-model="form.email.value"
          type="text"
          placeholder="Input email"
          class="form__input"
          @blur="form.email.blur"
        />
      </label>
      <small
        v-if="form.email.touched && form.email.errors.required"
        class="form__input-hint"
      >
        Email is required
      </small>
      <small
        v-else-if="form.email.touched && form.email.errors.validEmail"
        class="form__input-hint"
      >
        Email is invalid
      </small>
    </div>

    <div class="form__wrapper">
      <label for="password" class="form__label">
        <span class="form__label-text">Password</span>
        <input
          id="password"
          v-model="form.password.value"
          :type="isShowPassword ? 'text' : 'password'"
          placeholder="Input password"
          class="form__input form__input--password"
          @blur="form.password.blur"
        />
        <ShowHideButton
          :show="isShowPassword"
          class="form__show-password-button"
          @show-hide="handleShowHide"
        />
      </label>
      <small
        v-if="form.password.touched && form.password.errors.required"
        class="form__input-hint"
      >
        Password is required
      </small>
      <small
        v-else-if="form.password.touched && form.password.errors.reqLength"
        class="form__input-hint"
      >
        Password must be min {{ minPasswordLength }} and max
        {{ maxPasswordLength }} characters. Now it is
        {{ form.password.value.length }}.
      </small>
    </div>

    <ActionButton
      type="submit"
      text="Sign in"
      :disabled="!form.valid"
      class="form__button"
    />
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useForm } from "@/use/form";
import ShowHideButton from "@/components/ShowHideButton.vue";
import ActionButton from "@/components/ActionButton.vue";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 15;
const required = (val) => !!val;
const validEmail = (val) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
const reqLength = (min, max) => (val) => val.length >= min && val.length <= max;

export default {
  name: "SignIn",
  components: { ShowHideButton, ActionButton },
  setup() {
    const isShowPassword = ref(false);
    const form = useForm({
      email: {
        value: "",
        validators: { required, validEmail },
      },
      password: {
        value: "",
        validators: {
          required,
          reqLength: reqLength(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH),
        },
      },
    });
    const minPasswordLength = computed(() => MIN_PASSWORD_LENGTH);
    const maxPasswordLength = computed(() => MAX_PASSWORD_LENGTH);

    function handleShowHide() {
      isShowPassword.value = !isShowPassword.value;
    }

    function handleSubmit() {
      console.log("Submit");
    }

    return {
      form,
      isShowPassword,
      minPasswordLength,
      maxPasswordLength,
      handleShowHide,
      handleSubmit,
    };
  },
};
</script>

<style scoped lang="less">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;

  &__title {
    align-self: start;
  }

  &__wrapper {
    width: 100%;
    min-width: 320px;
    max-width: 400px;
    margin-bottom: 20px;
  }

  &__label {
    position: relative;
    display: block;
  }

  &__label-text {
    color: var(--vt-c-black);
  }

  &__input {
    width: 100%;
    height: 30px;
    padding: 0 10px;
    border-color: var(--vt-c-divider-dark-1);
    border-radius: 5px;
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

  &__input-hint {
    font-size: 12px;
    line-height: normal;
    color: var(--red-alert);
  }

  &__show-password-button {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
