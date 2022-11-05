<template>
  <div class="page-not-found">
    <h1 class="page-not-found__title">Error 404</h1>
    <h2 class="page-not-found__text">Page not found...</h2>
    <router-link to="/" class="page-not-found__link">Home</router-link>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style scoped lang="less">
.page-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 60px;
    font-weight: 500;
  }

  &__text {
    font-size: 35px;
    font-weight: 500;
  }

  &__link {
    font-size: 20px;
    font-weight: 500;
    color: var(--green-dark);
    text-decoration: underline;

    &:active {
      color: var(--green);
    }
  }
}
</style>
