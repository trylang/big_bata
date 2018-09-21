<template>
  <div class="filterBox">
    <span class="filter-title">{{title}}</span>
    <div class="inline-content" :style="{height: filterHeight}">
      <div class="inline-item" v-for="(filter, index) in filters" :key="index">
        <span :style="dateStyle(filter)" style="color:#999999;">{{filter.title}}</span>
        <p v-if="filter.type==='daterange'" style="margin-top: -31px; padding-left: 33px;">
          <DatePicker v-for="(date, dataIndex) in filter.data" :key="dataIndex" type="date" :clearable="false" :options="option[dataIndex]" format="yyyy.MM.dd" v-model="param[date.name]" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate[date.name](param[date.name])"></DatePicker>
        </p>

        <Select style="width:90px;" v-if="filter.type==='select' && options" :ref="filter.label" :filterable="filter.filterable" :disabled="disabledObj[filter.label]" :clearable="filter.disClearable !== true" class="filter-input filter-select" @on-change="event[filter.label](param[filter.name], filter)" v-model="param[filter.name]">
          <Option v-for="(item, index) in options[filter.label]" :label="item[filter.filterName]" :value="item[filter.filterValue]" :key="index">
          </Option>
        </Select>

        <!-- <i-Select style="width:90px;" v-if="filter.type==='select'  && options" :disabled="disabledObj[filter.label]" :clearable="filter.disClearable !== true" class="filter-input filter-select" @on-change="event[filter.label](param[filter.name], filter)" v-model="param[filter.name]">
          <Option v-for="(item, index) in options[filter.label]" :label="item[filter.filterName]" :value="item[filter.filterValue]" :key="index">
          </Option>
        </i-Select> -->

        <p v-if="filter.type === 'btn'">
          <span v-for="(btn,index) in filter.data" :key="index" :class="[ 'btn-' + btn.position, toggleName === btn.btnTitle ? 'actived' : '']" @click="handleChange(btn, filter.data)">{{btn.btnTitle}}</span>
        </p>
      </div>
      <Button v-if="filters.length>0" @click="handle">
        <span class="query">查询</span>
      </Button>
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
      market_id: this.$route.query.market_id || 12555,
      param: {
        start_date: dayjs(new Date())
          .subtract(1, "month")
          .format("YYYY-MM-DD"),
        end_date: dayjs(new Date()).format("YYYY-MM-DD"),
        region_id: "1",
        // org_id: null,
        // shop_floor: null,
        // shop_bizcat: null,
        // shop_id: null,
        // activity_id: null,
        // stat_type: null
      },
      disabledObj: {
        building: true,
        floor: true,
        bizcat: true,
        shop: true,
        activity: true
      },
      toggleName: "当周",
      option: [
        {
          disabledDate(date) {
            return (
              date &&
              (date.valueOf() <
                dayjs()
                  .subtract(1, "year")
                  .valueOf() ||
                date.valueOf() > Date.now())
            );
          }
        },
        {
          disabledDate(date) {
            return (
              (date &&
                date.valueOf() <
                (dayjs(_this.param.start_date).valueOf() &&
                  dayjs()
                    .subtract(1, "year")
                    .valueOf())) ||
              date.valueOf() >
              dayjs(_this.param.start_date)
                .add(1, "month")
                .valueOf() ||
              date.valueOf() > Date.now() ||
              date.valueOf() < dayjs(_this.param.start_date).valueOf()
            );
          }
        }
      ],
      event: {
        region: value => {
          if (value == 1 || value == 2) {
            _this.param = Object.assign(_this.param, {
              org_id: null,
              shop_floor: null,
              shop_bizcat: null,
              shop_id: value == 1 ? null : -1,
              activity_id: null
            });
            for (let key in _this.disabledObj) {
              _this.disabledObj[key] = true;
            }
          } else if (value == 3) {
            _this.param = Object.assign(_this.param, {
              org_id: '01',
              shop_floor: null,
              shop_bizcat: null,
              shop_id: null,
              activity_id: null
            });
            for (let key in _this.disabledObj) {
              _this.disabledObj[key] = false;
            }
            delete(_this.options.route);
            _this.options = Object.assign({}, _this.$store.state.BI.options);
          }
        },
        async building (value, item) {
          _this.param = Object.assign(_this.param, {
            shop_floor: null,
            shop_bizcat: null,
            shop_id: null,
            activity_id: null
          });
          _this.$refs.shop && _this.$refs.shop.length > 0 && _this.$refs.shop[0].clearSingleSelect();
          _this.$refs.activity && _this.$refs.activity.length>0 && _this.$refs.activity[0].clearSingleSelect();

          _this.$set(_this.param, "shop_floor", null);
          _this.$set(_this.param, "shop_id", null);
          if (!value) {
            if (_this.options.route) return;
            _this.$set(_this.options, 'floor', []);
            _this.$set(_this.options, 'bizcat', []);
            _this.$set(_this.options, 'shop', []);
            _this.$set(_this.options, 'activity', []);
            return;
          }
          await _this.$api.getFloorList({ market_id: _this.market_id, org_id: value }).then(res => {
            _this.options.floor = res;
          });
          await _this.$api.getBizcatList({ market_id: _this.market_id, org_id: value }).then(res => {
            _this.options.bizcat = res;
          });
          await _this.$api.getShopList({ market_id: _this.market_id, org_id: value }).then(res => {
            _this.options.shop = res;
          });
          await _this.$api.getActivityList({ market_id: _this.market_id, org_id: value }).then(res => {
            _this.options.activity = res;
          });
        },
        async floor (value, item) {
          _this.$refs.shop && _this.$refs.shop[0].clearSingleSelect();
          _this.$set(_this.param, "shop_id", null);
          _this.$set(_this.param, "shop_bizcat", null);

          await _this.$api
            .getShopList({ market_id: _this.market_id, org_id: _this.param.org_id, shop_floor: value })
            .then(res => {
              _this.options.shop = res;
            });
          await _this.$api
            .getBizcatList({ market_id: _this.market_id, org_id: _this.param.org_id, shop_floor: value })
            .then(res => {
              _this.options.bizcat = res;
            });
        },
        bizcat: (value, item) => {
          _this.$refs.shop && _this.$refs.shop[0].clearSingleSelect();
          _this.$set(_this.param, "shop_id", null);
          _this.$api
            .getShopList({
              market_id: _this.market_id,
              org_id: _this.param.org_id,
              shop_floor: _this.param.shop_floor,
              shop_bizcat: value
            })
            .then(res => {
              _this.$set(_this.options, "shop", res);
              _this.$forceUpdate();
            });
        },
        shop: () => { },
        activity: () => { },
        remote_shop(query) {
          if (query !== "") {
            setTimeout(() => {
              _this.options.shop = _this.options.shop.filter(
                item =>
                  item.shop_name.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            }, 0);
          }
        },
        remote_activity(query) {
          if (query !== "") {
            setTimeout(() => {
              _this.options.activity = _this.options.activity.filter(
                item =>
                  item.activity_name.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            }, 0);
          } else {
            _this.options.activity = [];
          }
        }
      },
      changeDate: {
        start_date: date => {
          if (
            _this.param.start_date.valueOf() > _this.param.end_date.valueOf()
          ) {
            _this.param.end_date = null;
          }
          if (
            _this.param.start_date.valueOf() <
            dayjs(_this.param.end_date)
              .add(1, "month")
              .valueOf()
          ) {
            _this.param.end_date = null;
          }
          if (!_this.param.end_date) return;
          let param = {
            org_id: _this.param.org_id,
            period_start_time: dayjs(date).format("YYYY-MM-DD"),
            period_end_time: dayjs(_this.param.end_date).format("YYYY-MM-DD")
          };
          _this.$api.getActivityList({market_id: _this.market_id, ...param}).then(res => {
            _this.options.activity = res;
          });
        },
        end_date: date => {
          let param = {
            org_id: _this.param.org_id,
            period_start_time: dayjs(_this.param.start_date).format(
              "YYYY-MM-DD"
            ),
            period_end_time: dayjs(date).format("YYYY-MM-DD")
          };
          _this.$api.getActivityList({market_id: _this.market_id, ...param}).then(res => {
            _this.options.activity = res;
          });
        }
      },
      options: {
        activity: [],
        bizcat: [],
        building: [],
        floor: [],
        region: [],
        shop: []
      }
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
      return filter.type === "daterange" || filter.type === "checkbox"
        ? "line-height: 28px;"
        : "";
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
      if (this.param.region_id == "3" && !this.param.org_id) {
        this.$Message.warning("请选择建筑物！");
        return;
      }
      for (let key in this.param) {
        if (this.param[key] instanceof Date) {
          this.param[key] = dayjs(this.param[key]).format("YYYY-MM-DD");
        }
      }
      eventBus.$emit(`updateSearchParam_${this.$route.meta.path}`, this.param);
    },
    handleChange(e, data) {
      this.toggleName = e.btnTitle;
      this.param[e.name] = e.btnTitle;
      this.param.current_date = this.dayjs()
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      eventBus.$emit(`updateSearchParam_${this.$route.meta.path}`, this.param);
    },
    async fetchDate() {
      await this.$store.dispatch("getOptions",  {market_id: this.market_id}).then(() => {
        this.options = Object.assign({}, this.$store.state.BI.options);
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
        region_id: "1",
        org_id: null,
      };
      this.disabledObj = {
        building: true,
        floor: true,
        bizcat: true,
        shop: true,
        activity: true
      };
      
      this.options = Object.assign({}, this.$store.state.BI.options, {route: 'route'});      
      this.param = param;
      eventBus.$emit(`updateSearchParam_${this.$route.meta.path}`, this.param);
    }
  },
  computed: {
    filterHeight: function() {
      return this.filters.length == 0 ? '0' : '50px'; 
    } 
  },
  created() {
    this.fetchDate();
  }
  // mounted() {
  //   eventBus.$emit(
  //     `updateSearchParam_${this.$route.meta.path}`,
  //     (this.param = {
  //       start_date: dayjs(new Date())
  //         .subtract(1, "month")
  //         .format("YYYY-MM-DD"),
  //       end_date: dayjs(new Date()).format("YYYY-MM-DD"),
  //       org_id: "01"
  //     })
  //   );
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped>
@import "@/assets/style/components/filterBox.scss";
.inline-content {
  :nth-child(6) {
    .ivu-checkbox-wrapper {
      width: 140px !important;
    }
    .ivu-select-single {
      width: 140px !important;
    }
  }
}
</style>
