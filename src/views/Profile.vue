<template>
  <div>
    <Navbar />
    <Loader v-show="showLoader" />
    <UserCard :user="user" />
  </div>
</template>

<script>
import * as firebase from "firebase";
var db = firebase.firestore();

import Navbar from "@/components/Navbar.vue";
import UserCard from "@/components/UserCard.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: {
    Navbar: Navbar,
    Loader: Loader,
    UserCard: UserCard,
  },
  data() {
    return {
      user: {},
      showLoader: true,
    };
  },

  methods: {},

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
