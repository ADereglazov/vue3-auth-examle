<template>
  <button :type="type" :disabled="disabled" class="action-button">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    type: {
      type: String,
      default: "button"
    },
    text: {
      type: String,
      default: "Action"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
.action-button {
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
</style>
