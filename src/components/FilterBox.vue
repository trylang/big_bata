<template>
  <div class="filterBox">
    <span class="filter-title">{{title}}</span>
    <div class="inline-content">
      <div class="inline-item" v-for="(filter, index) in filters" :key="index">
        <span :style="dateStyle(filter)">{{filter.title}}</span>
        <p v-if="filter.type==='daterange'" style="margin-top: -1.8rem; padding-left: 2rem;">
          <DatePicker v-for="(date, dataIndex) in filter.data" type="date" :clearable="false" :options="option[dataIndex]" format="yyyy.MM.dd" 
          v-model="param[date.name]" 
          class="filter-input filter-date-picker"></DatePicker>
        </p>

        <Select v-if="filter.type==='select' && options" clearable class="filter-input filter-select" @on-change="event[filter.label](param[filter.name], filter)" v-model="param[filter.name]">
          <Option v-for="(item, index) in options[filter.label]" :value="item[filter.filterValue]" :key="index">
            {{item[filter.filterName]}}
          </Option>
        </Select>

        <p v-if="filter.type === 'btn'">
          <span v-for="btn in filter.data" :class="[ 'btn-' + btn.position, toggleName === btn.position ? 'actived' : '']" @click="handleChange(btn, filter.data)">{{btn.btnTitle}}</span>
        </p>
      </div>
      <Button v-if="filters.length>0" @click="handle">确定</Button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";

export default {
    name: "FilterBox",
    data() {
        let _this = this;
        return {
            param: {
                start_date: dayjs(new Date())
                    .subtract(1, "month")
                    .format("YYYY-MM-DD"),
                end_date: dayjs(new Date()).format("YYYY-MM-DD"),
                org_id: 'in-house'
            },
            toggleName: "",
            option: [
                {
                    disabledDate(date) {
                        return date && ((date.valueOf() < dayjs(_this.param.start_date).subtract(1, "year").valueOf()) || date.valueOf() > Date.now());
                    }
                },
                {
                    disabledDate(date) {
                        return (
                            (date &&
                                date.valueOf() <
                                (dayjs(_this.param.start_date).valueOf() && dayjs(_this.param.end_date).subtract(1, "year").valueOf()))
                            || date.valueOf() > dayjs(_this.param.end_date).add(1, "year").valueOf()
                            || date.valueOf() > Date.now()
                            || date.valueOf() < dayjs(_this.param.start_date).valueOf()
                        );
                    }
                }
            ],
            event: {
                building: (value, item) => {
                    this.param.floor = '';
                    this.param.biacat = '';
                    this.param.shop_id = '';
                    this.param.activity_id = '';
                    if (value === 'out-door') {
                        this.options.floor = [];
                    } else {
                        this.$api.getFloorList({ org_id: value }).then(res => {
                            this.options.floor = res;

                        })
                        this.$api.getBizcatList({ org_id: value }).then(res => {
                            this.options.biacat = res;

                        })
                        this.$api.getShopList({ org_id: value }).then(res => {
                            this.options.shop = res;

                        })
                        this.$api.getActivityList({ org_id: value }).then(res => {
                            this.options.activity = res;

                        })
                    }
                },
                floor: (value, item) => {
                    this.$api.getShopList({ org_id: this.param.org_id, floor: value }).then(res => {
                        this.options.shop = res;
                    })
                },
                biacat: (value, item) => {
                    this.$api.getShopList({ org_id: this.param.org_id, floor: this.param.floor, biacat: value }).then(res => {
                        this.options.shop = res;
                    })
                },
                shop: () => { },
                activity: () => { }
            },
            options: {}
        };
    },
    props: {
        title: String,
        filters: {
            type: Array,
            required: true
        }
    },
    methods: {
        dateStyle: function (filter) {
            return filter.type === "daterange" ? "line-height: 28px;" : "";
        },
        handle() {
            if (!this.param.start_date) {
                this.$Message.warning("请选择开始时间！");
                return;
            }
            if (!this.param.end_date) {
                this.$Message.warning("请选择结束时间！");
                return;
            }
            if (!this.param.org_id) {
                this.$Message.warning("请选择建筑物！");
                return;
            }
            for (let key in this.param) {
                if (this.param[key] instanceof Date) {
                    this.param[key] = dayjs(this.param[key]).format("YYYY-MM-DD");
                }
            }
            eventBus.$emit(`updateSearchParam_${this.$route.meta.path}`, this.param);
            // this.$store.commit("updateSearchParam", this.param);
        },
        handleChange(e, data) {
            this.toggleName = e.position;
            data.forEach(item => {
                if (item.position === e.position) {
                    this.param[item.name] = 1;
                } else {
                    this.param[item.name] = 0;
                }
            });
            // eventBus.$emit("updateSearchParam", this.param);
            // this.$store.commit("updateSearchParam", this.param);

        },
        async fetchDate() {
            await this.$store.dispatch("getOptions").then(() => {
                this.options = this.$store.state.BI.options;
            });
        }
    },
    watch: {
        $route: function () {
            let param = {
                start_date: dayjs(new Date())
                    .subtract(1, "month")
                    .format("YYYY-MM-DD"),
                end_date: dayjs(new Date()).format("YYYY-MM-DD"),
                org_id: 'in-house'
            };

            this.param = param
            console.log(333333)
            // this.$store.commit("updateSearchParam", param);
            eventBus.$emit(`updateSearchParam_${this.$route.meta.path}`, this.param);
        }
    },
    created() {
        this.fetchDate();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/style/components/filterBox.scss";
.inline-content {
  :nth-child(5) {
    width: 230px;
    .ivu-select-single {
      width: 190px !important;
      .ivu-select-selection {
        width: 190px !important;
      }
      .ivu-select-dropdown {
        width: 190px !important;
      }
    }
  }
  button {
    border: 1px solid #2a3962;
  }
}
</style>
