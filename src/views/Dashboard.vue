<template>
  <div>
    <Loader v-show="showLoader" />
    <Navbar />
    <DashboardNavbar />
    <Modal
      v-on:closeModal="closeModal"
      :modalText="modals.addNewFlowModal.modalText"
      :isLoader="true"
      :modalHeader="modals.addNewFlowModal.modalHeader"
      v-if="addedNew"
    />
    <FlowModal
      v-if="addFlow"
      :addNewFlow="addNewFlow"
      v-on:closeFlowModal="closeFlowModal"
    />
    <ResetProgressModal
      v-if="resetProgress"
      :resetUserProgress="resetUserProgress"
      v-on:closeResetModal="closeResetModal"
    />
    <SideNote />
    <h1 class="m-5 antialiased text-2xl mb-1 font-bold">
      Here is your dashboard, {{ user.name }} san!
    </h1>
    <p class="text-sm font-bold text-gray-600">
      Keep track of your expenses and incomes
    </p>
    <button
      data-tippy-content="Add a new transaction!"
      @click="addFlow = true"
      class="add__flow mt-5 w-1/2 m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >
      Add new flow
    </button>
    <button
      data-tippy-content="Reset your whole progress!"
      @click="resetProgress = true"
      class="add__flow mt-5 w-1/2 m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >
      Reset progress
    </button>
    <button
      @click="stats = !stats"
      class="show__stats mt-5 w-1/2 m-1 bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >
      Statistics
    </button>
    <section v-if="stats" class="flex justify-center w-full">
      <p class="text-lg font-bold text-gray-600">
        Charts on your spendings
      </p>
      <div
        class="part__charts m-5 flex flex-row bg-white rounded-lg border border-1 justify-evenly shadow-xs w-3/4"
      >
        <PieChart
          class="chart"
          v-if="loaded"
          :options="chartOptions"
          :chartData="chartdata"
        />
        <LineChart
          class="chart"
          v-if="loaded"
          :options="chartOptions"
          :chartData="chartdata"
        />
      </div>
      <p class="text-lg font-bold text-gray-600">
        Statistics on your spendings
      </p>
      <div
        class="stat__card-holder m-5 flex flex-row bg-white rounded-lg border border-1 shadow-xs w-3/4"
      >
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
      </div>
      <p class="text-lg font-bold text-gray-600">
        Table on your spendings
      </p>
      <div
        class="m-5 flex flex-row bg-white rounded-lg border border-1 shadow-xs w-3/4"
      >
        <Table :transactions="transactions" v-on:orderTable="orderTable" />
      </div>
    </section>
    <lottie-player
      v-if="!stats"
      src="https://assets2.lottiefiles.com/packages/lf20_lhy3lqfr.json"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px; margin: 50px auto"
      loop
      autoplay
    ></lottie-player>
  </div>
</template>

<script>
import * as firebase from "firebase";
import { getTransactions } from "@/firebase.services.js";
import { getSpecificSpendings } from "@/firebase.services.js";
import { addTransaction } from "@/firebase.services.js";
import { resetProgress } from "@/firebase.services.js";
import FlowModal from "@/components/FlowModal.vue";
import ResetProgressModal from "@/components/ResetProgressModal.vue";
import Modal from "@/components/Modal.vue";
import StatCard from "@/components/StatCard.vue";
import Table from "@/components/Table.vue";
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";
import Loader from "@/components/Loader.vue";
import Navbar from "@/components/Navbar.vue";
import DashboardNavbar from "@/components/DashboardNavbar.vue";
import SideNote from "@/components/SideNote.vue";
var db = firebase.firestore();
export default {
  components: {
    Navbar,
    DashboardNavbar,
    Loader,
    SideNote,
    PieChart,
    LineChart,
    Modal,
    ResetProgressModal,
    StatCard,
    Table,
    FlowModal,
  },
  data() {
    return {
      //Stores data from the user
      user: {
        uid: "",
        name: "",
        balance: "",
        incomes: "",
        incomesThisMonth: "",
        expensesThisMonth: "",
      },
      //These are initial spending types
      spendingTypes: [
        "Groceries",
        "Travel",
        "Check",
        "Takeaway",
        "Accomondation",
        "Gift",
      ],
      //Specific spendings will be filled depending on data in the database, the sum and the type of the spending.
      specificSpendings: [],
      transactions: {},
      //These are some options for the component 'LineChart'
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      //Some modalTexts - nothing special
      modals: {
        addNewFlowModal: {
          modalText: "Sucessfully added flow!",
          modalHeader: "Yeey!",
        },
        resetProgressModal: {
          modalText: "Sucessfully resetted your progress!",
          modalHeader: "Yeey!",
        },
      },
      loaded: false,
      chartdata: null,
      addFlow: false,
      resetProgress: false,
      stats: true,
      addedNew: false,
      showLoader: true,
    };
  },
  methods: {
    closeFlowModal() {
      this.addFlow = false;
    },
    closeResetModal() {
      this.resetProgress = false;
    },
    async resetUserProgress() {
      resetProgress(this.user.uid);
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    async addNewFlow(flow) {
      addTransaction(flow, this.user.uid);
      this.addedNew = true;
      setTimeout(() => {
        location.reload();
      }, 300);
    },
    closeModal() {
      setTimeout(() => {
        this.addedNew = false;
        this.resetProgress = false;
      }, 1500);
    },
    orderTable(order) {
      let that = this;
      getTransactions(that.user.uid, order).then(function(res) {
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
    },
  },
  async created() {
    var that = this;
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.user.uid = user.uid;
        that.user.name = user.displayName;
        getTransactions(that.user.uid, "date").then(function(res) {
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
                that.loaded = true;
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
            that.chartdata = that.specificSpendings;
          });
        });
      }
    });
  },
  mounted() {
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
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
.chart {
  margin: 20px;
}
@media only screen and (max-width: 600px) {
  .part__charts {
    flex-direction: column;
    width: auto;
  }
  section {
    height: auto !important;
    margin: auto;
  }
  .show__stats {
    width: 200px !important;
  }
}
</style>
