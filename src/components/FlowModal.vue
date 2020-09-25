<template>
  <div
    class="modal bg-blue-500 bg-opacity-75 absolute z-50 h-screen w-full flex flex-col items-center justify-center font-sans"
  >
    <div
      class="h-screen w-full absolute flex items-center justify-center bg-modal"
    >
      <div
        class="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll"
      >
        <div class=" flex justify-center items-center flex-col">
          <h1 class="antialiased text-2xl font-bold">Add new Flow!</h1>
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_XyWejw.json"
            background="transparent"
            speed="1"
            style="width: 150px; height: 150px;"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div class="mb-4">
          <label
            for="Type"
            class="mb-4 uppercase text-grey-darker text-xs font-bold"
            >Type</label
          >
          <select
            required
            v-model="flow.type"
            class="bg-gray-300 appearance-none  w-full text-grey-500 p-2 py-2 font-normal rounded text-grey-900 border border-grey-lighter font-bold"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div class="mb-4">
          <label
            for="category"
            class="mb-4 uppercase text-grey-darker text-xs font-bold"
            >Category</label
          >
          <select
            required
            v-model="flow.category"
            class="bg-gray-300 w-full appearance-none text-grey-500 p-2 py-2 font-normal rounded text-grey-900 border border-grey-lighter font-bold"
          >
            <option value="Gift">Gift</option>
            <option value="Groceries">Groceries</option>
            <option value="Travel">Travel</option>
            <option value="Takeaway">Takeaway</option>
            <option value="Check">Check</option>
            <option value="Accomondation">Accomondation</option>
          </select>
        </div>
        <div class="mb-4">
          <label
            for="value"
            class="mb-4 uppercase text-grey-darker text-xs font-bold"
            >Value</label
          >
          <input
            required
            v-model="flow.value"
            placeholder="Value"
            type="number"
            min="0"
            class="w-full bg-gray-300 appearance-none   text-grey-500 p-2 py-2 font-normal rounded text-grey-900 border border-grey-lighter font-bold"
          />
        </div>
        <div class="flex justify-center">
          <button
            @click="addFlow"
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Alrighty
          </button>
          <button
            @click="closeModal"
            class="ml-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["addNewFlow"],
  data() {
    return {
      flow: {
        type: "",
        value: "",
        category: "",
        date: "",
      },
    };
  },
  methods: {
    addFlow() {
      var rightNow = new Date();
      var res = rightNow
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      this.flow.date = res;
      this.addNewFlow(this.flow);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeFlowModal");
    },
  },
};
</script>

<style></style>
