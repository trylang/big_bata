<template>
    <div id="table_container">
        <div class="table_title">
            <span>数据详情</span>
            <downloadBounced></downloadBounced>
        </div>
        <!-- Table表格 -->
        <div class="table_format">
            <i-Table :columns="columns" :data="data"></i-Table>
            <div style="padding-right: 1rem; padding-top: 3rem;overflow:hidden;">
                <div class="table_title"><span>数据展示</span>
                    <div class="et_button">
                        <input class="et_button_l" value="节假日">
                        <input class="et_button_r" value="动作">
                    </div>
                </div>
                <div id="overview_chart" :style="{width: '1100px', height: '500px'}"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import downloadBounced from "@/components/downloadBounced.vue";
import { fmoney } from "@/utils/filter.js";
import dayjs from "dayjs";

export default {
    components: {
        downloadBounced
    },
    data() {
        return {
            chartData: [],
            columns: [
                {
                    title: " ",
                    key: "stat_type",
                    className: "demo-table-info-column"
                },
                {
                    title: "视频客流量",
                    key: "video_cf"
                },
                {
                    title: "WI-FI客流量",
                    key: "wifi_cf"
                },
                {
                    title: "活动UV",
                    key: "activity_uv"
                },
                {
                    title: "活动PV",
                    key: "activity_pv"
                },
                {
                    title: "会员数",
                    key: "mbr_reg_count"
                },
                {
                    title: "新增会员数",
                    key: "mbr_reg_count_acc"
                },
                {
                    title: "领券量",
                    key: "cpn_get_count"
                },
                {
                    title: "领取人数",
                    key: "cpn_get_persons"
                },
                {
                    title: "核销量",
                    key: "cpn_chk_count"
                },
                {
                    title: "核销人数",
                    key: "cpn_chk_persons"
                }
            ],
            data: []
        };
    },
    computed: {
        searchParam() {
            console.log('this.$store.state.BI.searchParam', this.$store.state.BI.searchParam)
            return this.$store.state.BI.searchParam
        }
        // ...mapState({
        //   searchParam: state => state.BI.searchParam
        // })
    },
    created() {
        this.init(this.searchParam);
        eventBus.$on('updateSearchParam_index', data => {
            console.log(1)
            this.init(data)
        })
    },
    beforeDestroy() {
        eventBus.$off('updateSearchParam_index')
    },
    watch: {
        chartData: "drawChart",
        // searchParam: {
        //   handler: function(val) {
        //     console.log('watchIndex',val)
        //     this.init(val);
        //   },
        //   deep: true,
        //   immediate: true
        // }
    },
    methods: {
        drawChart() {
            let _this = this
            if (!_this.chartData) return;
            let overviewChart = this.$echarts.init(
                document.getElementById("overview_chart")
            );

            let colors = ["#396FFF", "#E4007F", "#90C31F", "#FABE00", "#CCCCCC"];
            let itemColors = {
                holiday: "#396FFF",
                activity: "#F5A623",
                zhoumo: "#ccc"
            };
            let json = {
                '视频客流量': "video_cf",
                'WIFI客流量': "wifi_cf",
                '活动UV': "activity_uv",
                '活动PV': "activity_pv",
                '会员数': "mbr_reg_count",
                '新增会员数': "mbr_reg_count_acc",
                '领取人数': "cpn_get_persons",
                '领券量': "cpn_get_count",
                '核销量': "cpn_chk_count",
                '核销人数': "cpn_chk_persons",
            };
            let options = {
                color: colors,
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross"
                    }
                },
                xAxis: [
                    {
                        type: "category",
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            formatter: (value) => {
                                return dayjs(value).format('MM.DD')
                            }
                        },
                        data: []
                    }
                ],
                legend: {
                    selectedMode: "multiple",
                    selected: {}
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#999"
                        }
                    }
                },
                // yAxis: [
                //   {
                //     type: 'value',
                //     name: '数量',
                //     min: 1000,
                //     // max: 250,
                //     position: 'right',
                //     axisLine: {
                //         lineStyle: {
                //             color: '#999'
                //         }
                //     },
                //     // axisLabel: {
                //     //     formatter: '{value} ml'
                //     // }
                // },
                // {
                //     type: 'value',
                //     name: '数量',
                //     min: 0,
                //     max: 1000,
                //     position: 'left',
                //     axisLine: {
                //         lineStyle: {
                //             color: '#999'
                //         }
                //     },
                //     // axisLabel: {
                //     //     formatter: '{value} °C'
                //     // }
                // }],
                series: []
            };

            options.legend.data = Object.keys(json);
            options.legend.data.map((item, index) => {
                if (index < 4) {
                    options.legend.selected[item] = true;
                } else {
                    options.legend.selected[item] = false;
                }
            });

            options.xAxis[0].data = (() => {
                let data = _this.chartData.map(item => item.stat_ymd);
                data.push(
                    dayjs(data[data.length - 1])
                        .add(1, "day")
                        .format("YYYY-MM-DD")
                );
                return data;
            })();

            options.xAxis[0].data.sort(function (a, b) {
                return new Date(a) - new Date(b)
            })

            var areaStyle = {
                silent: false,
                data: []
            };

            let holidayObjs = {};

            this.chartData.forEach(item => {
                let name = item.action_name || item.holiday_name || item.zhoumo;
                if (!name) return;
                if (!holidayObjs[name]) {
                    holidayObjs[name] = {};
                    holidayObjs[name].type = item.action_name
                        ? "activity"
                        : item.holiday_name ? "holiday" : "zhoumo";
                    holidayObjs[name].startTime = item.stat_ymd;
                } else {
                    holidayObjs[name].endTime = dayjs(item.stat_ymd)
                        .add(1, "day")
                        .format("YYYY-MM-DD");
                }
            });

            for (let key in holidayObjs) {
                if (!holidayObjs[key].endTime) {
                    holidayObjs[key].endTime = dayjs(holidayObjs[key].startTime)
                        .add(1, "day")
                        .format("YYYY-MM-DD");
                }
                areaStyle.data.push([
                    {
                        name: key,
                        xAxis: holidayObjs[key].startTime,
                        itemStyle: {
                            color: itemColors[holidayObjs[key].type],
                            opacity: 0.16
                        },
                        label: {
                            offset: [0, 370],
                            color: itemColors[holidayObjs[key].type]
                        }
                    },
                    {
                        xAxis: holidayObjs[key].endTime
                    }
                ]);
            }

            let chart_series = [];
            options.legend.data.forEach(item => {
                chart_series.push({
                    name: item,
                    type: "line",
                    smooth: true,
                    label: {
                        show: true,
                        position: "top",
                        color: "auto",
                        formatter: param => {
                            return fmoney(param.value);
                        }
                    },
                    markArea: areaStyle,
                    data: this.chartData.map(data => data[json[item]])
                });
            });

            options.series = chart_series;
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
                    overviewChart.setOption(options);
                }
            });

            setTimeout(function () {
                window.onresize = function () {
                    overviewChart.resize();
                };
            }, 0);
        },
        async init(param) {
            let _this = this;

            await this.$api.getOverviewCur(param).then(res => {
                _this.chartData = res;
            });

            await this.$api.getOverviewHistory(param).then(res => {
                _this.data = res;
            });
        }
    },

};
</script>
<style lang="scss" scoped>
.echarts {
  height: 300px;
}

.et_button {
  float: right;
}

.et_button_l {
  width: 56px;
  height: 24px;
  margin-right: 8px;
  text-align: center;
  font-size: 12px;
  border: 1px solid #396fff;
  color: #396fff;
  border-radius: 4px;
  font-family: MicrosoftYaHei;
}

.et_button_r {
  width: 56px;
  height: 24px;
  border-radius: 4px;
  opacity: 0.4;
  font-size: 12px;
  color: #2a3962;
  text-align: center;
  border: 1px solid rgba(42, 57, 98, 1);
  font-family: MicrosoftYaHei;
}
</style>
