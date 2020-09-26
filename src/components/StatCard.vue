<template>
  <div class="flex stat__cards">
    <div
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
      class="min-w-0 m-5 rounded-lg border border-1 shadow-xs overflow-hidden bg-white dark:bg-gray-800"
    >
      <div class="p-4 flex items-center">
        <div
          class="p-3 rounded-full text-red-500 dark:text-orange-100 bg-red-100 dark:bg-red-500 mr-4"
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
      class="min-w-0 m-5 rounded-lg border border-1 shadow-xs overflow-hidden bg-white dark:bg-gray-800"
    >
      <div class="p-4 flex items-center">
        <div
          class="p-3 rounded-full text-purple-500 dark:text-purple-100 bg-purple-100 dark:bg-purple-500 mr-4"
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
      class="min-w-0 m-5 rounded-lg border border-1  shadow-xs overflow-hidden bg-white dark:bg-gray-800"
    >
      <div class="p-4 flex items-center">
        <div
          class="p-3 rounded-full text-green-500  dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4"
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
  </div>
</template>

<script>
export default {
  props: ["balance", "incomes", "expensesThisMonth", "incomesThisMonth"],
};
</script>

<style scoped>
section {
  height: auto !important;
}
@media only screen and (max-width: 600px) {
  .stat__cards {
    display: grid;
  }
}
</style>
