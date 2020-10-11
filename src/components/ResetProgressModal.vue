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
        <div class=" flex justify-center items-center flex-col">
          <h1 class="antialiased text-2xl font-bold">
            Are you sure want to reset?
          </h1>
          <lottie-player
            src="https://assets6.lottiefiles.com/temp/lf20_c0u7dN.json"
            background="transparent"
            speed="1"
            style="width: 150px; height: 150px; margin:20px"
            loop
            autoplay
          ></lottie-player>
        </div>

        <div class="flex justify-center">
          <button
            @click="resetProgress"
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Alrighty
          </button>
          <button
            @click="closeModal"
            class="ml-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
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
  props: ["resetUserProgress"],
  methods: {
    resetProgress(){
        this.resetUserProgress();
    },
    closeModal() {
      this.$emit("closeResetModal");
    },
  },
};
</script>

<style></style>
