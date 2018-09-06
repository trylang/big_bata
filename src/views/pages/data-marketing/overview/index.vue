<template>
  <div id="table_container">
    <div class="table_title">
      <span class="table_title_s">数据详情</span>
      <download :meta="$route.meta" title="数据概览" name="overview"></download>
    </div>
    <!-- Table表格 -->
    <div class="table_format">
      <i-Table width="100%" :columns="columns" :data="data"></i-Table>
      <div style="padding-right: 1rem; padding-top: 3rem;overflow:hidden;">
        <div class="table_title">
          <span class="table_title_s">数据展示</span>
          <!-- <div class="et_button">
                        <span v-for="(item, index) in btnList" :key="index"
                              :class="[`et_button${index+1}`, toggleName == item.type ? 'active' : '']"
                              @click="handleChange(item.type)">{{item.title}}</span>
                    </div> -->
        </div>
        <div id="overview_chart" :style="{width: '100%', height: '500px'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import download from "@/components/download.vue";
import { setOptions } from "@/utils/chart.js";
import { sort } from "@/utils/filter.js";
import dayjs from "dayjs";

export default {
  components: {
    download
  },
  data() {
    return {
      market_id: this.$route.query.market_id || 12555,
      toggleName: "this_day",
      // btnList: [
      //   {
      //     title: "节假日",
      //     type: "this_day"
      //   },
      //   {
      //     title: "动作",
      //     type: "last_action"
      //   }
      // ],
      overview: JSON.parse(window.sessionStorage.getItem("overview")),
      chartData: [],
      data: []
    };
  },
  computed: {
    searchParam() {
      console.log(
        "this.$store.state.BI.searchParam",
        this.$store.state.BI.searchParam
      );
      return this.$store.state.BI.searchParam;
    }
    // ...mapState({
    //   searchParam: state => state.BI.searchParam
    // })
  },
  created() {
    this.init(this.$store.state.BI.searchParam);
    eventBus.$on("updateSearchParam_index", data => {
      this.init(data);
    });
  },
  beforeDestroy() {
    eventBus.$off("updateSearchParam_index");
  },
  computed: {
    columns: function() {
      this.$store.state.BI.overview.forEach(item => {
        item.dim_id == "video_cf" || item.dim_id == "wifi_cf"
          ? (item.default_val = "F")
          : "";
      });
      let res = this.$store.state.BI.overview;
      if (!res) return [];
      let data = res.filter(item => {
        return item.dim_val ? item.dim_val === "T" : item.default_val === "T";
      });
      let columns = [
        {
          title: " ",
          key: "stat_type",
          className: "demo-table-info-column",
          align: "center",
          fixed: "left",
          width: 90
        }
      ];
      sort(data, "disp_order", "asc").forEach((item, index) => {
        columns.push({
          title: item.dim_name,
          key: item.dim_id,
          align: "right"
        });
      });
      return columns;
    }
  },
  watch: {
    chartData: "drawChart"
    // searchParam: {
    //   handler: function(val) {
    //     console.log('watchIndex',val)
    //     this.init(val);
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    handleChange(type) {
      let _this = this;
      this.toggleName = type;
    },
    drawChart(legendSel) {
      let _this = this;
      if (!_this.chartData) return;
      let overviewChart = this.$echarts.init(
        document.getElementById("overview_chart")
      );

      let json = (function(res) {
        if (!res) return [];
        let obj = {};
        let data = res.filter(item => {
          return item.dim_val ? item.dim_val === "T" : item.default_val === "T";
        });
        sort(data, "disp_order", "asc").forEach(item => {
          obj[item.dim_name] = item.dim_id;
        });
        return obj;
      })(this.$store.state.BI.overview);

      let options = setOptions("overview", {
        chart_data: _this.chartData,
        json,
        legendSel
      });
      // 绘制图表
      overviewChart.setOption(options);
      overviewChart.on("legendselectchanged", function(obj) {
        var selected = obj.selected;
        let selectedNum = 0;
        for (let key in selected) {
          if (selected[key]) selectedNum++;
        }
        if (selectedNum > 4) {
          _this.$Message.warning("最多只能选择4个图例");
          selected[obj.name] = false;
          options.legend.selected = selected;
          _this.drawChart(selected);
        }
      });

      setTimeout(function() {
        window.onresize = function() {
          overviewChart.resize();
        };
      }, 0);
    },
    async init(param) {
      let _this = this;

      await this.$api.getWeather({sno: "430100", period_start_time: param.start_date
      , period_end_time: param.end_date}).then(weather => {

        this.$api
        .getOverviewCur({ market_id: this.market_id, ...param })
          .then(res => {
            var format = function(item){
              weather.forEach(wea => {
                if (wea.ymd == item.stat_ymd) {
                  item.weather = wea;
                }
              })
            }
            res.forEach(item => {
              format(item);
              if (!item.weather) {
                item.weather = {};
                item.weather.ymd = item.stat_ymd;
              }
            });
            _this.chartData = res.sort(function(a, b) {
              return new Date(a.stat_ymd) - new Date(b.stat_ymd);
            });

        });
      });

      await this.$api
        .getOverviewHistory({
          market_id: this.market_id,
          current_date: this.dayjs()
            .subtract(1, "day")
            .format("YYYY-MM-DD"),
          ...param
        })
        .then(res => {
          res.forEach(item => {
            for (let key in item) {
              if (!item[key] && item[key] != 0) item[key] = "--";
            }
          });
          _this.data = res;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.echarts {
  height: 300px;
}
</style>
