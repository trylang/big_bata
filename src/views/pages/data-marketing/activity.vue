<template>
  <div id="table_container">
    <!-- 活动详情 -->
    <div class="table_title">
      <span class="table_title_s">活动详情</span>
      <download title="活动详情" name="activity1"></download>
    </div>
    <i-Table width="100%" :columns="columnsT1" @on-sort-change="handleSortT1" :data="pageT1List"></i-Table>
    <div class="table_page">
      <div class="table_page_l">
        <p>共
          <span>{{dataT1.total>0?dataT1.total:0}}</span> 条数据</p>
      </div>
      <div class="table_page_r">
        <Page :total="dataT1.length" :current.sync="curPageT1" :page-size="10" show-elevator @on-change="changePageT1" />
      </div>
    </div>
    <!-- 数据展示 -->
    <div style="margin-top:48px;">
      <div class="table_title">
        <span class="table_title_s">数据展示</span>
      </div>
      <div id="activity_chart" :style="{width: '100%', height: '500px'}"></div>
    </div>
    <!-- 日活动效果数据 -->
    <div style="margin-top:20px;">
      <div class="table_title">
        <span class="table_title_s">日活动效果数据</span>
        <download title="日活动效果数据" name="activity2"></download>
      </div>
      <i-Table width="100%" :row-class-name="rowClassName" :columns="columnsT2" :data="pageT2List" @on-sort-change="handleSortT2"></i-Table>
      <div class="table_page">
        <div class="table_page_l">
          <p>共
            <span>{{dataT2.total>0?dataT2.total-1:0}}</span> 条数据</p>
        </div>
        <div class="table_page_r">
          <Page :total="dataT2.length" :current.sync="curPageT2" :page-size="10" show-elevator @on-change="changePageT2" />
        </div>
      </div>
    </div>
    <!-- 活动传播渠道分布 -->
    <div style="margin-top:48px;">
      <div class="table_title">
        <span class="table_title_s">活动传播渠道分布</span>
      </div>
      <Row>
          <Col span="12">
            <div id="container" :style="{height: '320px'}">{{noData}}
            </div>
          </Col>
          <Col span="12">
            <i-Table width="100%" :columns="columns4" :data="dataT4"></i-Table>
          </Col>
      </Row>
    </div>
    <!-- 活动页面漏斗转化 -->
    <div style="margin-top:48px;">
      <div class="table_title">
        <span class="table_title_s">活动页面漏斗转化</span>
        <download title="活动页面漏斗转化" name="activityPage"></download>
      </div>
      <i-Table width="100%" :columns="columnsT3" @on-sort-change="handleSortT3" :data="pageT3List"></i-Table>
      <div class="table_page">
        <div class="table_page_l">
          <p>共
            <span>{{dataT3.total>0?dataT3.total:0}}</span> 条数据</p>
        </div>
        <div class="table_page_r">
          <Page :total="dataT3.length" :current.sync="curPageT3" :page-size="10" show-elevator @on-change="changePageT3" />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import download from "@/components/download.vue";
import { mapState } from "vuex";
import { setOptions } from "@/utils/chart.js";
import dayjs from "dayjs";
import { sort } from "@/utils/filter.js";

export default {
  components: {
    download
  },
  data() {
    let activityL1 = this.$store.state.BI.activityL1;
    let activityL2 = this.$store.state.BI.activityL2;
    let activityL3 = this.$store.state.BI.activityL3;
    let activity = this.$store.state.BI.activity;
    return {
      market_id: this.$route.query.market_id || 12555,
      chartData: {},
      curPageT1: 1,
      curPageT2: 1,
      curPageT3: 1,
      pageT1List: [],
      dataT1: [],
      pageT2List: [],
      pageT3List: [],
      pageT4List: [],
      dataT2: [],
      dataT3: [],
      channelData: [],
      dataT4: [],
      totalT2: {},
      totalT3: {},
      noData:'',
      columnsT3: [
          {
              title: 'ID',
              align: 'center',
              key: 'activity_id'
          },
          {
              title: '活动名称',
              align: 'center',
              key: 'activity_name'
          },
          {
              title: '活动时间',
              sortable: "custom",
              align: 'center',
              key: 'period_time',
              width:180
          },
          {
              title: '浏览数',
              sortable: "custom",
              align: 'right',
              key: 'visit_count'
          },
          {
              title: '转发数',
              sortable: "custom",
              align: 'right',
              key: 'reblog_count'
          },
          {
              title: '转发率',
              sortable: "custom",
              align: 'right',
              key: 'reblog_count_ratio'
          },
          {
              title: '分享数',
              sortable: "custom",
              align: 'right',
              key: 'share_count'
          },
          {
              title: '分享率',
              sortable: "custom",
              align: 'right',
              key: 'share_count_ratio'
          }
      ],
      columns4: [
          {
              title: '传播渠道',
              key: 'chnl_name'
          },
          {
              title: '传播次数',
              align: 'right',
              key: 'reblog_count'
          },
          {
              title: '占比',
              align: 'right',
              key: 'ratio1'
          }
      ]
    };
  },
  computed: {
    ...mapState({
      searchParam: state => state.BI.searchParam
    }),
    columnsT1: function() {
      let activityL1 = this.$store.state.BI.activityL1;
      let activity = this.$store.state.BI.activity;
      let res = [];
      res =
        activity && activity.length >= 0
          ? activity.filter(item => item.dim_grp === "sale.activity.1")
          : activityL1;
      if (!res) return [];
      let data = res.filter(item => {
        return item.dim_val ? item.dim_val === "T" : item.default_val === "T";
      });
      let columns = [];
      sort(data, "disp_order", "asc").forEach((item, index) => {
        columns.push({
          title: item.dim_id == "gross_cost" ? item.dim_name + '（元）' : item.dim_name,
          key: item.dim_id,
          width: index === 1 || index === 5 ? 165 : "",
          align: index === 0 || index === 1 ? "left" : "right",
          sortable: index > 2 ? "custom" : ""
        });
      });
      return columns;
    },
    columnsT2: function() {
      let activityL2 = this.$store.state.BI.activityL2;
      let activity = this.$store.state.BI.activity;
      let res = [];
      res =
        activity && activity.length >= 0
          ? activity.filter(item => item.dim_grp === "sale.activity.2")
          : activityL2;
      if (!res) return [];
      let data = res.filter(item => {
        return item.dim_val ? item.dim_val === "T" : item.default_val === "T";
      });
      let columns = [];
      sort(data, "disp_order", "asc").forEach((item, index) => {
        columns.push({
          title: item.dim_id == "trd_amout" ? item.dim_name + '（元）' : item.dim_name,
          key: item.dim_id,
          fixed: index === 0 ? "left" : "",
          className: index === 0 ? "demo-table-info-column" : "",
          align: index === 0 || index === 1 || index === 2 ? "center" : "right",
          width: index === 0 ? 160 : 140,
          sortable: index > 2 ? "custom" : ""
        });
      });
      return columns;
    }
  },
  watch: {
    chartData: "drawChart",
    channelData: "typePie"
  },
  methods: {
    rowClassName(row, index) {
      if (index === 10) {
        return 'demo-table-info-row';
      }
      return '';
    },
    changePageT1(page) {
      this.pageT1List.splice(0, this.pageT1List.length);
      this.pageT1List = this.dataT1.slice((page - 1) * 10, page * 10);
    },
    handleSortT1(column) {
      if (this.dataT1.every(item => item[column.key] === 0)) return;
      this.dataT1 = sort(this.dataT1, column.key, column.order);
      this.pageT1List = this.dataT1.slice(0, 10);
      this.curPageT1 = 1;
    },
    changePageT2(page) {
      this.pageT2List.splice(0, this.pageT2List.length - 1);
      this.pageT2List = this.dataT2.slice((page - 1) * 10, page * 10);
      this.pageT2List.push(this.totalT2);
    },
    handleSortT2(column) {
      if (this.dataT2.every(item => item[column.key] === 0)) return;
      this.dataT2 = sort(this.dataT2, column.key, column.order);
      this.pageT2List = this.dataT2.slice(0, 10);
      this.pageT2List.push(this.totalT2);
      this.curPageT2 = 1;
    },
    changePageT3(page) {
      this.pageT3List.splice(0, this.pageT3List.length - 1);
      this.pageT3List = this.dataT3.slice((page - 1) * 10, page * 10);
    },
    handleSortT3(column) {
      if (this.dataT3.every(item => item[column.key] === 0)) return;
      this.dataT3 = sort(this.dataT3, column.key, column.order);
      this.pageT3List = this.dataT3.slice(0, 10);
      this.curPageT3 = 1;
    },
    async init(param) {
      let _this = this;
      this.$api.getActivityT1({market_id: this.market_id, ...param}).then(res => {
        res.forEach(item => {
          if (typeof (item.daily_trd_new) == "number") {
            item.daily_trd_new = item.daily_trd_new.toFixed(2);
          }
          if (typeof (item.roi) == "number") {
            item.roi = item.roi.toFixed(2);
          }
          for (let key in item) {
            if (!item[key] && item[key] != 0) item[key] = "--";
          }
        });
        res.forEach(item => {
          let date = item.period_dur_name.split("~");
          date[1] = date[1] ? date[1] : "至今";
          item.period_dur_name = date.join("~");
        });
        _this.dataT1 = res;
        _this.curPageT1 = 1;
        _this.pageT1List = this.dataT1.slice(0, 10);
      });
      this.$api.getActivityT2({market_id: this.market_id, ...param}).then(res => {
        if (res.length == 0) {
          _this.dataT2 = res;
          _this.pageT2List = res;
          return;
        }
        res.forEach(item => {
          item.trd_amout = item.trd_amout.toFixed(2);
          item.members_rate = (item.members_rate * 100).toFixed(2) + '%';
          if (!item.stat_ymd && item.explain == "合计") {
            item.stat_ymd = item.explain;
          }
          for (let key in item) {
            if (!item[key] && item[key] != 0) item[key] = "--";
          }
        });
        _this.dataT2 = res;
        _this.curPageT2 = 1;
        this.totalT2 = this.dataT2.pop();
        _this.pageT2List = this.dataT2.slice(0, 10);
        _this.pageT2List.push(this.totalT2);
      });
      this.$api.getWeather({sno: "430100", period_start_time: param.start_date
      , period_end_time: param.end_date}).then(weather => {
        this.$api.getActivityChart({market_id: this.market_id, ...param}).then(res => {
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
          _this.chartData = res;
        });
      });
      //活动转发渠道分布
      this.$api.actChnlReblog({market_id: this.market_id, ...param}).then(res => {
        let _this = this;
        _this.channelData = [];
        res.forEach(item => {
           item.ratio1 = (item.ratio * 100).toFixed(2) + '%';
          _this.channelData.push({
            name: item.chnl_name,
            value: item.ratio
          })
        });
        _this.dataT4 = res;

      });

      //活动页面漏斗转化
      this.$api.actPage({market_id: this.market_id, ...param}).then(res => {
        let _this = this;
        res.forEach(item => {
           item.reblog_count_ratio = (item.reblog_count_ratio * 100).toFixed(2) + '%';
           item.share_count_ratio = (item.share_count_ratio * 100).toFixed(2) + '%';
        });
        _this.dataT3 = res;
        _this.curPageT3 = 1;
        _this.pageT3List = this.dataT3.slice(0, 10);
      });

      //活动页面漏斗转化下载
      

    },  
    drawChart(legendSel) {
      let _this = this;
      if (!_this.chartData) return;
      let overviewChart = this.$echarts.init(
        document.getElementById("activity_chart")
      );

      let json = (function (res) {
        if (!res) return [];
        let obj = {};
        let data = res.filter(item => {
          return item.dim_val ? item.dim_val === "T" : item.default_val === "T";
        });
        data.forEach(item => {
          obj[item.dim_name] = item.dim_id;
        })
        return obj;
      })(this.$store.state.BI.activityL1);

      let options = setOptions('activity', {chart_data: _this.chartData, json, legendSel});
      // 绘制图表
      overviewChart.setOption(options);
      overviewChart.on("legendselectchanged", function (obj) {
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
    typePie:function(){
      var dom = document.getElementById("container");
      var myChart = echarts.init(dom);
      var app = {};
      var option = null;
      let color = [
        "#396FFF",
        "#62A1FF",
        "#4ED4FF",
        "#6FFAFF",
        "#1F7EBF",
        "#7693FF",
        "#FF6EBF",
        "#E4007F"
      ];
      option = {
        color,
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
        {
            name: "",
            type: "pie",
            radius: "55%",
            center: ['40%', '45%'],
            data: this.channelData,
            label: {
              normal: {
                show: true,
                color: "#666",
                formatter: "{b}" + "\n\r" + "{d}%"
              }
            },
            labelLine: {
              lineStyle: {
                color: "#ccc"
              }
            }
          }
        ]
      };

      if (option && typeof option === "object") {
          myChart.setOption(option, true);
      }
    }             
  },
  created() {
    this.init(this.$store.state.BI.searchParam);
    eventBus.$on("updateSearchParam_activity", data => {
      this.init(data);
    });
  },
  beforeDestroy() {
    eventBus.$off("updateSearchParam_activity");
  }
};
</script>
<style lang="scss" scoped>
</style>
