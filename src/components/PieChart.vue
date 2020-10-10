<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  mounted() {
    const type = this.chartData.map((d) => d.type);
    const sum = this.chartData.map((d) => d.sum);
    this.renderChart(
      {
        labels: type,
        datasets: [
          {
            label: this.labels,
            data: sum,
            backgroundColor: ["#63b3ed","#4299E1","#63b3ed","#e06543"]
          },
        ],
        
      },
      this.options
    );
  },
};
</script>
