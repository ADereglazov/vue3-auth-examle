<template>
  <button type="button" class="show-hide-button" aria-label="show/hide password" @click="handleClick">
    <EyeIcon v-if="show" class="show-hide-button__icon" />
    <EyeSlashIcon v-else class="show-hide-button__icon" />
  </button>
</template>

<script>
import EyeIcon from "@/assets/icons/eye.svg"
import EyeSlashIcon from "@/assets/icons/eye-slash.svg"

export default {
  name: "ShowHideButton",
  components: { EyeIcon, EyeSlashIcon },
  emits: ["show-hide"],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    function handleClick() {
      emit("show-hide")
    }

    return {
      handleClick
    }
  }
}
</script>

<style scoped lang="less">
.show-hide-button {
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  &__icon {
    fill: var(--vt-c-indigo);
  }
}
</style>
