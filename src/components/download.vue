<template>
  <div class="download">
    <Icon @click="modal = true" class="export iconfont icon-xiazai" />
    <Modal v-model="modal" width="604px" title="数据详情下载筛选" class-name="download-modal" @on-ok="ok" @on-cancel="cancel">
      <div class="accumulative_total" v-if="meta">
        <CheckboxGroup v-model="param.stat_type">
          <span class="time_chance">时间选择</span>
          <Checkbox v-for="(item, index) in timeCheckbox[meta.path]" :key="index" :label="item"></Checkbox>
        </CheckboxGroup>
      </div>

      <div class="accumulative_total" v-if="!meta && filters">
        <span class="time_chance">时间选择</span>
        <DatePicker v-for="(date, dataIndex) in filters.find(item => item.type==='daterange').data" :key="dataIndex" type="date" :clearable="false" :options="option[dataIndex]" format="yyyy.MM.dd" v-model="param[date.name]" class="filter-input filter-date-picker"></DatePicker>
      </div>

      <div class="filtrate">
        <span class="filtrate_s">条件筛选</span>
        <Row class="inline-content" v-if="filters">
          <Col span="12" v-for="(filter, index) in filters.filter(item => item.type !== 'daterange' && item.type !== 'btn')" :key="index">
          <span :style="dateStyle(filter)">{{filter.title}}</span>
          <Checkbox v-show="filter.type==='checkbox'" v-model="market_id" @on-change="event[filter.label](market_id)"></Checkbox>

          <Select v-show="filter.type==='select' && options" :disabled="disabledObj[filter.label]" clearable class="filter-input filter-select" @on-change="event[filter.label](param[filter.name], filter)" v-model="param[filter.name]">
            <Option v-for="(item, itemIndex) in options[filter.label]" :value="item[filter.filterValue]" :key="itemIndex">
              {{item[filter.filterName]}}
            </Option>
          </Select>
          <p v-show="filter.type === 'btn'">
            <span v-for="(btn,btnIndex) in filter.data" :key="btnIndex" :class="[ 'btn-' + btn.position, toggleName === btn.position ? 'actived' : '']" @click="handleChange(btn, filter.data)">{{btn.btnTitle}}</span>
          </p>
          </Col>
        </Row>
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
      modal: false,
      market_id: false,
      param: {
        stat_type: [],
        start_date: dayjs(new Date())
          .subtract(1, "month")
          .format("YYYY-MM-DD"),
        end_date: dayjs(new Date()).format("YYYY-MM-DD"),
        org_id: "01",
        shop_floor: null,
        shop_bizcat: null,
        shop_id: null,
        activity_id: null,
      },
      timeCheckbox: {
        'index': ['当日', '当周', '当月'],
        'sales-member': ['当周', '上周', '当月', '上月'],
      },
      disabledObj: {
        building: false,
        floor: false,
        bizcat: false,
        shop: false,
        activity: false
      },
      toggleName: "",
      option: [
        {
          disabledDate(date) {
            return (
              date &&
              (date.valueOf() <
                dayjs(_this.param.start_date)
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
                  dayjs(_this.param.end_date)
                    .subtract(1, "year")
                    .valueOf())) ||
              date.valueOf() >
              dayjs(_this.param.end_date)
                .add(1, "year")
                .valueOf() ||
              date.valueOf() > Date.now() ||
              date.valueOf() < dayjs(_this.param.start_date).valueOf()
            );
          }
        }
      ],
      event: {
        market: (value) => {
          if (value) {
            _this.param = Object.assign(_this.param, {
              shop_floor: null,
              shop_bizcat: null,
              shop_id: -1,
              activity_id: null,
            });
            for (let key in _this.disabledObj) {
              _this.disabledObj[key] = true
            }
          } else {
            for (let key in _this.disabledObj) {
              _this.disabledObj[key] = false
            }
          }
        },
        building: (value, item) => {
          _this.param = Object.assign(_this.param, {
            shop_floor: null,
            shop_bizcat: null,
            shop_id: null,
            activity_id: null
          });
          _this.$set(_this.param, 'shop_id', null);
          if (!value) {
            _this.options.floor = [];
            _this.options.bizcat = [];
            _this.options.shop = [];
            _this.options.activity = [];
            return;
          }
          _this.$api.getFloorList({ org_id: value }).then(res => {
            _this.options.floor = res;
          });
          _this.$api.getBizcatList({ org_id: value }).then(res => {
            _this.options.bizcat = res;
          });
          _this.$api.getShopList({ org_id: value }).then(res => {
            _this.options.shop = res;
          });
          _this.$api.getActivityList({ org_id: value }).then(res => {
            _this.options.activity = res;
          });
        },
        floor: (value, item) => {
          _this.$set(_this.param, 'shop_id', null);
          _this.$set(_this.param, 'shop_bizcat', null);
          _this.$api
            .getShopList({ org_id: _this.param.org_id, shop_floor: value })
            .then(res => {
              _this.options.shop = res;
            });
        },
        bizcat: (value, item) => {
          _this.$set(_this.param, 'shop_id', null);
          _this.$api
            .getShopList({
              org_id: _this.param.org_id,
              shop_floor: _this.param.shop_floor,
              shop_bizcat: value
            })
            .then(res => {
              _this.options.shop = res;
            });
        },
        shop: () => { },
        activity: () => { }
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
    }
  },
  methods: {
    ok() {
      if (this.meta) {
        this.param.stat_type = this.param.stat_type.join(',');
        this.param.current_date =  this.dayjs()
            .subtract(1, "day")
            .format("YYYY-MM-DD");
      }
      this.param.start_date = dayjs(this.param.start_date).format("YYYY-MM-DD");
      this.param.end_date = dayjs(this.param.end_date).format("YYYY-MM-DD");
      this.$api.dataDownload(this.name, this.param).then(res => {
        var eleLink = document.createElement('a');
        eleLink.download = `${this.title}.xlsx`;
        eleLink.href = URL.createObjectURL(res.data);
        eleLink.click();
      })
    },
    cancel() { },
    dateStyle: function (filter) {
      return filter.type === "daterange" || filter.type === "checkbox" ? "line-height: 28px;" : "";
    },
    async fetchDate() {
      await this.$store.dispatch("getOptions").then(() => {
        this.options = this.$store.state.BI.options;
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
  .ivu-select {
    width: 75%;
  }
}
</style>

