<template>
  <div class="flex stat__cards">
    <div
      data-tippy-content="This is the base data that you gave us, it is your salary - will be added to your balance every month"
      class="min-w-0 m-5 rounded-lg border border-1 shadow-xs overflow-hidden bg-white dark:bg-gray-800"
    >
      <div class="p-4 flex items-center">
        <div
          class="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4"
        >
          <i class="fas fa-hand-holding-usd"></i>
        </div>
        <div>
          <p class="text-sm font-bold text-gray-600">
            Monthly payroll
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {{ this.incomes }} HUF
          </p>
        </div>
      </div>
    </div>
    <div
      data-tippy-content="This shows you how much you Spent this month, try to keep it as low as possible !"
      class="min-w-0 m-5 rounded-lg border border-1 shadow-xs overflow-hidden bg-white dark:bg-gray-800"
    >
      <div class="p-4 flex items-center">
        <div
          class="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-red-500 mr-4"
        >
          <i class="far fa-money-bill-alt"></i>
        </div>
        <div>
          <p class="text-sm font-bold text-gray-600">
            Expenses this month
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {{ this.expensesThisMonth }} HUF
          </p>
        </div>
      </div>
    </div>
    <div
      data-tippy-content="This shows you how much did you earn this month, can be a gift or anything else"
      class="min-w-0 m-5 rounded-lg border border-1 shadow-xs overflow-hidden bg-white dark:bg-gray-800"
    >
      <div class="p-4 flex items-center">
        <div
          class="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4"
        >
          <i class="far fa-money-bill-alt"></i>
        </div>
        <div>
          <p class="text-sm font-bold text-gray-600">
            Incomes this month
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {{ this.incomesThisMonth }} HUF
          </p>
        </div>
      </div>
    </div>
    <div
      data-tippy-content="Lets pump up these numbers"
      class="min-w-0 m-5 rounded-lg border border-1  shadow-xs overflow-hidden bg-white dark:bg-gray-800"
    >
      <div class="p-4 flex items-center">
        <div
          class="p-3 rounded-full text-blue-500  dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4"
        >
          <i class="fas fa-wallet"></i>
        </div>
        <div>
          <p class="text-sm font-bold text-gray-600">
            Account balance
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {{ this.balance }} HUF
          </p>
        </div>
      </div>
    </div>
    <div
      v-for="specificSpending in this.specificSpendings" 
      :key="specificSpending.id"
      class="min-w-0 m-5 rounded-lg border border-red-200 border-1  shadow-xs overflow-hidden bg-white dark:bg-gray-800"
    >
      <div class="card__spending p-4 flex items-center">
        <div
          class="p-3 rounded-full text-red-500  dark:text-red-200 bg-red-200 dark:bg-green-200 mr-4"
        >
          <i class="fas fa-money-bill-alt"></i>
        </div>
        <div>
          <p class="text-sm font-bold text-red-500">
            Spent on {{specificSpending.type}}
          </p>
          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {{ specificSpending.sum }} HUF
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "balance",
    "incomes",
    "expensesThisMonth",
    "incomesThisMonth",
    "specificSpendings",
  ],
};
</script>

<style scoped>
section {
  height: auto !important;
}
.stat__cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
@media only screen and (max-width: 600px) {
  .stat__cards {
    width: auto;
    grid-template-columns: 1fr;
  }
}
</style>
