<template>
  <div>
    <div
      class="bg-white sm:max-w-full max-w-md rounded overflow-hidden shadow-lg"
    >
      <div class="text-center p-6  border-b">
        <div class="w-full flex justify-center align-center m-5">
          <lottie-player
            class="lottie__money"
            src="pigy.json"
            background="transparent"
            speed="2    "
            style="width: 250px; height: 250px;"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div class="align-left m-auto flex flex-col items-start">
          <p class="pt-2 text-lg font-semibold">
            {{ this.user.name }}
          </p>
          <p class="text-sm font-bold text-gray-600">
            {{ this.user.email }}
          </p>
          <p class="text-sm font-bold text-gray-600">
            Balance : {{ this.user.income }} Ft
          </p>
        </div>
        <div class="mt-5">
          <a
            @click="deleteUserAccount"
            class="mt-5 cursor-pointer  m-1 bg-red-400 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
            >Delete account</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteAccount } from "@/firebase.services.js";
import { signOut } from "@/firebase.services.js";
export default {
  props: ["user"],
  methods: {
    deleteUserAccount() {
      deleteAccount(this.user.uid);
      signOut();
      this.$router.push("/Home");
    },
  },
};
</script>

<style></style>
