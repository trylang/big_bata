<template>
  <div id="activity_container">
      <div class="activity_title"><span>数据详情</span></div>
      <div class="icon-xiala"></div>
      <div class="activity_line"></div>
      <!-- Table表格 -->
      <i-Table  border :columns="columns" :data="data"></i-Table>
      <!-- Table分页 -->
      <div class="activity_page">
          <div class="activity_page_l">
              <p>共 <span>20</span> 条数据，每页显示</p>
              <div class="drop_down">10</div>
              <div class="drop_arrows">∨</div>
          </div>
          <div class="activity_page_r">
            <Page :total="100" show-elevator  @on-chang="changePage"/>
            </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '活动时间',
          key: 'time'
        },
        {
          title: '历时天数',
          key: 'data'
        },
        {
          title: '获取会员数',
          key: 'quantity',
          sortable: true
        },
        {
          title: '参与商户数',
          key: 'contact',
          sortable: true
        },
        {
          title: '活动总成本',
          key: 'total',
          sortable: true
        },
        {
          title: '日均拉新',
          key: 'average',
          sortable: true
        },
        {
          title: '日均销售',
          key: 'sales',
          sortable: true
        },
        {
          title: 'ROI',
          key: 'roi',
          sortable: true
        }
      ],
      data: [
        {
          name: '五一活动',
          time: '2018.05.01',
          data: 3,
          quantity: 45375,
          contact: 1294,
          total: 192394,
          average: 12464,
          sales: 364586,
          roi: 364586
        },
        {
          name: '端午节',
          time: '2018.05.01',
          data: 2,
          quantity: 83284,
          contact: 1294,
          total: 192394,
          average: 12464,
          sales: 364586,
          roi: 364586
        },
        {
          name: '周年庆',
          time: '2018.05.01',
          data: 7,
          quantity: 182385,
          contact: 1294,
          total: 192394,
          average: 12464,
          sales: 364586,
          roi: 364586
        },
        {
          name: '双11',
          time: '2018.05.01',
          data: 5,
          quantity: 293495,
          contact: 1294,
          total: 192394,
          average: 12464,
          sales: 364586,
          roi: 364586
        }
      ]
    }
  },
  methods: {
    changePage (page) {
      console.log(page)
    }
  }
}
</script>
<style lang="scss">
#activity_container {
  position: relative;
  .activity_title {
    width: 56px;
    height: 14px;
    line-height: 14px;
    span {
      font-size: 14px;
      color: rgba(42, 57, 98, 1);
      font-family: MicrosoftYaHei;
    }
  }
  .icon-xiala {
    position: absolute;
    top: 10px;
    left: 1075px;
  }
  .activity_line {
    width: 1085px;
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
  .ivu-table-cell span {
    height: 12px;
    font-size: 12px;
    font-family: MicrosoftYaHei-Bold;
    color: rgba(102, 102, 102, 1);
    line-height: 12px;
  }
  .activity_page {
    margin-top: 20px;
    overflow: hidden;
    .activity_page_l {
      float: left;
      p {
        float: left;
        width: 130px;
        height: 12px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(153, 153, 153, 1);
        line-height: 12px;
        margin-top: 9px;
        span {
          font-weight: bold;
        }
      }
      .drop_down {
        float: left;
        width: 40px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        margin-left: 8px;
        margin-top: 4px;
        border-radius: 2px 0px 0px 2px;
        border: 1px solid rgba(242, 242, 242, 1);
      }
      .drop_arrows {
        float: left;
        width: 24px;
        height: 24px;
        line-height: 24px;
        margin-top: 4px;
        text-align: center;
        border-radius: 0px 2px 2px 0px;
        border: 1px solid rgba(242, 242, 242, 1);
      }
    }
    .activity_page_r {
      float: right;
      .ivu-page {
        float: left;
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
