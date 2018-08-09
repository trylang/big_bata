<template>
  <div id="activity_container">
      <div class="activity_title"><span>数据详情</span></div>
      <ve-line :data="chartData"></ve-line>
      <div class="activity_line"></div>
      <!-- Table表格 -->
      <Table  border :columns="columns" :data="data"></Table>
      <!-- Table分页 -->
      <div class="activity_page">
          <div class="activity_page_l">
              <p>共 <span>20</span> 条数据，每页显示</p>
              <select>
                  <option>10</option>
                  <option>10</option>
                  <option>10</option>
                  <option>10</option>
              </select>
          </div>
          <div class="activity_page_r">
            <Page :total="100" show-elevator  />
            <input type="button" value="确定"></div>
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
          title: "活动名称",
          key: "name"
        },
        {
          title: "活动时间",
          key: "time"
        },
        {
          title: "历时天数",
          key: "data"
        },
        {
          title: "获取会员数",
          key: "quantity",
          sortable: true
        },
        {
          title: "参与商户数",
          key: "contact",
          sortable: true
        },
        {
          title: "活动总成本",
          key: "total",
          sortable: true
        },
        {
          title: "日均拉新",
          key: "average",
          sortable: true
        },
        {
          title: "日均销售",
          key: "sales",
          sortable: true
        },
        {
          title: "ROI",
          key: "roi",
          sortable: true
        }
      ],
      data: [
        {
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
          name: "周年庆",
          time: "2018.05.01",
          data: 7,
          quantity: 182385,
          contact: 1294,
          total: 192394,
          average: 12464,
          sales: 364586,
          roi: 364586
        },
        {
          name: "双11",
          time: "2018.05.01",
          data: 5,
          quantity: 293495,
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
    haha() {
      console.log(this.searchParam);
    }
  }
};
</script>
<style lang="scss">
.echarts {
  height: 300px;
}
#activity_container {
  .activity_title {
    width: 56px;
    height: 14px;
    line-height: 14px;
    margin-left: 25px;
    span {
      font-size: 14px;
      font-family: MicrosoftYaHei;
    }
  }
  .activity_line {
    width: 1175px;
    height: 1px;
    margin-top: 20px;
    background: rgba(242, 242, 242, 1);
  }
  .ivu-table-wrapper {
    margin-top: 10px;
    border-left: 0;
  }
  .ivu-table-border td,
  .ivu-table-border th {
    border-right: 0;
  }
  .ivu-table:after {
    background-color: #fff;
  }
  .activity_page {
    margin-top: 20px;
    overflow: hidden;
    .activity_page_l {
      float: left;
      p {
        float: left;
        span {
          font-weight: bold;
        }
      }
      select {
        float: left;
        margin-left: 5px;
        border-radius: 2px 0px 0px 2px;
      }
    }
    .activity_page_r {
      float: right;
      .ivu-page {
        float: left;
        margin-right: 10px;
      }
      input {
        width: 56px;
        height: 24px;
        border-radius: 2px;
        border: 1px solid rgba(242, 242, 242, 1);
      }
      .ivu-page-item-active {
        border-color: #fff;
        background-color: #396fff;
      }
      .ivu-page-item {
        border: 0;
      }
      .ivu-page-item-active a,
      .ivu-page-item-active:hover a {
        color: #fff;
      }
    }
  }
}
</style>
