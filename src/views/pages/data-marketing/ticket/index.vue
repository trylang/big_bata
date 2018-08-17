<template>
    <div id="table_container">
        <div class="table_title">
            <span>券数据详情</span>
        </div>
        <Input suffix="ios-search" placeholder="请输入券名称" style="width: auto"/>
        <!-- Table表格 -->
        <i-Table border :columns="conponEffect.columns"  @on-sort-change="effectHandleSort" :data="conponEffect.pageList"></i-Table>
        <div class="table_page">
            <div class="table_page_l">
                <p>共 <span>{{conponEffect.list.length}}</span> 条数据</p> 
            </div>
            <div class="table_page_r">
                <Page :total="conponEffect.list.length" :current.sync="conponEffect.curPage" :page-size="10" show-elevator @on-change="effectChangePage"/>
            </div>
        </div>
        <div>
            <div class="table_title_m">
                <span class="table_sp">券核销记录</span>
            </div>
            <Tabs value="name1">
                <TabPane v-for="(item, index) in bizcatList" :key="index" :label="item.shop_bizcat" :name="item.shop_bizcat">
                  
                </TabPane>
                <!-- <TabPane label="全部" name="name1">
                    <i-Table :columns="columns" :data="data"></i-Table>
                    <div class="table_page">
                        <div class="table_page_l">
                            <p>共 <span>20</span> 条数据</p>                           
                        </div>
                        <div class="table_page_r">
                            <Page :total="100" show-elevator @on-chang="changePage"/>
                        </div>
                    </div>
                </TabPane>
                <TabPane label="五一活动" name="name2">五一活动</TabPane>
                <TabPane label="端午活动" name="name3">端午活动</TabPane>
                <TabPane label="店庆活动" name="name3">店庆活动</TabPane>
                <TabPane label="双11" name="name3">双11</TabPane> -->
            </Tabs>
        </div>
        <div>
            <div class="table_title_m"><span class="table_sp">券排名</span>
                <p class="tiket_btn">
                    <span class="tiket_btn1 active">当周</span>
                    <span class="tiket_btn2">上周</span>
                    <span class="tiket_btn3">当月</span>
                    <span class="tiket_btn4">上月</span>
                </p>
            </div>
            <Row :gutter="16" style="width:100%;margin-top:1rem;">
                <Col span="8">
                <ticketsTop :progressList="progressList"></ticketsTop>
                </Col>
                <Col span="8">
                <ticketsTop :progressList="progressList"></ticketsTop>
                </Col>
                <Col span="8">
                <ticketsTop :progressList="progressList"></ticketsTop>
                </Col>
            </Row>
        </div>

    </div>
</template>
<script>
import ticketsTop from "./ticketsTop";

export default {
  components: {
    ticketsTop
  },
  data() {
    return {
      conponEffect: {
        list: [],
        pageList: [],
        columns: [{
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
        }],
        curPage: 1
      },
      bizcatList: [],
      progressList: [
        {
          name: "ZARA 100元代金券",
          value: 12343
        },
        {
          name: "优衣库 50元代金券",
          value: 43294
        },
        {
          name: "H&M 5折折扣券",
          value: 4361
        },
        {
          name: "星巴克 抹茶星冰乐试吃券",
          value: 9854
        },
        {
          name: "ADIDAS 8折折扣券",
          value: 56783
        },
        {
          name: "海底捞 满500元减100券",
          value: 21456
        }
      ],
      columns: [
        
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
    effectHandleSort(column) {
      this.conponEffect.list = sort(
        this.conponEffect.list,
        column.key,
        column.order
      );
      this.conponEffect.pageList = this.conponEffect.list.slice(0, 10);
      this.conponEffect.curPage = 1;
    },
    effectChangePage(page) {
      this.conponEffect.pageList.splice(0, this.conponEffect.pageList.length);
      this.conponEffect.pageList = this.conponEffect.list.slice(
        (page - 1) * 10,
        page * 10
      );
    },
    changePage(page) {
      console.log(page);
    },
    init(param) {
      this.$api.getConponEffect(param).then(res => {
        console.log(res);
        this.conponEffect.list = res;
      });
      this.$api.getConponChk(param).then(res => {
        console.log(res);
        this.conponEffect.list = res;
      });
    }
  },
  created() {
    let columns = window.sessionStorage.getItem('conpon')
    console.log(columns)
    // this.conponEffect.columns = 
    this.$api.getConponBizcat().then(res => {
      console.log(res);
      this.bizcatList = res;
    });

    this.$api.getConponTop10({current: Date.now(), target: 'cpn_get_count'}).then(res => {
      console.log(res);
      this.conponEffect.list = res;
    });
    this.init()
  }
};
</script>
<style lang="scss" scoped>
.ivu-input-wrapper {
  height: 32px;
  float: right;
  border: 1px solid #f2f2f2;
  border-radius: 16px;
  margin: -3.5rem 2rem 0 0;
}

.table_title_m {
  width: 100%;
  height: 35px;
  line-height: 35px;
  .table_sp {
    height: 19px;
    line-height: 19px;
    font-size: 14px;
    color: #2a3962;
    font-family: MicrosoftYaHei;
  }
}

.tiket_btn {
  float: right;
  width: 226px;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  border: 1px solid rgba(42, 57, 98, 1);
  margin-top: 0.4rem;
  .active {
    background: #2a3962;
    color: rgba(255, 255, 255, 1);
  }
  span {
    display: inline-block;
    width: 56px;
    height: 23px;
    line-height: 24px;
    text-align: center;
  }
  .tiket_btn1 {
    border-right: 1px solid rgba(42, 57, 98, 1);
    // background: #2a3962;
    border-radius: 12px 0px 0px 12px;
    opacity: 0.8;
    // color: rgba(255, 255, 255, 1);
  }
  .tiket_btn2,
  .tiket_btn3 {
    border-right: 1px solid rgba(42, 57, 98, 1);
  }
}

.export_m {
  cursor: pointer;
  font-size: 24px;
  color: #396fff;
  float: right;
  margin-top: -3rem;
}
</style>
