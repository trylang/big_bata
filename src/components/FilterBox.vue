<template>
  <div class="filterBox">
    <span class="filter-title">{{title}}</span>
    <div class="inline-content">
      <div class="inline-item" v-for="(filter, index) in filters" :key="index">
        <span :style="dateStyle(filter)">{{filter.title}}</span>
        <p v-show="filter.type==='daterange'" style="margin-top: -1.8rem; padding-left: 2rem;">
          <DatePicker v-for="(date, dataIndex) in filter.data" :key="dataIndex" type="date" :clearable="false" :options="option[dataIndex]" format="yyyy.MM.dd" 
          v-model="param[date.name]" 
          class="filter-input filter-date-picker"></DatePicker>
        </p>

        <Select v-show="filter.type==='select' && options" clearable class="filter-input filter-select" @on-change="event[filter.label](param[filter.name], filter)" v-model="param[filter.name]">
          <Option v-for="(item, index) in options[filter.label]" :value="item[filter.filterValue]" :key="index">
            {{item[filter.filterName]}}
          </Option>
        </Select>
        <p v-show="filter.type === 'btn'">
          <span v-for="(btn,index) in filter.data" :key="index" :class="[ 'btn-' + btn.position, toggleName === btn.position ? 'actived' : '']" @click="handleChange(btn, filter.data)">{{btn.btnTitle}}</span>
        </p> 
      </div>
      <Button v-show="filters.length>0" @click="handle"><span class="query">查询</span></Button>
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
				org_id: "01",
				shop_floor: null,
				shop_bizcat: null,
				shop_id: null,
				activity_id: null
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
        building: (value, item) => {
					_this.param = Object.assign(_this.param, {
						shop_floor: null,
						shop_bizcat: null,
						shop_id: null,
						activity_id: null
					});
					_this.$set(_this.param,'shop_id',null);
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
         _this.$set(_this.param,'shop_id',null);
         _this.$set(_this.param,'shop_bizcat',null);
          _this.$api
            .getShopList({ org_id: _this.param.org_id, shop_floor: value })
            .then(res => {
              _this.options.shop = res;
            });
        },
        bizcat: (value, item) => {
          _this.$set(_this.param,'shop_id',null);
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
        shop: () => {},
        activity: () => {}
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
    dateStyle: function(filter) {
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
  // watch: {
  //   $route: function() {
  //     let param = {
  //       start_date: dayjs(new Date())
  //         .subtract(1, "month")
  //         .format("YYYY-MM-DD"),
  //       end_date: dayjs(new Date()).format("YYYY-MM-DD"),
  //       org_id: "01"
  //     };

  //     this.param = param;
  //     console.log(`9999999updateSearchParam_${this.$route.meta.path}`, this.param);
	// 		// this.$store.commit("updateSearchParam", param);
  //     eventBus.$emit(`updateSearchParam_${this.$route.meta.path}`, this.param);
  //   }
  // },
  created() {
    this.fetchDate();
  },
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
<style scoped lang="scss">
@import "@/assets/style/components/filterBox.scss";
.inline-content {
  :nth-child(5) {
    .ivu-select-single {
      width: 128px !important;
      .ivu-select-selection {
        width: 128px !important;
      }
      .ivu-select-dropdown {
        width: 128px !important;
      }
    }
  }
  button {
    width: 64px;
    height: 24px;
    border-radius: 12px;
    border: 1px solid rgba(42, 57, 98, 0.4);
    .query {
      display: block;
      height: 12px;
      font-size: 12px;
      text-align: center;
      font-family: MicrosoftYaHei;
      color: $color-primary;
      line-height: 12px;
    }
  }
}
</style>
