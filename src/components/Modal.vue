<template>
  <div
    class="modal bg-blue-500 bg-opacity-75 absolute z-50 h-screen w-full flex flex-col items-center justify-center font-sans"
  >
    <div
      class="h-screen w-full absolute flex items-center justify-center bg-modal"
    >
      <div
        class="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll"
      >
        <div class="modal__aside flex justify-center items-center flex-col">
          <h1 class="antialiased text-2xl font-bold">{{ this.modalHeader }}</h1>

          <lottie-player
            v-if="this.isLoader"
            src="https://assets4.lottiefiles.com/packages/lf20_VsPRP4.json"
            background="transparent"
            speed="1"
            style="width: 150px; height: 150px;"
            loop
            autoplay
          ></lottie-player>

          <lottie-player
            v-else
            src="https://assets6.lottiefiles.com/datafiles/AP6eAJ4K8cbfOl9/data.json"
            background="transparent"
            speed="1"
            style="width: 250px; height: 150px;"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div class="modal__body mb-4">
          <p>{{ this.modalText }}</p>
        </div>
        <div class="modal__footer flex justify-center">
          <button
            @click="close"
            class="modal__button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Alrighty
          </button>
          <button
            v-if="isLogout"
            @click="cancel"
            class="modal__button ml-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modalText", "modalHeader", "isLogout", "isLoader"],
  methods: {
    close() {
      if (this.isLogout) {
        this.$emit("signUserOut", true);
      } else {
        this.$emit("closeModal");
      }
    },
    cancel() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 99999;
}
</style>
