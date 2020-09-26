<template>
  <div>
    <Navbar />
    <Modal
      v-show="failedLogin"
      v-on:closeModal="closeModal"
      :modalHeader="authenticateModal.modalHeader"
      :modalText="authenticateModal.modalText"
    />
    <ForgottenPasswordModal
      v-show="passwordReset"
      v-on:closeModal="closeModal"
      v-on:sendPasswordResetEmail="sendPasswordResetEmail"
      :modalHeader="passwordResetModal.modalHeader"
      :modalText="passwordResetModal.modalText"
    />
    <section class="login">
      <lottie-player
        class="lottie__money"
        src="https://assets10.lottiefiles.com/private_files/lf30_lOAGjB.json"
        background="transparent"
        speed="2    "
        style="width: 250px; height: 250px;"
        loop
        autoplay
      ></lottie-player>
      <h1 class="antialiased text-2xl font-bold">Tell me your email!</h1>
      <div class="flex flex-col justify-center">
        <div class="flex flex-row justify-center">
          <input
            v-model="user.email"
            type="text"
            name="name"
            placeholder="Your email"
            class="m-5  appearance-none  pl-2 bg-gray-300 text-grey-500 py-2 font-normal rounded text-grey-900 border border-grey-lighter font-bold"
          />
        </div>
        <h1 class="antialiased text-2xl font-bold">Password please?</h1>
        <div class="flex flex-row justify-center">
          <input
            v-model="user.password"
            type="password"
            name="password"
            placeholder="Password "
            class="m-5  appearance-none  pl-2 bg-gray-300 text-grey-500 py-2 font-normal rounded text-grey-900 border border-grey-lighter font-bold"
          />
        </div>
      </div>
      <p
        @click="passwordReset = true"
        class="text-sm cursor-pointer font-bold text-gray-600"
      >
        Forgotten password?
      </p>
      <button
        @click="signIn"
        class="mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Login
      </button>
    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ForgottenPasswordModal from "@/components/ForgottenPasswordModal.vue";
import Modal from "@/components/Modal.vue";
import { signIn } from "@/firebase.services.js";
import { sendPasswordResetLink } from "@/firebase.services.js";


export default {
  components: {
    Navbar,
    Modal,
    ForgottenPasswordModal,
  },
  data() {
    return {
      failedLogin: false,
      passwordReset: false,

      user: {
        name: "",
        password: "",
        email: "",
      },

      passwordResetModal: {
        modalHeader: "Did you forgot your password?",
        modalText: "Give us your email, and we'll send a link",
      },

      authenticateModal: {
        modalHeader: "Couldn't authenticate",
        modalText: "Wrong email or password!",
      },
    };
  },
  methods: {
    async signIn() {
      if (await signIn(this.user.email, this.user.password)) {
        this.$router.push("/Profile");
      } else {
        this.failedLogin = true;
      }
    },
    closeModal() {
      this.failedLogin = false;
      this.passwordReset = false;
    },
    async sendPasswordResetEmail(email){
      sendPasswordResetLink(email);
    }
  },
};
</script>

<style scoped>
section {
  height: calc(100vh - 200px);
}
@media only screen and (max-width: 600px) {
  section {
    height: calc(100vh - 100px);
  }
  .lottie__money {
    height: 150px !important;
    margin-bottom: 50px;
  }
}
</style>
