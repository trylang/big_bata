<template>
    <div id="table_container">
        <div class="table_title">
          <span>数据详情</span>
         <downloadBounced></downloadBounced>
        </div>
         
      <!-- Table表格 -->
      <i-Table border :columns="columns" :data="data" ></i-Table>
      <!-- Table分页 -->
      <div style="padding-right: 1rem; padding-top: 3rem;">
        <div class="table_title"><span>数据展示</span></div>
        <!-- <ve-line :data="chartData"></ve-line> -->
        <div id="overview_chart" :style="{width: '1100px', height: '500px'}"></div>
      </div>
     
  </div>
</template>
<script>
import { mapState } from "vuex";
import downloadBounced from "@/components/downloadBounced.vue";
import { fmoney } from "@/utils/filter.js";
import dayjs from "dayjs";

export default {
  components: {
    downloadBounced
  },
  data() {
    return {
      chartData: [],
      columns: [
        {
          title: " ",
          key: "title",
          className: "demo-table-info-column"
        },
        {
          title: "视频客流量",
          key: "video_cf"
        },
        {
          title: "WI-FI客流量",
          key: "wifi_cf"
        },
        {
          title: "活动UV",
          key: "act_uv"
        },
        {
          title: "活动Pv",
          key: "act_pv"
        },
        {
          title: "会员数",
          key: "rtg_members"
        },
        {
          title: "新增会员数",
          key: "sale_amout"
        },
        {
          title: "领券量",
          key: "average"
        },
        {
          title: "领取人数",
          key: "sales"
        },
        {
          title: "核销量",
          key: "roi"
        },
        {
          title: "核销人数",
          key: "roi"
        }
      ],
      data: []
    };
  },
  computed: {
    ...mapState({
      searchParam: state => state.BI.searchParam
    })
  },
  created() {
    this.init();
  },
  watch: {
    chartData: "drawChart"
  },
  methods: {
    drawChart() {
      let _this = this
      let overviewChart = this.$echarts.init(
        document.getElementById("overview_chart")
      );

      let colors = ["#396FFF", "#E4007F", "#90C31F", "#FABE00", "#CCCCCC"];
      let itemColors = {
        holiday: "#396FFF",
        activity: "#F5A623",
        zhoumo: "#ccc"
      };
      let json = {
        视频客流量: "video_cf",
        WIFI客流量: "wifi_cf",
        活动UV: "act_uv",
        活动Pv: "act_pv",
        会员数: "rtg_members",
        新增会员数: "rtg_members_new",
        领取人数: "coupon_chk_persions"
      };
      let options = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            data: []
          }
        ],
        legend: {
          selectedMode: "multiple",
          selected: {}
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        // yAxis: [
        //   {
        //     type: 'value',
        //     name: '蒸发量',
        //     min: 0,
        //     max: 250,
        //     position: 'right',
        //     axisLine: {
        //         lineStyle: {
        //             color: '#999'
        //         }
        //     },
        //     axisLabel: {
        //         formatter: '{value} ml'
        //     }
        // },
        // {
        //     type: 'value',
        //     name: '温度',
        //     min: 0,
        //     max: 25,
        //     position: 'left',
        //     axisLine: {
        //         lineStyle: {
        //             color: '#999'
        //         }
        //     },
        //     axisLabel: {
        //         formatter: '{value} °C'
        //     }
        // }],
        series: []
      };

      options.legend.data = Object.keys(json);
      options.legend.data.map((item, index) => {
        if (index < 4) {
          options.legend.selected[item] = true;
        } else {
          options.legend.selected[item] = false;
        }
      });

      options.xAxis[0].data = (() => {
        let data = this.chartData.map(item => item.stat_ymd);
        data.push(
          dayjs(data[data.length - 1])
            .add(1, "day")
            .format("YYYY-MM-DD")
        );
        return data;
      })();

      var areaStyle = {
        silent: false,
        data: []
      };

      let holidayObjs = {};

      this.chartData.forEach(item => {
        let name = item.action_name || item.holiday_name || item.zhoumo;
        if (!name) return;
        if (!holidayObjs[name]) {
          holidayObjs[name] = {};
          holidayObjs[name].type = item.action_name
            ? "activity"
            : item.holiday_name ? "holiday" : "zhoumo";
          holidayObjs[name].startTime = item.stat_ymd;
        } else {
          holidayObjs[name].endTime = dayjs(item.stat_ymd)
            .add(1, "day")
            .format("YYYY-MM-DD");
        }
      });

      for (let key in holidayObjs) {
        if (!holidayObjs[key].endTime) {
          holidayObjs[key].endTime = dayjs(holidayObjs[key].startTime)
            .add(1, "day")
            .format("YYYY-MM-DD");
        }
        areaStyle.data.push([
          {
            name: key,
            xAxis: holidayObjs[key].startTime,
            itemStyle: {
              color: itemColors[holidayObjs[key].type],
              opacity: 0.16
            },
            label: {
              offset: [0, 370],
              color: itemColors[holidayObjs[key].type]
            }
          },
          {
            xAxis: holidayObjs[key].endTime
          }
        ]);
      }

      let chart_series = [];
      options.legend.data.forEach(item => {
        chart_series.push({
          name: item,
          type: "line",
          smooth: true,
          label: {
            show: true,
            position: "top",
            color: "auto",
            formatter: param => {
              return fmoney(param.value);
            }
          },
          markArea: areaStyle,
          data: this.chartData.map(data => data[json[item]])
        });
      });

      options.series = chart_series;
      // console.log(JSON.stringify(options, null, 4));
      // 绘制图表
      overviewChart.setOption(options);
      overviewChart.on("legendselectchanged", function(obj) {
        var selected = obj.selected;
        let selectedNum = 0
        for( let key in selected) {
          if (selected[key]) selectedNum++
        }
        if (selectedNum > 4) {
          _this.$Message.warning('最多只能选择4个图例');
          selected[obj.name] = false
          options.legend.selected = selected; 
          overviewChart.setOption(options);
        }
      });

      setTimeout(function() {
        window.onresize = function() {
          overviewChart.resize();
        };
      }, 0);
    },
    async init() {
      let _this = this;
      await this.$api.getOverviewCur().then(res => {
        _this.data = res.list;
      });
      await this.$api.getOverviewHistory().then(res => {
        _this.chartData = res.list;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ivu-table td.demo-table-info-column {
  background: #f8f8f9;
}
.echarts {
  height: 300px;
}
</style>
