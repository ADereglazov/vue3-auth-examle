<template>
  <form class="form" @click.prevent="handleSubmit">
    <h1 class="form__title">Auth</h1>

    <SignInput
      v-model="form.email.value"
      :error="emailErrorHint"
      label="Email"
      type="text"
      placeholder="Input email"
      class="form__input"
      @blur="form.email.blur"
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
      :disabled="!form.valid"
      class="form__button"
    />
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useForm } from "@/composable/form";
import SignInput from "@/components/SignInput.vue";
import ShowHideButton from "@/components/ShowHideButton.vue";
import ActionButton from "@/components/ActionButton.vue";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 15;
const required = (val) => !!val;
const validEmail = (val) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
const reqLength = (min, max) => (val) => val.length >= min && val.length <= max;

export default {
  name: "SignIn",
  components: { SignInput, ShowHideButton, ActionButton },
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
      console.log("Submit");
    }

    return {
      form,
      isShowPassword,
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
  width: fit-content;
  margin: 0 auto;

  &__title {
    align-self: start;
  }

  &__input {
    min-width: 320px;
    max-width: 400px;
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
}
</style>
