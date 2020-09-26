<template>
  <div>
    <Navbar />
    <Alert />
    <section>
      <div>
        <div>
          <h1 class="antialiased text-2xl mb-1 font-bold">
            Keep track of your incomes.
          </h1>
          <p class="text-sm font-bold text-gray-600">
            A new app Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Aspernatur doloribus error quisquam veritatis, animi deserunt
            tenetur accusantium molestiae dicta temporibus placeat distinctio
            enim odio ut minima porro voluptatibus ex odit.
          </p>
        </div>
        <lottie-player
          class="lottie__player"
          src="moneystack.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
        ></lottie-player>
      </div>
      <div>
        <lottie-player
          class="lottie__player lottie__player-second"
          src="https://assets9.lottiefiles.com/private_files/lf30_mwPqHM.json"
          mode="bounce"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
          loop
          autoplay
        ></lottie-player>
        <div>
          <h1 class="antialiased text-2xl mb-1 font-bold">
            Dont let your money slip away!
          </h1>
          <p class="text-sm font-bold text-gray-600">
            A new app Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Aspernatur doloribus error quisquam veritatis, animi deserunt
            tenetur accusantium molestiae dicta temporibus placeat distinctio
            enim odio ut minima porro voluptatibus ex odit.
          </p>
        </div>
        <div></div>
      </div>
    </section>
    <section class="news__container">
      <h1 class="antialiased text-2xl font-bold">
        Some interesting articles...
      </h1>
      <div class="news">
        <div
          class="article"
          v-for="article in this.news.articles"
          :key="article.id"
        >
          <div class="mb-5 w-full">
            <a
              href="#"
              class="article block rounded-lg m-1 relative p-5"
              v-bind:style="{
                'background-image':
                  'linear-gradient(0deg, rgba(99, 179, 237, 0.5), rgba(99, 179, 237, 0.8)), url(' +
                  article.urlToImage +
                  ')',
              }"
            >
              <h2 class="text-white text-2xl font-bold leading-tight mb-3 pr-5">
                {{ article.title }}
              </h2>
              <div
                class="flex w-full items-center text-sm text-gray-300 font-medium"
              >
                <div class="flex-1 flex items-center">
                  <div>Gwen Thomson</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Alert from "@/components/Alert.vue";
export default {
  components: {
    Navbar: Navbar,
    Alert: Alert,
  },
  data() {
    return {
      news: {},
    };
  },
  methods: {
    async fetchNews() {
      const res = await fetch(
       // "https://newsapi.org/v2/everything?q=money&from=2020-08-20&to=2020-08-20&sortBy=popularity&apiKey=eed39cf371d04783aa85d8f258030d56"
      );
      return res.json();
    },
  },
  async mounted() {
    this.news = {}
  },
};
</script>

<style scoped>
section {
  height: auto;
  margin: 50px;
}
section > div {
  display: grid;
  margin: 50px;
  justify-content: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  max-width: 1200px;
}
.article {
  width: auto;
  min-width: 80%;
  width: 95%;
  height: 250px;
  margin: 10px;
}
.article > div {
}
@media only screen and (max-width: 600px) {
  section > div {
    grid-template-columns: 1fr;
    margin: 0;
  }
  .news {
    margin: 0;
  }
  .news__container {
    margin: 0;
  }
  .lottie__player {
    width: 200px !important;
    margin-bottom: px;
  }
  .lottie__player-second{
    grid-row:2;
  }
}
</style>
