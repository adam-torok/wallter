<template>
  <div class="container  mx-auto py-10 flex justify-center">
    <div class="w-full pl-4flex flex-col">
      <div class="w-full overflow-auto shadow bg-white" id="journal-scroll">
        <table class="w-full">
          <tbody class="">
            <tr
              class="relative transform scale-100
                    text-xs py-1 border-b-2  border-blue-100 cursor-default
                    bg-blue-500 bg-opacity-25"
            >
              <td class="pl-5 p-3 pr-3 whitespace-no-wrap">
                <div
                  @click="startOrdering('date')"
                  data-tippy-content="Date of flow"
                  class="antialiased text-gray-700 text-xl mb-1 font-bold"
                >
                  Date
                </div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div
                  @click="startOrdering('category')"
                  data-tippy-content="Type of flow"
                  class="antialiased text-gray-700 text-xl mb-1 font-bold"
                >
                  Flow
                </div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div
                  @click="startOrdering('type')"
                  data-tippy-content="What type of flow is it"
                  class="antialiased text-gray-700 text-xl mb-1 font-bold"
                >
                  Type
                </div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div
                  @click="startOrdering('value')"
                  data-tippy-content="The value of the particular income/expense"
                  class="antialiased text-gray-700 text-xl mb-1 font-bold"
                >
                  Value
                </div>
              </td>
            </tr>

            <tr
              class="relative transform scale-100 text-xs py-1 border-b-2  border-blue-100 cursor-default"
              v-for="transaction in this.transactions"
              :key="transaction.id"
            >
              <td class="pl-5 p-3 pr-3 whitespace-no-wrap">
                <div class="text-sm font-bold text-gray-600">
                  {{ transaction.date | dateFormat }}
                </div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div class="text-sm font-bold text-gray-600">
                  {{ transaction.category }}
                </div>
              </td>
              <td class="px-2 py-2">
                <div
                  v-bind:class="{
                    'bg-green-500': transaction.type == 'Income',
                    'bg-red-500': transaction.type == 'Expense',
                  }"
                  class="text-sm font-bold w-1/2 m-auto text-white rounded-lg"
                >
                  {{ transaction.type }}
                </div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div
                  v-bind:class="{
                    'text-green-500': transaction.type == 'Income',
                    'text-red-500': transaction.type == 'Expense',
                  }"
                  class="text-sm font-bold"
                >
                  {{ transaction.value }} Ft
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    dateFormat(date) {
      //My overkilled formatter filter 😅
      let year = date.slice(0, 4);
      let month = date.slice(4, 6);
      let day = date.slice(6, 8);
      return year.concat(".", month) + "." + day;
    },
  },
  props: ["transactions"],
  methods: {
    startOrdering(type) {
      console.log("ordering " + type);
      this.$emit("orderTable", type);
    },
  },
};
</script>

<style>
table {
  width: 80%;
}
</style>
