<template>
  <div id="table_container">
    <div class="table_title">
        <span>活动详情</span> 
        <actionDetail></actionDetail>
    </div>
        <Table :columns="columnsT1" @on-sort-change="handleSortT1" :data="pageT1List"></Table>
    <div class="table_page">
      <div class="table_page_l">
          <p>共 <span>{{dataT1.length}}</span> 条数据</p>
      </div>
      <div class="table_page_r">
        <Page :total="dataT1.length" :current.sync="curPageT1" :page-size="10" show-elevator @on-change="changePageT1"/>
      </div>
    </div>
    <div>
      <div class="table_title"><span>数据展示</span></div>
      <div id="activity_chart" :style="{width: '1100px', height: '500px'}"></div>
    </div>
      <div>
        <div class="table_title">
            <span>数据详情</span> 
            <actionDetail></actionDetail>
        </div>
        <Table  width="100%" :columns="columnsT2" :data="pageT2List" @on-sort-change="handleSortT2"></Table>
				<div class="table_page">
					<div class="table_page_l">
						<p>共 <span>{{dataT2.length}}</span> 条数据</p>
					</div>
					<div class="table_page_r">
						<Page :total="dataT2.length" :current.sync="curPageT2" :page-size="10" show-elevator @on-change="changePageT2"/>
					</div>
				</div>
      </div>
  </div>
</template>
<script>
import actionDetail from "@/components/actionDetail.vue";
import { mapState } from "vuex";
import dayjs from 'dayjs';
import { sort, fmoney } from '@/utils/filter.js';
export default {
  components: {
    actionDetail
  },
  data() {
    return {
      chartData: {},
      columnsT1: [
        {
          title: "活动名称",
          key: "activity_name"
        },
        {
          title: "活动时间",
          key: "period_dur_name"
        },
        {
          title: "历时天数",
          key: "period_days"
        },
        {
          title: "获取会员数",
          key: "quantity",
          sortable: 'custom'
        },
        {
          title: "参与商户数",
          key: "shops",
          sortable: 'custom'
        },
        {
          title: "活动总成本",
          key: "gross_cost",
          sortable: 'custom'
        },
        {
          title: "日均拉新",
          key: "daily_trd_new",
          sortable: 'custom'
        },
        {
          title: "日均销售",
          key: "daily_trd_amount",
          sortable: 'custom'
        },
        {
          title: "拉新ROI",
          key: "roi",
          sortable: 'custom'
        }
			],
			columnsT2: [
				{
          title: "日期",
					key: "stat_ymd",
					width: 140,
          fixed: 'left',
          className: "demo-table-info-column"
        },
        {
          title: "楼层",
					key: "shop_floor",
          width: 100,
        },
        {
          title: "业态",
					key: "shop_bizcat",
          width: 100,
        },
        {
          title: "WIFI客流量",
          key: "wifi_cf",
          width: 100,
					sortable: true
        },
        {
          title: "视频客流量",
          key: "video_cf",
          width: 100,
          sortable: true
        },
        {
          title: "销售额",
          key: "trd_amout",
          width: 100,
          sortable: true
        },
        {
          title: "交易笔数",
          key: " trd_bills",
          width: 100,
          sortable: true
        },
        {
          title: "发券量",
          key: "cpn_put_count",
          width: 100,
          sortable: true
        },
        {
          title: "UV数",
          key: "activity_uv",
          width: 100,
          sortable: true
        },
        {
          title: "PV数",
          key: "activity_pv",
          width: 100,
          sortable: true
				},
				{
          title: "参与会员数",
          key: "cpn_get_members",
          width: 100,
          sortable: true
        },{
          title: "会员占比",
          key: "members_rate",
          width: 100,
          sortable: true
        },{
          title: "新增会员数",
          key: "mbr_reg_count",
          width: 100,
          sortable: true
        },{
          title: "领券量",
          key: "cpn_get_count",
          width: 100,
          sortable: true
        },{
          title: "领券人数",
          key: "cpn_get_persons",
          width: 100,
          sortable: true
        },{
          title: "核销量",
          key: "cpn_chk_count",
          width: 100,
          sortable: true
        },{
          title: "核销人数",
          key: "cpn_chk_persons",
          width: 100,
          sortable: true
        }
			],
			curPageT1: 1,
			curPageT2: 1,
			pageT1List: [],
			dataT1: [],
			pageT2List: [],
      dataT2: []
    };
	},
	computed: {
    ...mapState({
      searchParam: state => state.BI.searchParam
    })
  },
  watch: {
    chartData: "drawChart",
  },
  // watch: {
  //   searchParam: {
  //     handler: function(val) {
  //       console.log('watch',val)
  //       this.init(val);
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  methods: {
    changePageT1(page) {
			this.pageT1List.splice(0, this.pageT1List.length); 
			this.pageT1List = this.dataT1.slice((page - 1) * 10,page * 10);
		},
		handleSortT1(column) {
			this.dataT1 = sort(this.dataT1, column.key, column.order)
			this.pageT1List = this.dataT1.slice(0, 10);
			this.curPageT1 = 1;
		},
		changePageT2(page) {
			this.pageT2List.splice(0, this.pageT2List.length); 
			this.pageT2List = this.dataT2.slice((page - 1) * 10,page * 10);
		},
		handleSortT2(column) {
      let total = this.dataT2.pop();
      this.dataT2 = sort(this.dataT2, column.key, column.order)
      this.dataT2.push(total)
			this.pageT2List = this.dataT2.slice(0, 10);
			this.curPageT2 = 1;
		},
		async init (param) {
			let _this = this
			this.$api.getActivityT1(param).then(res => {
				_this.dataT1 = res
				_this.pageT1List = this.dataT1.slice(0, 10);
			});
			this.$api.getActivityT2(param).then(res => {
        res.forEach(item => {
          if (!item.stat_ymd && item.explain == '合计') {
            item.stat_ymd = item.explain
          }
        })
				_this.dataT2 = res
				_this.pageT2List = this.dataT2.slice(0, 10);
			});
			this.$api.getActivityChart(param).then(res => {
        _this.chartData = res
			});
    },
    drawChart() {
      let _this = this
      if (!_this.chartData) return;
      let overviewChart = this.$echarts.init(
        document.getElementById("activity_chart")
      );

      let colors = ["#396FFF", "#E4007F", "#90C31F", "#FABE00", "#CCCCCC"];
      let itemColors = {
        holiday: "#396FFF",
        activity: "#F5A623",
        zhoumo: "#ccc"
      };
      let json = {
        '视频客流量': "video_cf",
        'WIFI客流量': "wifi_cf",
        '活动UV': "activity_uv",
        '活动PV': "activity_pv",
        '会员数': "mbr_reg_count",
        '新增会员数': "mbr_reg_count_acc",
        '领取人数': "cpn_get_persons",
        '领券量': "cpn_get_count",
        '核销量': "cpn_chk_count",
        '核销人数': "cpn_chk_persons",
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
            axisLabel: {
              formatter: (value) => {
                return dayjs(value).format('MM.DD')
              }
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
        //     name: '数量',
        //     min: 1000,
        //     // max: 250,
        //     position: 'right',
        //     axisLine: {
        //         lineStyle: {
        //             color: '#999'
        //         }
        //     },
        //     // axisLabel: {
        //     //     formatter: '{value} ml'
        //     // }
        // },
        // {
        //     type: 'value',
        //     name: '数量',
        //     min: 0,
        //     max: 1000,
        //     position: 'left',
        //     axisLine: {
        //         lineStyle: {
        //             color: '#999'
        //         }
        //     },
        //     // axisLabel: {
        //     //     formatter: '{value} °C'
        //     // }
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
        let data = _this.chartData.map(item => item.stat_ymd);
        data.push(
          dayjs(data[data.length - 1])
            .add(1, "day")
            .format("YYYY-MM-DD")
        );
        return data;
      })();

      options.xAxis[0].data.sort(function(a, b) {
        return  new Date(a) - new Date(b)
      })

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
  },
  created() {
    this.init(this.searchParam)
		eventBus.$on('updateSearchParam_activity', data => {
      console.log(2)
      this.init(data)
    })
  },
  beforeDestroy() {
    eventBus.$off('updateSearchParam_activity')
  },
};
</script>
<style lang="scss">
.ivu-tabs {
  margin-top: 1rem;
}

</style>
