<template>
    <div id="table_container">
        <div class="table_title">
            <span class="table_title_s">活动详情</span>
            <actionDetail></actionDetail>
        </div>
        <Table :columns="columnsT1" @on-sort-change="handleSortT1" :data="pageT1List"></Table>
        <div class="table_page">
            <div class="table_page_l">
                <p>共 <span>{{dataT1.length}}</span> 条数据</p>
            </div>
            <div class="table_page_r">
                <Page :total="dataT1.length" :current.sync="curPageT1" :page-size="10" show-elevator
                      @on-change="changePageT1"/>
            </div>
        </div>
        <div>
            <div class="table_title"><span class="table_title_s">数据展示</span></div>
            <div id="activity_chart" :style="{width: '1100px', height: '500px'}"></div>
        </div>
        <div>
            <div class="table_title">
                <span class="table_title_s">数据详情</span>
                <actionDetail></actionDetail>
            </div>
            <Table width="100%" :columns="columnsT2" :data="pageT2List" @on-sort-change="handleSortT2"></Table>
            <div class="table_page">
                <div class="table_page_l">
                    <p>共 <span>{{dataT2.length}}</span> 条数据</p>
                </div>
                <div class="table_page_r">
                    <Page :total="dataT2.length" :current.sync="curPageT2" :page-size="10" show-elevator
                          @on-change="changePageT2"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import actionDetail from "@/components/actionDetail.vue";
import { mapState } from "vuex";
import { setOptions } from "@/utils/chart.js";
import dayjs from 'dayjs';
import { sort } from '@/utils/filter.js';

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
                    key: "activity_name",
                    width: 150
                },
                {
                    title: "活动时间",
                    key: "period_dur_name",
                    className: "activity-time-right",
                    width: 155
                },
                {
                    title: "历时天数",
                    key: "period_days",
                    className: "activity-table-right"
                },
                {
                    title: "获取会员数",
                    key: "quantity",
                    sortable: 'custom',
                    className: "activity-table-right"
                },
                {
                    title: "参与商户数",
                    key: "shops",
                    sortable: 'custom',
                    className: "activity-table-right"
                },
                {
                    title: "活动总成本",
                    key: "gross_cost",
                    sortable: 'custom',
                    className: "activity-table-right"
                },
                {
                    title: "日均拉新",
                    key: "daily_trd_new",
                    sortable: 'custom',
                    className: "activity-table-right"
                },
                {
                    title: "日均销售",
                    key: "daily_trd_amount",
                    sortable: 'custom',
                    className: "activity-table-right"
                },
                {
                    title: "拉新ROI",
                    key: "roi",
                    sortable: 'custom',
                    className: "activity-table-right"
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
                    width: 110,
                    className: "activity-table-right"
                },
                {
                    title: "业态",
                    key: "shop_bizcat",
                    width: 110,
                    className: "activity-table-right"
                },
                {
                    title: "WIFI客流量",
                    key: "wifi_cf",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                },
                {
                    title: "视频客流量",
                    key: "video_cf",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                },
                {
                    title: "销售额",
                    key: "trd_amout",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                },
                {
                    title: "交易笔数",
                    key: " trd_bills",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                },
                {
                    title: "发券量",
                    key: "cpn_put_count",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                },
                {
                    title: "UV数",
                    key: "activity_uv",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                },
                {
                    title: "PV数",
                    key: "activity_pv",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                },
                {
                    title: "参与会员数",
                    key: "cpn_get_members",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                }, {
                    title: "会员占比",
                    key: "members_rate",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                }, {
                    title: "新增会员数",
                    key: "mbr_reg_count",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                }, {
                    title: "领券量",
                    key: "cpn_get_count",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                }, {
                    title: "领券人数",
                    key: "cpn_get_persons",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                }, {
                    title: "核销量",
                    key: "cpn_chk_count",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                }, {
                    title: "核销人数",
                    key: "cpn_chk_persons",
                    width: 110,
                    sortable: true,
                    className: "activity-table-right"
                }
            ],
            curPageT1: 1,
            curPageT2: 1,
            pageT1List: [],
            dataT1: [],
            pageT2List: [],
            dataT2: [],
            totalT2: {}
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
            this.pageT1List = this.dataT1.slice((page - 1) * 10, page * 10);
        },
        handleSortT1(column) {
            this.dataT1 = sort(this.dataT1, column.key, column.order)
            this.pageT1List = this.dataT1.slice(0, 10);
            this.curPageT1 = 1;
        },
        changePageT2(page) {
            this.pageT2List.splice(0, this.pageT2List.length-1);
            this.pageT2List = this.dataT2.slice((page - 1) * 10, page * 10);
            this.pageT2List.push(this.totalT2);
        },
        handleSortT2(column) {
            this.dataT2 = sort(this.dataT2, column.key, column.order)
            this.pageT2List = this.dataT2.slice(0, 10);
            this.pageT2List.push(this.totalT2);
            this.curPageT2 = 1;
        },
        async init(param) {
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
                this.totalT2 = this.dataT2.pop();
                _this.pageT2List = this.dataT2.slice(0, 10);
                _this.pageT2List.push(this.totalT2);
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
            let options = setOptions(_this.chartData);
            // 绘制图表
            overviewChart.setOption(options);
            overviewChart.on("legendselectchanged", function (obj) {
                var selected = obj.selected;
                let selectedNum = 0
                for (let key in selected) {
                    if (selected[key]) selectedNum++
                }
                if (selectedNum > 4) {
                    _this.$Message.warning('最多只能选择4个图例');
                    selected[obj.name] = false
                    options.legend.selected = selected;
                    _this.drawChart();
                }
            });

            setTimeout(function () {
                window.onresize = function () {
                    overviewChart.resize();
                };
            }, 0);
        },
    },
    created() {
        this.init(this.$store.state.BI.searchParam);
        eventBus.$on('updateSearchParam_activity', data => {
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
