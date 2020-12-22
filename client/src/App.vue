<template>
  <div id="app">
    <app-header></app-header>
    <app-home></app-home>
  </div>
</template>

<script>
import HomeVue from "./components/Home.vue";
import Header from "./components/Header.vue"
export default {
  name: "App",
  components: {
    appHome: HomeVue,
    appHeader:Header
  },
};
</script>

<style>

</style>
