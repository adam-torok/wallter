<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import tippy, { animateFill } from "tippy.js";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import 'tippy.js/themes/light.css';

export default {
  name: "App",
  data() {
    return {
      user: {},
    };
  },
  updated() {
    tippy("[data-tippy-content]"),
      {
        animateFill: true,
        theme:"customized",
        plugins: [animateFill],
      };
  },
};
</script>

<style>
 .tippy-popper .tippy-tooltip.customized-theme * {
    background-color: rgb(0, 68, 255)!important;    
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
