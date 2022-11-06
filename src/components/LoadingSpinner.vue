<template>
  <div class="loading-spinner">
    <div class="loading-spinner__spinner"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped lang="less">
.loading-spinner {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    display: inline-block;
    width: 80px;
    height: 80px;

    &::after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid;
      border-color: var(--vt-c-white) transparent var(--vt-c-white) transparent;
      animation: dual-ring 1.2s linear infinite;
    }
  }
}

@keyframes dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
