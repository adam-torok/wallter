<template>
  <div
    class=" w-full text-blue-700 bg-white dark-mode:text-blue-200 dark-mode:bg-blue-800"
  >
    <Modal
      :modalHeader="modalHeader"
      :isLogout="true"
      :modalText="modalText"
      v-on:closeModal="closeModal"
      v-on:signUserOut="signUserOut"
      v-if="wantToSignOut"
    />
    <div
      x-data="{ open: false }"
      class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
    >
      <div class="p-4 flex flex-row items-center justify-between">
        <a href="#" class="antialiased text-2xl font-bold">WALLTER</a>
        <button
          class="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
          @click="open = !open"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
            <path
              x-show="!open"
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
            <path
              x-show="open"
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <nav
        v-if="isLogged"
        :class="{ show: open == true }"
        class="main-nav flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row"
      >
        <router-link
          class="mt-5  main-nav__item m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          to="/home"
          >Home</router-link
        >
        <router-link
          class="mt-5  main-nav__item m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          to="/profile"
          >Profile</router-link
        >
        <router-link
          class="mt-5  main-nav__item m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          to="/dashboard"
          >Dashboard</router-link
        >
        <router-link
          class="mt-5  main-nav__item m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          to="/transactions"
          >Transactions</router-link
        >
        <button
          @click="userWantToSignOut()"
          class="mt-5  m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Sign out
        </button>
      </nav>
      <nav
        v-else
        :class="{ show: open == true }"
        class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row"
      >
        <router-link
          class="mt-5 main-nav__item m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          to="/Login"
          >Login</router-link
        >
        <router-link
          class="mt-5 main-nav__item m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          to="/Registration"
          >Registrate</router-link
        >
        <router-link
          class="mt-5 main-nav__item m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          to="/home"
          >Home</router-link
        >
      </nav>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase";
import Modal from "@/components/Modal.vue";
import { signOut } from "@/firebase.services.js";
export default {
  components: {
    Modal: Modal,
  },
  data() {
    return {
      open: false,
      isLogged: false,
      wantToSignOut: false,
      modalHeader: "Are you sure to logout?",
      modalText: "We're logging you out from the app",
    };
  },
  methods: {
    userWantToSignOut() {
      this.wantToSignOut = true;
    },
    closeModal() {
      this.wantToSignOut = false;
    },
    signUserOut() {
      signOut();
      this.$router.push("/Home");
    },
  },
  async created() {
    var that = this;
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        that.isLogged = true;
      }
    });
  },
};
</script>

<style>
.show {
  display: flex !important;
}
</style>
