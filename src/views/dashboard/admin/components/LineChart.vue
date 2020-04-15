<template>
  <v-chart :options="option"></v-chart>
  
</template>

<script>
import resize from "./mixins/resize";
export default {
  mixins: [resize],

  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          
        ]
      }
    };
  },
  watch: {
    "$store.state.lite.chart": {
      deep: true,
      handler(val) {
        this.setOptions();
      }
    }
  },
  mounted() {
 this.setOption();
  },
  beforeDestroy() {},
  methods: {
    setOption() {
   this.option.xAxis.data = this.$store.state.lite.chart.xData;
    let yData = this.$store.state.lite.chart.yData;
    for (let i = 0; i < yData.length; i++) {
      console.log(yData[i]);
      let item = {
        data: yData[i].data,
        type: "line",
        smooth: true
      };
      this.option.series.push(item);
    }

    }
    
  }
};
</script>
<style scoped>
.echarts {
  width: 100%;
  height: 350px;
}
</style>
