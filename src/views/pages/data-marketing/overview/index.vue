<template>
  <div id="table_container">
      <div class="table_title"><span>数据详情</span></div>
      <Icon class="export" type="md-download" />
      <!-- Table表格 -->
      <i-Table border :columns="columns" :data="data"></i-Table>
      <!-- Table分页 -->
      <div style="padding-right: 1rem; padding-top: 1rem;">
        <div class="table_title"><span>数据展示</span></div>
        <ve-line :data="chartData"></ve-line>
      </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      columns: [
        {
          title: " ",
          key: "title",
          className: 'demo-table-info-column'
        },
        {
          title: "视频客流量",
          key: "name"
        },
        {
          title: "WI-FI客流量",
          key: "time"
        },
        {
          title: "活动UV",
          key: "data"
        },
        {
          title: "活动Pv",
          key: "quantity",
          sortable: true
        },
        {
          title: "会员数",
          key: "contact",
          sortable: true
        },
        {
          title: "新增会员数",
          key: "total",
          sortable: true
        },
        {
          title: "领券量",
          key: "average",
          sortable: true
        },
        {
          title: "领取人数",
          key: "sales",
          sortable: true
        },
        {
          title: "核销量",
          key: "roi",
          sortable: true
        },
        {
          title: "核销人数",
          key: "roi",
          sortable: true
        }
      ],
      data: [
        {
          title: '当天累计',
          name: "五一活动",
          time: "2018.05.01",
          data: 3,
          quantity: 45375,
          contact: 1294,
          total: 192394,
          average: 12464,
          sales: 364586,
          roi: 364586
        },
        {
          title: '当周累计',
          name: "端午节",
          time: "2018.05.01",
          data: 2,
          quantity: 83284,
          contact: 1294,
          total: 192394,
          average: 12464,
          sales: 364586,
          roi: 364586
        },
        {
          title: '当月累计',
          name: "周年庆",
          time: "2018.05.01",
          data: 7,
          quantity: 182385,
          contact: 1294,
          total: 192394,
          average: 12464,
          sales: 364586,
          roi: 364586
        }
      ]
    };
  },
  computed: {
    ...mapState({
      searchParam: state => state.BI.searchParam
    })
  },
  created() {},
  methods: {
    changePage() {},
    haha() {
      console.log(this.searchParam);
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
