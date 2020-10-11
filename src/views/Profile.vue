<template>
  <div>
    <Navbar />
    <Loader v-show="showLoader" />
    <Settings v-on:closeModal="closeModal" v-if="showSettings"/>
    <UserCard v-on:displaySettings="displaySettings" :user="user" />
  </div>
</template>

<script>
import * as firebase from "firebase";
var db = firebase.firestore();

import Navbar from "@/components/Navbar.vue";
import UserCard from "@/components/UserCard.vue";
import Settings from "@/components/Settings.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: {
    Navbar: Navbar,
    Settings: Settings,
    Loader: Loader,
    UserCard: UserCard,
  },
  data() {
    return {
      user: {},
      showLoader: true,
      showSettings : false
    };
  },

  methods: {
    displaySettings(){
      this.showSettings = true;
    },
    closeModal() {
        this.showSettings = false;
    },
  },

  mounted() {
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  },

  async created() {
    let that = this;
    let user = firebase.auth().currentUser;
    let uid = user.uid;
    await db
      .collection("users")
      .doc(uid)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          that.user = doc.data();
        }
      });
  },
};
</script>

<style></style>
