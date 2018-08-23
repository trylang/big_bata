<template>
    <div id="table_container">
        <div class="table_title">
            <span class="table_title_s">券数据详情</span>
        </div>
        <Input icon="ios-search" placeholder="请输入券名称" style="width: auto" v-model="conponEffect.coupon_name"
               @on-enter="getConponEffect(conponEffect.coupon_name)" @on-click="getConponEffect(conponEffect.coupon_name)"/>
        <!-- Table表格 -->
        <i-Table border :columns="conponEffect.columns" @on-sort-change="effectHandleSort"
                 :data="conponEffect.pageList"></i-Table>
        <div class="table_page">
            <div class="table_page_l">
                <p>共 <span>{{conponEffect.list.length}}</span> 条数据</p>
            </div>
            <div class="table_page_r">
                <Page :total="conponEffect.list.length" :current.sync="conponEffect.curPage" :page-size="10"
                      show-elevator @on-change="effectChangePage"/>
            </div>
        </div>
        <div>
            <div class="table_title_m">
                <span class="table_sp">券核销记录</span>
            </div>
            <Tabs v-model="searchParam.shop_bizcat" @on-click="toggleTab">
                <TabPane v-for="(item, index) in bizcatList" :key="index" :label="item.title" :name="item.shop_bizcat">
                    <i-Table :columns="conponChk.columns" :data="conponChk.list"></i-Table>
                    <div class="table_page">
                        <div class="table_page_l">
                            <p>共 <span>{{conponChk.list.total}}</span> 条数据</p>
                        </div>
                        <div class="table_page_r">
                            <Page :total="conponChk.list.total" :current.sync="conponChk.curPage" :page-size="10"
                                  show-elevator @on-change="conponChkChangePage"/>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
        <div>
            <div class="table_title_m"><span class="table_sp">券排名</span>
                <p class="tiket_btn">
                    <span v-for="(item, index) in btnList" :key="index"
                          :class="[`tiket_btn${index+1}`, toggleName == item.type ? 'active' : '']"
                          @click="handleChange(item.type)">{{item.title}}</span>
                </p>
            </div>
            <Row :gutter="16" style="width:102%;margin-top:16px;">
                <Col span="8" v-for="(top, index) in top2Tail10" :key="index">
                <ticketsTop :title="top.title" :progress="top.list" :_index="index"></ticketsTop>
                </Col>
            </Row>
        </div>

    </div>
</template>
<script>
import ticketsTop from "./ticketsTop";
import { sort } from "@/utils/filter.js";
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
                coupon_name: null,
                list: [],
                pageList: [],
                columns: (() => {
                    let res = JSON.parse(window.sessionStorage.getItem("coupon"));
                    if (!res) return [];
                    let data = res.filter(item => {
                        return item.default_val === 'T'
                    })
                    let columns = [];
                    data.forEach((item, index) => {
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
            conponChk: {
                list: [],
                pageList: [],
                columns: [
                    {
                        title: "券名称",
                        key: "coupon_name"
                    },
                    {
                        title: "券ID",
                        key: "coupon_id"
                    },
                    {
                        title: "券类型",
                        key: "category_name"
                    },
                    {
                        title: "发券主体",
                        key: "rectangleName",
                    },
                    {
                        title: "商户名",
                        key: "shop_name"
                    },
                    {
                        title: "楼层",
                        key: "shop_floor"
                    },
                    {
                        title: "发券时间",
                        key: "put_date"
                    },
                    {
                        title: "领取时间",
                        key: "get_time"
                    }
                ],
                curPage: 1
            },
            searchParam: {
                start_date: this.dayjs(new Date())
                    .subtract(1, "month")
                    .format("YYYY-MM-DD"),
                end_date: this.dayjs(new Date()).format("YYYY-MM-DD"),
                shop_bizcat: null
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
            ]
        };
    },
    methods: {
        toggleTab(biacat) {
            this.biacat = biacat
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
        conponChkChangePage(page) {
            this.conponChk.curPage = page
            this.getConponChk();
        },
        getConponChk(biacat) {
            this.searchParam.shop_bizcat = biacat || this.searchParam.shop_bizcat || null;
            let param = Object.assign({}, this.searchParam);
            param.pageSize = 10;
            param.pageIndex = this.conponChk.curPage;
            this.$api.getConponChk(param).then(res => {
                res.map(item => {
                    item.rectangleName = item.rectangle == 2 ? '商户' : '商场';
                    for (let key in item) {
                        if (!item[key]) item[key] = '--'
                    }
                    return item
                })
                this.conponChk.list = res;
            });
        },
        getConponEffect(name) {
            this.searchParam.coupon_name = name || null
            this.$api.getConponEffect(this.searchParam).then(res => {
                res.forEach((item, index) => {
                    if (!item.pv && item.explain == "合计") {
                        item.pv = item.explain;
                    }
                });
                this.conponEffect.list = res;
                this.conponEffect.pageList = res.slice(0, 10);
            });
        },
        init(param) {
            this.getConponEffect();
            this.getConponChk();
        }
    },
    async created() {
        let _this = this

        eventBus.$on("updateSearchParam_ticket", data => {

            _this.searchParam = data
            _this.searchParam.shop_bizcat = data.bizcat
            console.log(1111111111, _this.searchParam);
            this.init(data);
        });
        this.init();
        this.$api.getConponBizcat().then(res => {
            res.forEach(item => {
                item.title = `${item.shop_bizcat}（${item.ratio * 100}%）`;
            });
            this.bizcatList = res;
        });
        let $api = this.$api;
        let current_date = this.dayjs()
            .subtract(1, "day")
            .format("YYYY-MM-DD");
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
