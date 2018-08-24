<template>
    <div v-if="$route.path == '/data-marketing/index'" id="table_container">
        <div class="table_title">
            <span class="table_title_s">数据详情</span>
            <downloadBounced></downloadBounced>
        </div>
        <!-- Table表格 -->
        <div class="table_format">
            <i-Table :columns="columns" :data="data"></i-Table>
            <div style="padding-right: 1rem; padding-top: 3rem;overflow:hidden;">
                <div class="table_title"><span class="table_title_s">数据展示</span>
                    <div class="et_button">
                        <span v-for="(item, index) in btnList" :key="index"
                              :class="[`et_button${index+1}`, toggleName == item.type ? 'active' : '']"
                              @click="handleChange(item.type)">{{item.title}}</span>
                    </div>
                </div>
                <div id="overview_chart" :style="{width: '1100px', height: '500px'}"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import downloadBounced from "@/components/downloadBounced.vue";
import { setOptions } from "@/utils/chart.js";
import dayjs from "dayjs";

export default {
  components: {
    downloadBounced
  },
  data() {
    return {
      toggleName: "this_day",
      btnList: [
        {
          title: "节假日",
          type: "this_day"
        },
        {
          title: "动作",
          type: "last_action"
        }
      ],
      chartData: [],
      columns: [
        {
          title: " ",
          key: "stat_type",
          className: "demo-table-info-column"
        },
        {
          title: "视频客流量",
          key: "video_cf",
          className: "overview-table-right"
        },
        {
          title: "WI-FI客流量",
          key: "wifi_cf",
          className: "overview-table-right"
        },
        {
          title: "活动UV",
          key: "activity_uv",
          className: "overview-table-right"
        },
        {
          title: "活动PV",
          key: "activity_pv",
          className: "overview-table-right"
        },
        {
                    title: "累计会员数",
                    key: "mbr_reg_count_acc",
          className: "overview-table-right"
        },
        {
          title: "新增会员数",
                    key: "mbr_reg_count",
          className: "overview-table-right"
        },
        {
          title: "领券量",
          key: "cpn_get_count",
          className: "overview-table-right"
        },
        {
          title: "领取人数",
          key: "cpn_get_persons",
          className: "overview-table-right"
        },
        {
          title: "核销量",
          key: "cpn_chk_count",
          className: "overview-table-right"
        },
        {
          title: "核销人数",
          key: "cpn_chk_persons",
          className: "overview-table-right"
        }
      ],
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
    drawChart() {
      let _this = this;
      if (!_this.chartData) return;
      let overviewChart = this.$echarts.init(
        document.getElementById("overview_chart")
      );
      let options = setOptions(_this.chartData);
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
          _this.drawChart();
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

      await this.$api.getOverviewCur(param).then(res => {
        _this.chartData = res;
      });

      await this.$api
        .getOverviewHistory({
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

.et_button {
  float: right;
  .active {
    color: #396fff !important;
    border-color: #396fff !important;
    opacity: 1 !important;
  }
  .et_button1,
  .et_button2 {
    display: inline-block;
    width: 56px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    opacity: 0.4;
    font-size: 12px;
    color: #2a3962;
    text-align: center;
    border: 1px solid rgba(42, 57, 98, 1);
    font-family: MicrosoftYaHei;
  }
  .et_button1 {
    margin-right: 1rem;
  }
}
</style>
