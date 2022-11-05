<template>
  <div class="sign-input">
    <label class="sign-input__label">
      <span class="sign-input__label-text">{{ label }}</span>
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :class="inputClass"
        class="sign-input__input"
        @blur="$emit('blur')"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot />
    </label>
    <small v-show="error" class="sign-input__hint">{{ error }}</small>
  </div>
</template>

<script>
export default {
  name: "SignInput",
  emits: ["update:modelValue", "blur"],
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    inputClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="less">
.sign-input {
  width: 100%;

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
  }

  &__hint {
    font-size: 12px;
    line-height: normal;
    color: var(--red-alert);
  }
}
</style>
