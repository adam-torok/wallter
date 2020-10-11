<template>
  <div
    class="modal bg-blue-500 bg-opacity-75 absolute z-50 h-screen w-full flex flex-col items-center justify-center font-sans"
  >
    <div
      class="h-screen w-full absolute flex items-center justify-center bg-modal"
    >
      <div
        class="bg-white rounded shadow p-4 m-4 max-w-xs w-1/2 max-h-full text-center overflow-y-scroll"
      >
        <div class="modal__aside flex justify-center items-center flex-col">
          <h1 class="m-5 antialiased text-2xl mb-1 font-bold">
            Settings
          </h1>
          <p class="text-sm font-bold mb-5 text-gray-600">
            It is in prototype mode!
          </p>
          <div
            class="flex-auto mb-2 grid gap-2  w-full grid-cols-4 flex flex-row items-center h-auto"
          >
            <i class="fas fa-info-circle"></i>
            <div class="my-2 col-span-2 ml-3">Show tooltips</div>
            <div class="w-12 ml-6 relative my-1 cursor-pointer">
              <div class="h-8 w-12 bg-gray-300 rounded-full">
                <div
                  class="mt-1 w-6 h-6 absolute transition-all transform ease-linear duration-100 flex items-center justify-center rounded-full bg-white shadow-toggle border-gray-300 top-0 left-4"
                ></div>
              </div>
            </div>
          </div>
          <div
            class="flex-auto grid gap-2  w-full grid-cols-4 flex-row items-center justify h-auto"
          >
            <i class="fas fa-moon"></i>
            <div class="my-2 ml-3 col-span-2">Dark mode</div>
            <div class="w-12 ml-6 relative my-1 cursor-pointer">
              <div class="h-8 w-12 bg-gray-300 rounded-full">
                <div
                  class="mt-1 w-6 h-6 absolute transition-all transform ease-linear duration-100 flex items-center justify-center rounded-full bg-white shadow-toggle border-gray-300 top-0 left-4"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__footer mt-5 flex justify-center">
          <button
            @click="close"
            class="modal__button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
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
  methods: {
    close() {
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
