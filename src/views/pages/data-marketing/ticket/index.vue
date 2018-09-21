<template>
  <div id="table_container">
    <div class="table_title">
      <span class="table_title_s">券数据详情</span>
      <download title="券数据详情" name="conponeffect"></download>
    </div>
    <Input icon="ios-search" placeholder="请输入券名称" style="width: auto" v-model="conponEffect.coupon_name" @on-enter="getConponEffect(conponEffect.coupon_name)" @on-click="getConponEffect(conponEffect.coupon_name)" />
    <!-- Table表格 -->
    <i-Table width="100%" border :row-class-name="rowClassName" :columns="conponEffectColumns" @on-sort-change="effectHandleSort" :data="conponEffect.pageList"></i-Table>
    <div class="table_page">
      <div class="table_page_l">
        <p>共
          <span>{{conponEffect.list.total>0?conponEffect.list.total-1:0}}</span> 条数据</p>
      </div>
      <div class="table_page_r">
        <Page :total="conponEffect.list.length" :current.sync="conponEffect.curPage" :page-size="10" show-elevator @on-change="effectChangePage" />
      </div>
    </div>
    <div>
      <div class="table_title_m">
        <span class="table_sp">券核销记录</span>
        <download title="券核销记录" name="conponchk" class="download_center"></download>
      </div>
      <Tabs v-model="filterParam.shop_bizcat" @on-click="toggleTab">
        <TabPane v-for="(item, index) in bizcatList" :key="index" :label="item.title" :name="item.shop_bizcat">
          <i-Table width="100%" :columns="conponChk.columns" :data="conponChk.list"></i-Table>
          <div class="table_page">
            <div class="table_page_l">
              <p>共
                <span>{{conponChk.list.total>0?conponChk.list.total:0}}</span> 条数据</p>
            </div>
            <div class="table_page_r">
              <Page :total="conponChk.list.total" :current.sync="conponChk.curPage" :page-size="10" show-elevator @on-change="conponChkChangePage" />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <div style="margin-top:48px;">
      <div class="table_title">
        <span class="table_title_m">核销时长分布</span>
      </div>
      <Row>
          <Col span="12">
            <div id="container" :style="{height: '350px'}">{{noData}}
            </div>
          </Col>
          <Col span="12">
            <i-Table width="100%" :columns="columns1" :data="data1" style="margin-top:30px"></i-Table>
          </Col>
      </Row>
    </div>
    <div>
      <div class="table_title_m">
        <span class="table_sp">券排名</span>
        <p class="tiket_btn">
          <span v-for="(item, index) in btnList" :key="index" :class="[`tiket_btn${index+1}`, toggleName == item.type ? 'active' : '']" @click="handleChange(item.type)">{{item.title}}</span>
        </p>
      </div>
      <Row :gutter="16" style="width:100%;margin-top:30px;margin-left:0;margin-right:0;">
        <i-Col span="8" v-for="(top, index) in top2Tail10" :key="index">
          <ticketsTop :title="top.title" :progress="top.list" :_index="index"></ticketsTop>
        </i-Col>
      </Row>
    </div>

  </div>
</template>
<script>
import ticketsTop from "./ticketsTop";
import { sort } from "@/utils/filter.js";
import download from "@/components/download.vue";
import {mapState} from 'vuex';

export default {
  components: {
    ticketsTop,
    download
  },
  data() {
    return {
      market_id: this.$route.query.market_id || 12555,
      toggleName: "this_week",
      filterParam: {},
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
        coupon_name: null,
        list: [],
        pageList: [],
        columns: (() => {
          let res = JSON.parse(window.sessionStorage.getItem("coupon"));
          if (!res) return [];
          let data = res.filter(item => {
            return item.dim_val
              ? item.dim_val === "T"
              : item.default_val === "T";
          });
          let columns = [];
          sort(data, "disp_order", "asc").forEach((item, index) => {
            columns.push({
              title: item.dim_name,
              key: item.dim_id,
              fixed: index === 0 ? "left" : "",
              sortable: index > 7 ? "custom" : ""
            });
          });
          return columns;
        })(),
        total: {},
        curPage: 1
      },
      conponChk: {
        list: [],
        pageList: [],
        columns: [
          {
            title: "券名称",
            fixed: "left",
            width: 160,
            key: "coupon_name",
            className: "demo-table-info-column"
          },
          {
            title: "券ID",
            width: 140,
            key: "coupon_id"
          },
          {
            title: "券类型",
            width: 140,
            key: "category_name"
          },
          {
            title: "发券主体",
            width: 140,
            key: "rectangleName"
          },
          {
            title: "商户名",
            width: 140,
            key: "shop_name"
          },
          {
            title: "楼层",
            width: 140,
            key: "shop_floor"
          },
          {
            title: "发券时间",
            width: 140,
            key: "put_date",
            width: 120
          },
          {
            title: "领取时间",
            key: "get_time",
            width: 160
          },
          {
            title: "核销时间",
            key: "chk_time",
            width: 160
          },
          {
            title: "核销时长",
            width: 140,
            key: "chk_dura"
          }
        ],
        curPage: 1
      },
      bizcatList: [],
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
      data1:[],
      noData:'',
      channelData: [],
      columns1: [
          {
              title: '核销时长',
              key: 'chk_dura'
          },
          {
              title: '核销次数',
              align: 'right',
              key: 'chk_count'
          },
          {
              title: '占比',
              align: 'right',
              key: 'ratio1'
          }
      ]
    };
  },
  watch: {
    channelData: "typePie"
  },
  methods: {
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
            tooltip: {
                trigger: 'item',
                formatter: "{b}:{d}%"
            },
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['55%', '80%'],
                    label: {
                        normal: {
                            formatter: '{b|{b}：}{d}%',
                            // backgroundColor: '#eee',
                            // borderColor: '#aaa',
                            // borderWidth: 1,
                            // borderRadius: 4,
                            // shadowBlur:3,
                            // shadowOffsetX: 2,
                            // shadowOffsetY: 2,
                            // shadowColor: '#999',
                            // padding: [0, 7],
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 12,
                                    lineHeight: 20
                                }
                            }
                        }
                    },
                    data:this.channelData
                }
            ]
        };

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }          
    },
    rowClassName(row, index) {
      if (index === 10) {
        return 'demo-table-info-row';
      }
      return '';
    },
    toggleTab(biacat) {
      this.biacat = biacat;
      this.getConponChk();
    },
    handleChange(type) {
      let _this = this;
      this.toggleName = type; //last_month
      this.top2Tail10.forEach(item => {
        item.list = _this.couponObj[item.type].filter(item => {
          return item.stat_date === type;
        });
      });
    },
    effectHandleSort(column) {
      if (this.conponEffect.list.every(item => item[column.key] === 0)) return;
      this.conponEffect.list = sort(
        this.conponEffect.list,
        column.key,
        column.order
      );
      this.conponEffect.pageList = this.conponEffect.list.slice(0, 10);
      this.conponEffect.pageList.push(this.conponEffect.total);
      this.conponEffect.curPage = 1;
    },
    effectChangePage(page) {
      this.conponEffect.pageList.splice(0, this.conponEffect.pageList.length -1);
      this.conponEffect.pageList = this.conponEffect.list.slice(
        (page - 1) * 10,
        page * 10
      );
      this.conponEffect.pageList.push(this.conponEffect.total);
    },
    conponChkChangePage(page) {
      this.conponChk.curPage = page;
      this.getConponChk();
    },
    getConponChk(biacat) {
      let param = Object.assign({}, this.filterParam);
      param.shop_bizcat = this.filterParam.shop_bizcat === "全部" ? null : (this.biacat ? this.biacat: null);
      param.pageSize = 10;
      param.pageIndex = (this.conponChk.curPage - 1) * param.pageSize;
      this.$api.getConponChk({market_id: this.market_id, ...param}).then(res => {
        res.map(item => {
          item.rectangleName = item.rectangle == 2 ? "商户" : "商场";
          for (let key in item) {
            if (!item[key] && item[key] != 0) item[key] = "--";
          }
          return item;
        });
        this.conponChk.list = res;
      });
    },
    getConponEffect(name) {
      let param = Object.assign({}, this.filterParam);
      param.coupon_name =  name || null;
      this.$api.getConponEffect({market_id: this.market_id, ...param}).then(res => {
        res.forEach((item, index) => {
          item.get_count_rate = (item.get_count_rate * 100).toFixed(2) + '%';
          item.chk_count_rate = (item.chk_count_rate * 100).toFixed(2) + '%';
          if (index === res.length - 1 && item.coupon_name == "[合计]") {
            item.coupon_name = "合计";
          }
          for (let key in item) {
            if (!item[key] && item[key] != 0) item[key] = "--";
          }
        });
        this.conponEffect.list = res;
        this.conponEffect.total = res.pop();
        this.conponEffect.pageList = this.conponEffect.list.slice(0, 10);
        this.conponEffect.pageList.push(this.conponEffect.total);
        this.conponEffect.curPage = 1;
      });
    },
    getList(param) {
      this.$api.chkDura(param).then(res => {
        //console.log(res);
        let _this = this;
        _this.channelData = [];
        res.forEach(item => {
           item.ratio1 = (item.chk_ratio * 100).toFixed(2) + '%';
          _this.channelData.push({
            name: item.chk_dura,
            value: item.chk_ratio
          })
        });
        _this.data1 = res;
      });
    },
    init(param) {
      this.conponChk.curPage = 1;
      this.$api.getConponBizcat({ market_id: this.market_id, ...this.filterParam }).then(res => {
        res.sort((obj1, obj2) => {
          return obj2.ratio - obj1.ratio
        });
        res.forEach(item => {
          item.title = `${item.shop_bizcat}（${(item.ratio !== 1 ? (item.ratio * 100).toFixed(2) : item.ratio * 100)}%）`;
        });
        this.bizcatList = res;
      });
      this.getList({ market_id: this.market_id, ...this.filterParam });
      this.getConponEffect();
      this.getConponChk();
    }
  },
  computed: {
    ...mapState({
      searchParam: state => state.BI.searchParam
    }),
    conponEffectColumns: function() {
      let res = this.$store.state.BI.coupon;
      if (!res) return [];
      let data = res.filter(item => {
        return item.dim_val ? item.dim_val === "T" : item.default_val === "T";
      });
      let columns = [];
      sort(data, "disp_order", "asc").forEach((item, index) => {
        columns.push({
          title: item.dim_name,
          key: item.dim_id,
          fixed: index === 0 ? "left" : "",
          width: index === 0 ? 160 : 140,
          className: index === 0 ? "demo-table-info-column" : "",
          sortable: index > 7 && item.dim_id != "status" ? "custom" : ""
        });
      });
      return columns;
    }
  },
  async created() {
    let _this = this;
    _this.filterParam = this.$store.state.BI.searchParam;
    this.init(this.$store.state.BI.searchParam);
    eventBus.$on("updateSearchParam_ticket", data => {
      _this.filterParam = data;
      _this.filterParam.shop_bizcat = data.bizcat;
      this.init(data);
    });

    let $api = this.$api;
    let current_date = this.dayjs()
      .format("YYYY-MM-DD");
    let [pvList, getList, chkList] = await Promise.all([
      $api.getConponTop10({ market_id: this.market_id, current_date, target: "pv" }),
      $api.getConponTop10({ market_id: this.market_id, current_date, target: "cpn_get_count" }),
      $api.getConponTop10({ market_id: this.market_id, current_date, target: "cpn_chk_count" })
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
  },
  beforeDestroy() {
    eventBus.$off("updateSearchParam_ticket");
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
  margin-top: 48px;
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
    background: rgba(42, 57, 98, 0.8);
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
    border-radius: 12px 0px 0px 12px;
  }
  .tiket_btn2,
  .tiket_btn3 {
    border-right: 1px solid rgba(42, 57, 98, 1);
  }
  .tiket_btn4 {
    border-radius: 0 12px 12px 0;
  }
}

</style>
