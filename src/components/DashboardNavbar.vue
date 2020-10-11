<template>
  <nav
    class="dashboard w-24 flex top-0 flex-col fixed items-center bg-white dark:bg-gray-800 py-4"
  >
    <div>
      <a
        href="#"
        class="dasbhoard__logo antialiased text-blue-500 text-2xl font-bold"
        >W</a
      >
    </div>

    <ul
      class="mt-2 dashboard__bottom text-gray-700 dark:text-gray-400 capitalize"
    >
      <li class="mt-3 p-2 text-blue-500 dark:text-blue-300 rounded-lg">
        <a href="/" class=" flex flex-col items-center">
          <i class="fas fa-tachometer-alt"></i>
          <span class="text-xs mt-2 font-bold">Dasboard</span>
        </a>
      </li>

      <li
        class="mt-3 p-2 hover:text-blue-500 dark-hover:text-blue-300
				rounded-lg"
      >
        <a href="/" class=" flex flex-col items-center">
          <i class="fas fa-chart-line"></i>
          <span class="text-xs mt-2 font-bold">Statistics</span>
        </a>
      </li>

      <li
        class="mt-3 p-2 hover:text-blue-500 dark-hover:text-blue-300
				rounded-lg"
      >
        <a href="/" class=" flex flex-col items-center">
          <i class="fas fa-plus"></i>
          <span class="text-xs mt-2 font-bold">New flow</span>
        </a>
      </li>

      <li
        class="mt-3 p-2 hover:text-blue-500 dark-hover:text-blue-300
				rounded-lg"
      >
        <a href="/" class=" flex flex-col items-center">
          <i class="fas fa-minus-circle"></i>
          <span class="text-xs mt-2 font-bold">Reset</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style>
@media only screen and (max-width: 600px) {
  .dashboard {
    padding: 0;
    width: 100%;
  }
  .dashboard__bottom {
    display: flex;
    position: fixed;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    border: 0;
    bottom: 0;
    background: white;
    z-index: 99;
  }
  .dasbhoard__logo {
    display: none;
  }
}
</style>
