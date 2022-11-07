<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h1 class="form__title">Auth</h1>

    <SignInput
      v-model="form.email.value"
      :error="emailErrorHint"
      label="Email"
      type="text"
      placeholder="Input email"
      class="form__input"
      @blur="form.email.blur"
      @input="authError = false"
    />

    <SignInput
      v-model="form.password.value"
      :error="passwordErrorHint"
      label="Password"
      :type="isShowPassword ? 'text' : 'password'"
      placeholder="Input password"
      input-class="form__input--password"
      class="form__input"
      @blur="form.password.blur"
      @input="authError = false"
    >
      <ShowHideButton
        :show="isShowPassword"
        class="form__show-password-button"
        @show-hide="handleShowHide"
      />
    </SignInput>

    <ActionButton
      type="submit"
      text="Sign in"
      :disabled="!form.valid || pending"
      class="form__action-button"
    />

    <p v-if="authError" class="form__error">{{ authError }}</p>

    <div class="form__list-wrapper">
      Valid users is:
      <ol class="form__list-users">
        <li>
          <b>email:</b> test@email.ru <br />
          <b>password:</b> password1
        </li>
        <li>
          <b>email:</b> test2@email.ru <br />
          <b>password:</b> password2
        </li>
      </ol>
    </div>

    <LoadingSpinner v-if="pending" />
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useForm } from "@/composable/form";
import { useAuthStore } from "@/store";
import SignInput from "@/components/SignInput.vue";
import ShowHideButton from "@/components/ShowHideButton.vue";
import ActionButton from "@/components/ActionButton.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 15;
const required = (val) => !!val;
const validEmail = (val) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
const reqLength = (min, max) => (val) => val.length >= min && val.length <= max;

export default {
  name: "SignIn",
  components: { SignInput, ShowHideButton, ActionButton, LoadingSpinner },
  setup() {
    const authError = ref(false);
    const authStore = useAuthStore();
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

    const pending = computed(() => authStore.pending);

    const emailErrorHint = computed(() => {
      if (form.email.touched) {
        if (form.email.errors.required) {
          return "Email is required";
        } else if (form.email.errors.validEmail) {
          return "Email is invalid";
        }
      }
      return "";
    });

    const passwordErrorHint = computed(() => {
      if (form.password.touched) {
        if (form.password.errors.required) {
          return "Password is required";
        } else if (form.password.errors.reqLength) {
          return `Password must be min ${MIN_PASSWORD_LENGTH} and max ${MAX_PASSWORD_LENGTH} characters.
                  Now it is ${form.password.value.length}.`;
        }
      }
      return "";
    });

    function handleShowHide() {
      isShowPassword.value = !isShowPassword.value;
    }

    function handleSubmit() {
      const { username, password } = {
        username: form.email.value,
        password: form.password.value,
      };

      authStore.pending = true;

      return authStore
        .login(username, password)
        .catch((e) => {
          authError.value = e;
        })
        .finally(() => (authStore.pending = false));
    }

    return {
      form,
      authError,
      isShowPassword,
      pending,
      emailErrorHint,
      passwordErrorHint,
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
  width: 100%;
  min-width: 280px;
  max-width: 400px;
  margin: 0 auto;

  &__title {
    align-self: start;
  }

  &__list-wrapper {
    width: 100%;
    font-weight: 700;
    text-align: center;
    background-color: var(--vt-c-text-dark-2);
  }

  &__list-users {
    margin: 15px 0;
    text-align: start;

    b {
      font-weight: 500;
    }
  }

  &__input {
    margin-bottom: 20px;
  }

  /deep/ &__input--password {
    padding-right: 30px;
  }

  &__show-password-button {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &__action-button {
    margin-bottom: 15px;
  }

  &__error {
    padding: 5px 10px;
    margin-top: 0;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: var(--red-alert-bg);
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: var(--vt-c-white);
  }
}
</style>
