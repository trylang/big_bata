<template>
  <div id="table_container">
    <div class="table_title"><span>活动详情</span></div>
    <Icon class="export" type="md-download" />
    <Table  border :columns="columns" :data="data"></Table>
    <div class="table_page">
      <div class="table_page_l">
          <p>共 <span>20</span> 条数据</p>
          <!-- <div class="drop_down">10</div> -->
          <!-- <Icon class="drop_arrows" type="ios-arrow-down" /> -->
      </div>
      <div class="table_page_r">
        <Page :total="100" show-elevator  @on-chang="changePage"/>
      </div>
    </div>

    <div>
      <div class="table_title"><span>数据展示</span></div>
      <ve-histogram :data="chartData" :extend="extend" :settings="chartSettings"></ve-histogram>
    </div>

      <div>
        <div class="table_title_m"><span>数据详情</span></div>
        <Icon class="export_m" type="md-download" />
        <Tabs value="name1">
          <TabPane label="全部" name="name1">
            <Table  border :columns="columns" :data="data"></Table>
            <div class="table_page">
              <div class="table_page_l">
                <p>共 <span>20</span> 条数据</p>
                <!-- <div class="drop_down">10</div> -->
                <!-- <Icon class="drop_arrows" type="ios-arrow-down" /> -->
              </div>
              <div class="table_page_r">
                <Page :total="100" show-elevator  @on-chang="changePage"/>
              </div>
            </div>
          </TabPane>
          <TabPane label="五一活动" name="name2">五一活动</TabPane>
          <TabPane label="端午活动" name="name3">端午活动</TabPane>
          <TabPane label="店庆活动" name="name3">店庆活动</TabPane>
          <TabPane label="双11" name="name3">双11</TabPane>
        </Tabs>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      showLine: ["下单用户"]
    };
    this.extend = {
      series: {
        label: { show: true, position: "top" }
      }
    };
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
  methods: {
    changePage(page) {
      console.log(page);
    }
  }
};
</script>
<style lang="scss">
.export_m {
  position: relative;
  top: 30px;
  left: 1090px;
}
</style>
