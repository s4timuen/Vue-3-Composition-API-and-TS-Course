<template>
  <NavBar />
  <router-view></router-view>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  @include custom-scrollbar;

  &::-webkit-scrollbar {
    margin-top: 3rem;
  }

  &::-webkit-scrollbar-track {
    margin-top: 3rem;
  }

  font-family: Avenir,
  Helvetica,
  Arial,
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-gray;
  font-size: 1rem;
  line-height: 1;
  font-weight: normal;

  width: 100vw;
  height: 100vh;

  scroll-behavior: smooth;
  overflow-x: hidden;
  box-sizing: border-box;
}
</style>
