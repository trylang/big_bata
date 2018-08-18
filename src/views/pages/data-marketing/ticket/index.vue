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
                    <span v-for="(item, index) in btnList" :key="index" :class="[`tiket_btn${index+1}`, toggleName == item.type ? 'active' : '']" @click="handleChange(item.type)">{{item.title}}</span>
                </p>
            </div>
            <Row :gutter="16" style="width:100%;margin-top:1rem;">
                <Col span="8" v-for="(top, index) in top2Tail10" :key="index">
                  <ticketsTop :title="top.title" :progress="top.list"></ticketsTop>
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
      toggleName: "this_week",
      btnList: [
        {
          title: "当周",
          type: "this_week"
        },
        {
          title: "上周",
          type: "last_week"
        },
        {
          title: "当月",
          type: "this_month"
        },
        {
          title: "上月",
          type: "last_month"
        }
      ],
      conponEffect: {
        list: [],
        pageList: [],
        columns: (() => {
          let res = JSON.parse(window.sessionStorage.getItem("coupon"));
          let columns = [];
          res.forEach((item, index) => {
            columns.push({
              title: item.dim_name,
              key: item.dim_id,
              fixed: index === 0 ? "left" : "",
              width: 120,
              sortable: index > 7 ? "custom" : ""
            });
          });
          return columns;
        })(),
        curPage: 1
      },
      bizcatList: [],
      couponList: [],
      couponObj: {
        cpn_get_count: {}
      },
      top2Tail10: [
        {
          title: "券PV",
          type: "top10_pv",
          list: []
        },
        {
          title: "券领取",
          type: "top10_get",
          list: []
        },
        {
          title: "券核销",
          type: "top10_chk",
          list: []
        },
        {
          title: "券PV",
          type: "tail10_pv",
          list: []
        },
        {
          title: "券领取",
          type: "tail10_get",
          list: []
        },
        {
          title: "券核销",
          type: "tail10_chk",
          list: []
        }
      ],
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
      columns: [],
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
    handleChange(type) {
      let _this = this;
      this.toggleName = type; //last_month
      this.top2Tail10.forEach(item => {
        item.list = _this.couponObj[item.type].filter(item => {
          return item.stat_date === type
        });
      });
      console.log(this.top2Tail10)
    },
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
        res.forEach((item, index) => {
          if (!item.pv && item.explain == "合计") {
            item.pv = item.explain;
          }
        });
        this.conponEffect.list = res;
        this.conponEffect.pageList = res.slice(0, 10);
      });
      this.$api.getConponChk(param).then(res => {
        // console.log(res);
      });
    }
  },
  async created() {
    this.$api.getConponBizcat().then(res => {
      this.bizcatList = res;
    });
    let $api = this.$api;
    let current_date = "2018-08-17";
    let [pvList, getList, chkList] = await Promise.all([
      $api.getConponTop10({ current_date, target: "pv" }),
      $api.getConponTop10({ current_date, target: "cpn_get_count" }),
      $api.getConponTop10({ current_date, target: "cpn_chk_count" })
    ]);

    this.couponObj = {
      top10_pv: pvList.dataList.filter(item => {
        return item.stat_order === "z->a";
      }),
      tail10_pv: pvList.dataList.filter(item => {
        return item.stat_order === "a->z";
      }),
      top10_get: getList.dataList.filter(item => {
        return item.stat_order === "z->a";
      }),
      tail10_get: getList.dataList.filter(item => {
        return item.stat_order === "a->z";
      }),
      top10_chk: chkList.dataList.filter(item => {
        return item.stat_order === "z->a";
      }),
      tail10_chk: chkList.dataList.filter(item => {
        return item.stat_order === "a->z";
      })
    };
    this.handleChange(this.toggleName);
    this.init();
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
  cursor: pointer;
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
  .tiket_btn4 {
    border-radius: 0 12px 12px 0;
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
