<template>
  <div>
    <Navbar />
    <Modal
      v-on:closeModal="closeModal"
      :modalText="modal.modalText"
      :isLoader="true"
      :modalHeader="modal.modalHeader"
      v-if="addedNew"
    />
    <FlowModal
      v-if="addFlow"
      :addNewFlow="addNewFlow"
      v-on:closeFlowModal="closeFlowModal"
    />
    <h1 class="m-5 antialiased text-2xl mb-1 font-bold">
      Here is your dashboard, {{name}} san
    </h1>
    <p class="text-sm font-bold text-gray-600">
      Keep track of your expenses and incomes
    </p>
    <section class="flex justify-center w-full">
      <button
        @click="stats = !stats"
        class="show__stats w-1/2 hidden mt-5  m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Statistics
      </button>
      <transition
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <StatCard
          v-if="stats"
          :expensesThisMonth="expensesThisMonth"
          :incomesThisMonth="incomesThisMonth"
          :incomes="incomes"
          :balance="balance"
        />
      </transition>
      <button
        data-tippy-content="Add a new transaction!"
        @click="addFlow = true"
        class="add__flow mt-5 w-1/2 m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Add new flow
      </button>
      <Table :transactions="transactions" />
    </section>
  </div>
</template>

<script>
import * as firebase from "firebase";
import { getTransactions } from "@/firebase.services.js";
import { addTransaction } from "@/firebase.services.js";
var db = firebase.firestore();
import FlowModal from "@/components/FlowModal.vue";
import Modal from "@/components/Modal.vue";
import StatCard from "@/components/StatCard.vue";
import Table from "@/components/Table.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
    Modal,
    StatCard,
    Table,
    FlowModal,
  },
  methods: {
    closeFlowModal() {
      this.addFlow = false;
    },
    async addNewFlow(flow) {
      addTransaction(flow, this.uid);
      this.addedNew = true;
    },
    closeModal() {
      setTimeout(() => {
        this.addedNew = false;
      }, 1000);
    },
  },
  data() {
    return {
      uid: "",
      name : "",
      balance: "",
      incomes: "",
      incomesThisMonth: "",
      expensesThisMonth: "",
      addFlow: false,
      stats: true,
      addedNew: false,
      transactions: {},
      modal: {
        modalText: "Sucessfully added flow!",
        modalHeader: "Yeey!",
      },
    };
  },
  async created() {
    var that = this;
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.uid = user.uid;
        that.name = user.displayName;
        getTransactions(that.uid).then(function(res) {
          that.transactions = res;
          db.collection("users")
            .doc(that.uid)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                that.incomes = doc.data().income;
                that.expensesThisMonth = doc.data().expensesThisMonth;
                that.incomesThisMonth = doc.data().incomesThisMonth;
                that.balance = doc.data().balance;
              }
            });
        });
      }
    });
  },
};
</script>

<style scoped>
section {
  height: auto !important;
}
.add__flow {
  width: 200px !important;
}
@media only screen and (max-width: 600px) {
  section {
    height: auto !important;
    margin: auto;
  }
  .show__stats {
    display: block;
    width: 200px !important;
  }
}
</style>
