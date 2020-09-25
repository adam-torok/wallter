<template>
  <div class="container  mx-auto py-10 flex justify-center h-screen">
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
                <div class="antialiased text-gray-700 text-xl mb-1 font-bold">
                  Date
                </div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div class="antialiased text-gray-700 text-xl mb-1 font-bold">
                  Flow
                </div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div class="antialiased text-gray-700 text-xl mb-1 font-bold">
                  Type
                </div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div class="antialiased text-gray-700 text-xl mb-1 font-bold">
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
                <div class="text-sm font-bold text-gray-600">{{transaction.date}}</div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div class="text-sm font-bold text-gray-600">{{transaction.category}}</div>
              </td>
              <td class="px-2 py-2">
                <div
                  class="text-sm font-bold w-1/2 m-auto text-white bg-green-500 rounded-lg"
                >
                  {{transaction.type}}
                </div>
              </td>
              <td class="px-2 py-2 whitespace-no-wrap">
                <div class="text-sm font-bold text-green-400">{{transaction.value}}</div>
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
  props: ["transactions"],
};
</script>

<style>
table {
  width: 80%;
}
</style>
