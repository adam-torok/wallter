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
        </div>
        <div class="modal__body mb-4">
          <p class="text-sm font-bold text-gray-600 mt-5">
            {{ this.modalText }}
          </p>
          <input
            class="m-5 appearance-none pl-2 bg-gray-300 text-grey-500 py-2 font-normal rounded text-grey-900 border border-grey-lighter font-bold"
            type="email"
            v-model="email"
            placeholder="Email address"
          />
        </div>
        <div class="modal__footer flex justify-center">
          <button
            @click="sendResetLink"
            class="modal__button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Alrighty
          </button>
          <button
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
  props: ["modalHeader", "modalText"],
  data() {
    return {
      email: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("closeModal");
    },
    sendResetLink() {
      if (this.email != "") this.$emit("sendPasswordResetEmail", this.email);
    },
  },
};
</script>

<style></style>
