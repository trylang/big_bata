<template>
  <div class="download">
    <Icon @click="modal = true" class="export iconfont icon-xiazai" />
    <Modal v-model="modal" width="604px" title="数据详情下载筛选" class-name="download-modal" @on-ok="ok" @on-cancel="cancel">
      <div class="accumulative_total" v-if="slotFilter">
        <span class="time_chance">时间选择</span>
        <DatePicker v-for="(date, dataIndex) in slotFilter.find(item => item.type==='daterange').data" @on-change="changeDate[date.name](param[date.name])" :key="dataIndex" placeholder="请选择时间" type="date" :clearable="false" :options="option[dataIndex]" format="yyyy.MM.dd" v-model="param[date.name]" class="filter-input filter-date-picker"></DatePicker>
      </div>
      
      <div class="accumulative_total" v-if="meta && !noTimeCheck">
        <CheckboxGroup v-model="stat_type">
          <span class="time_chance">时间选择</span>
          <Checkbox v-for="(item, index) in timeCheckbox[meta.path]" :key="index" :label="item"></Checkbox>
        </CheckboxGroup>
      </div>

      <div class="accumulative_total" v-if="!meta && filters">
        <span class="time_chance">时间选择</span>
        <DatePicker v-for="(date, dataIndex) in filters.find(item => item.type==='daterange').data" @on-change="changeDate[date.name](param[date.name])" :key="dataIndex" placeholder="请选择时间" type="date" :clearable="false" :options="option[dataIndex]" format="yyyy.MM.dd" v-model="param[date.name]" class="filter-input filter-date-picker"></DatePicker>
      </div>

      <div id="filtrate">
        <div v-if="!noFilter">
          <span class="filtrate_s">条件筛选</span>
          <Row class="inline-content" v-if="filters">
            <i-Col span="12" v-for="(filter, index) in filters.filter(item => item.type !== 'daterange' && item.type !== 'btn')" :key="index">
              <span :style="dateStyle(filter)">{{filter.title}}</span>
              <!-- <Select v-show="filter.type==='select' && options" style="width:130px;" :filterable="filter.filterable" :disabled="disabledObj[filter.label]" :clearable="filter.disClearable !== true" class="filter-input filter-select" @on-change="event[filter.label](param[filter.name], filter)" v-model="param[filter.name]">
              <Option v-for="(item, itemIndex) in options[filter.label]" :label="item[filter.filterName]" :value="item[filter.filterValue]" :key="itemIndex">
              </Option>
            </Select> -->
              <Select v-show="filter.type==='select' && options" style="width:130px;" :ref="filter.label" :disabled="disabledObj[filter.label]" :clearable="filter.disClearable !== true" class="filter-input filter-select" @on-change="event[filter.label](param[filter.name], filter)" v-model="param[filter.name]">
                <Option v-for="(item, itemIndex) in options[filter.label]" :label="item[filter.filterName]" :value="item[filter.filterValue]" :key="itemIndex">
                </Option>
              </Select>

              <p v-show="filter.type === 'btn'">
                <span v-for="(btn,btnIndex) in filter.data" :key="btnIndex" :class="[ 'btn-' + btn.position, toggleName === btn.position ? 'actived' : '']" @click="handleChange(btn, filter.data)">{{btn.btnTitle}}</span>
              </p>
            </i-Col>
          </Row>
        </div>

      </div>
    </Modal>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { mapState } from "vuex";

export default {
  name: "download",
  data() {
    let _this = this;
    return {
      market_id: this.$route.query.market_id || 12555,
      modal: false,
      stat_type: ["昨天", "当周", "当月"],
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
        // activity_id: null
      },
      timeCheckbox: {
        index: ["昨天", "当周", "当月"],
        "sales-member": ["当周", "上周", "当月", "上月"]
      },
      disabledObj: {
        building: true,
        floor: true,
        bizcat: true,
        shop: true,
        activity: true
      },
      toggleName: "",
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
              org_id: "01",
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
          _this.$refs.shop && _this.$refs.shop.length>0 && _this.$refs.shop[0].clearSingleSelect();
          _this.$refs.activity && _this.$refs.activity.length>0 && _this.$refs.activity[0].clearSingleSelect();
          _this.$set(_this.param, "shop_id", null);
          if (!value) {
            if (_this.options.route) return;
            _this.options.floor = [];
            _this.options.bizcat = [];
            _this.options.shop = [];
            _this.options.activity = [];
            return;
          }
          await _this.$api
            .getFloorList({ market_id: _this.market_id, org_id: value })
            .then(res => {
              _this.options.floor = res;
            });
          await _this.$api
            .getBizcatList({ market_id: _this.market_id, org_id: value })
            .then(res => {
              _this.options.bizcat = res;
            });
          await _this.$api
            .getShopList({ market_id: _this.market_id, org_id: value })
            .then(res => {
              _this.options.shop = res;
            });
          await _this.$api
            .getActivityList({ market_id: _this.market_id, org_id: value })
            .then(res => {
              _this.options.activity = res;
            });
        },
        async floor (value, item) {
          _this.$refs.shop && _this.$refs.shop[0].clearSingleSelect();
          _this.$set(_this.param, "shop_id", null);
          _this.$set(_this.param, "shop_bizcat", null);
          await _this.$api
            .getShopList({
              market_id: _this.market_id,
              org_id: _this.param.org_id,
              shop_floor: value
            })
            .then(res => {
              _this.options.shop = res;
            });
          await _this.$api
            .getBizcatList({
              market_id: _this.market_id,
              org_id: _this.param.org_id,
              shop_floor: value
            })
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
              _this.options.shop = res;
            });
        },
        shop: () => {},
        activity: () => {}
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
          _this.$api
            .getActivityList({ market_id: _this.market_id, ...param })
            .then(res => {
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
          _this.$api
            .getActivityList({ market_id: _this.market_id, ...param })
            .then(res => {
              _this.options.activity = res;
            });
        }
      },
      options: {}
    };
  },
  props: {
    meta: Object,
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    noFilter: {
      type: Boolean,
      default: false
    },
    noTimeCheck: {
      type: Boolean,
      default: false
    },
    slotFilter: Array
  },
  methods: {
    ok() {
      if (this.meta) {
        this.param.stat_type = this.stat_type.join(",");
        this.param.current_date = this.dayjs()
          .subtract(1, "day")
          .format("YYYY-MM-DD");
      }
      this.param.start_date = dayjs(this.param.start_date).format("YYYY-MM-DD");
      this.param.end_date = dayjs(this.param.end_date).format("YYYY-MM-DD");
      this.$api
        .dataDownload(this.name, { market_id: this.market_id, ...this.param })
        .then(res => {
          var eleLink = document.createElement("a");
          eleLink.download = `${this.title}.xlsx`;
          eleLink.href = URL.createObjectURL(res.data);
          eleLink.click();
          this.param = {
            stat_type: "",
            start_date: dayjs(new Date())
              .subtract(1, "month")
              .format("YYYY-MM-DD"),
            end_date: dayjs(new Date()).format("YYYY-MM-DD"),
            region_id: "1",
            org_id: null,
            shop_floor: null,
            shop_bizcat: null,
            shop_id: null,
            activity_id: null
          };
          this.disabledObj = {
            building: true,
            floor: true,
            bizcat: true,
            shop: true,
            activity: true
          };
          this.options = Object.assign({}, this.$store.state.BI.options, {route: 'route'});      
        });
    },
    cancel() {
      this.param = {
        stat_type: "",
        start_date: dayjs(new Date())
          .subtract(1, "month")
          .format("YYYY-MM-DD"),
        end_date: dayjs(new Date()).format("YYYY-MM-DD"),
        region_id: "1",
        org_id: null,
        shop_floor: null,
        shop_bizcat: null,
        shop_id: null,
        activity_id: null
      };
      this.disabledObj = {
        building: true,
        floor: true,
        bizcat: true,
        shop: true,
        activity: true
      };
      this.options = Object.assign({}, this.$store.state.BI.options, {route: 'route'});      
    },
    dateStyle: function(filter) {
      return filter.type === "daterange" || filter.type === "checkbox"
        ? "line-height: 28px;"
        : "";
    },
    async fetchDate() {
      await this.$store.dispatch("getOptions", {market_id: this.market_id}).then(() => {
      this.options = Object.assign({}, this.$store.state.BI.options);      
      });
    }
  },
  created() {
    this.fetchDate();
  },
  computed: {
    ...mapState({
      filters: state => state.BI.searchOptions
    })
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/components/filterBox.scss";

.download {
  float: right;
}
.download-modal .time_chance {
  margin-right: 2rem;
}
.ivu-checkbox-wrapper {
  margin-right: 96px;
}
</style>

