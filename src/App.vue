<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
export default {
  name: "App",
  data() {
    return {
      user: {},
    };
  },
  updated() {
    tippy("[data-tippy-content]");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
