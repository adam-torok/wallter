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
      Here is your dashboard, {{ user.name }} san!
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
          :expensesThisMonth="user.expensesThisMonth"
          :incomesThisMonth="user.incomesThisMonth"
          :specificSpendings="specificSpendings"
          :incomes="user.incomes"
          :balance="user.balance"
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
import { getSpecificSpendings } from "@/firebase.services.js";
import { addTransaction } from "@/firebase.services.js";
import FlowModal from "@/components/FlowModal.vue";
import Modal from "@/components/Modal.vue";
import StatCard from "@/components/StatCard.vue";
import Table from "@/components/Table.vue";
import Navbar from "@/components/Navbar.vue";
var db = firebase.firestore();
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
      addTransaction(flow, this.user.uid);
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
      user: {
        uid: "",
        name: "",
        balance: "",
        incomes: "",
        incomesThisMonth: "",
        expensesThisMonth: "",
      },
      addFlow: false,
      stats: true,
      addedNew: false,
      spendingTypes: [
        "Groceries",
        "Travel",
        "Check",
        "Takeaway",
        "Accomondation",
        "Gift",
      ],
      specificSpendings: [],
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
        that.user.uid = user.uid;
        that.user.name = user.displayName;
        getTransactions(that.user.uid).then(function(res) {
          that.transactions = res;
          db.collection("users")
            .doc(that.user.uid)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                that.user.incomes = doc.data().income;
                that.user.expensesThisMonth = doc.data().expensesThisMonth;
                that.user.incomesThisMonth = doc.data().incomesThisMonth;
                that.user.balance = doc.data().balance;
              }
            });
        });
        //Basically gets all the documents from the db, foreach type it sums the value, than push it into an array as an object
        //Still a bit buggy, cuz res will be in the promise for the first time, it works - but the console message is there
        that.spendingTypes.forEach((type) => {
          getSpecificSpendings(that.user.uid, type).then(function(res) {
            var sum = res
              .filter((x) => x > 0)
              .reduce(function(a = 0, b = 0) {
                return parseFloat(a) + parseFloat(b);
              });
            that.specificSpendings.push({ type, sum });
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
