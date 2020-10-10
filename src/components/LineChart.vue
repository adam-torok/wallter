<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {

    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  mounted() {
    console.log(this.chartData);
    const type = this.chartData.map((d) => d.type);
    const sum = this.chartData.map((d) => d.sum);
    this.renderChart(
      {
        labels: type,
        datasets: [
          {
            data: sum,
            backgroundColor: ["#63b3ed", "#4299E1", "#63b3ed", "#e06543"],
          },
        ],
      },
      this.options
    );
  },
};
</script>
