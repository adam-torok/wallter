<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated bounceOutLeft"
  >
    <div v-if="visible" class="flex items-center justify-center">
      <div class="flex items-center bg-white shadow  rounded-md mt-6 px-2 mx-8">
        <div
          style="height:auto"
          class="justify-center align-center rounded px-4 py-2  text-center"
        >
          <lottie-player
            class="alert__lottie"
            src="virus.json"
            background="transparent"
            speed="3"
            style="width: 150px; height: 150px;"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div class="flex items-center px-2">
          <p class="text-sm font-bold text-gray-600">
            Fighting COVID-19 by raising awareness
          </p>
          <i
            @click="visible = !visible"
            class="far cursor-pointer p-2 text-blue-500 fa-times-circle fa-lg"
          ></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .alert__lottie {
    width: 100px !important;
  }
}
</style>
