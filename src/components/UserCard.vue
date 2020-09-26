<template>
  <div class="profile">
    <div
      class="profile__card bg-white sm:max-w-full max-w-md rounded overflow-hidden"
    >
      <div class="text-center p-2 ">
        <lottie-player
          data-tippy-content="Pop up the settings !"
          class="button__settings cursor-pointer"
          src="https://assets1.lottiefiles.com/packages/lf20_Jd6ls7.json"
          background="transparent"
          speed="1"
          style="width: 25px; height: 25px; position:absolute; right:7%"
          hover
        ></lottie-player>
        <div class="flex justify-start align-center m-5">
          <lottie-player
            class="lottie__player w-auto"
            src="https://assets9.lottiefiles.com/packages/lf20_SwqOyE.json"
            background="transparent"
            speed="0.2"
            style="width: 150px; height: 150px;"
            autoplay
          ></lottie-player>
        <div class="flex flex-col justify-center items-start">
           <p class="pt-2 text-lg font-semibold">
            {{ this.user.name }}
          </p>
          <p class="text-sm font-bold text-gray-600">
            {{ this.user.email }}
          </p>
             <p class="text-sm font-bold text-gray-600">
            {{ this.user.createdAt | convertEpochToDate }}
          </p>
        </div>
        </div>
        <p class="antialiased text-2xl   border-b-2 text-gray-600 text-left mb-1 font-bold">Brief</p>
        <div class="align-left m-auto flex flex-col">
          <StatCard
            :expensesThisMonth="this.user.expensesThisMonth"
            :incomesThisMonth="this.user.incomesThisMonth"
            :incomes="this.user.income"
            :balance="this.user.balance"
          />
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
import StatCard from "@/components/StatCard.vue";
export default {
  props: ["user"],
  components: {
    StatCard,
  },
  filters: {
    convertEpochToDate(date) {
      var myDate = new Date(date * 1000);
      return myDate;
    },
  },
  methods: {
    deleteUserAccount() {
      deleteAccount(this.user.uid);
      signOut();
      this.$router.push("/Home");
    },
  },
};
</script>

<style scoped>
.profile{
  max-width: 1200px;
  margin: auto;
}
.profile__card {
  margin: 2rem 4rem;
}
.lottier__player {
  width: auto !important;
}
@media only screen and (max-width: 600px) {
  .profile__card {
    margin: 0;
  }
  .button__settings {
    width: 50px !important;
    height: 50px !important;
  }
}
</style>
