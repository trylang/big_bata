<template>
  <div class="allocation_container">
    <p class="allocation_title">系统设置详情</p>
    <Tabs class="allocation_tabs" @on-click="toggleTabpan" value="action">
      <!-- 运营日志配置 -->
      <TabPane label="运营日志" name="action">
        <div class="allocation-time">
          <span style="float:left;margin-top:0.4rem">时间：</span>
          <div class="timer">
            <Row>
              <Col span="12">
                <DatePicker v-for="(date, dataIndex) in [{name: 'period_start_time'}, {name: 'period_end_time'}]" :key="dataIndex" type="date" :clearable="false" :options="optionAction[dataIndex]" format="yyyy.MM.dd" v-model="action[date.name]" placeholder="请选择时间" @on-change="changeDate[date.name]('action', action[date.name])">
                </DatePicker>
              </Col>
            </Row>
          </div>
          <Input icon="ios-search" placeholder="请输入运营日志" v-model="action.content" @on-enter="toggleTabpan('action')" @on-click="toggleTabpan('action')" style="width: auto;border:1px solid #F2F2F2;border-radius:16px;" />
        </div>
        <div class="action_container">
          <button class="new_action ios-add" type="button" @click="addModel('action')">
            <Icon type="ios-add" />
            <span>新建</span>
          </button>
        </div>
        <div class="log_record">
          <Table :columns="action.columns" :data="action.pageList"></Table>
        </div>
        <div class="table_page">
          <div class="table_page_l">
            <p>共
              <span>{{action.list.length}}</span> 条数据</p>
          </div>
          <div class="table_page_r">
            <Page :total="action.list.length" :current.sync="action.curPage" :page-size="10" show-elevator @on-change="changePageAction" />
          </div>
        </div>
      </TabPane>
      <!-- 营销成本 -->
      <TabPane label="营销成本" name="cost">
        <div class="allocation-time">
          <span style="float:left;margin-top:0.4rem">时间：</span>
          <div class="timer">
            <Row>
              <Col span="12">
                <DatePicker v-for="(date, dataIndex) in [{name: 'period_start_time'}, {name: 'period_end_time'}]" :key="dataIndex" type="date" :clearable="false" :options="option[dataIndex]" format="yyyy.MM.dd" v-model="cost[date.name]" placeholder="请选择时间" @on-change="changeDate[date.name]('cost', cost[date.name])">
                </DatePicker>
              </Col>
            </Row>
          </div>
          <Input icon="ios-search" placeholder="请输入活动名称" v-model="cost.activity_name" @on-enter="toggleTabpan('cost')" @on-click="toggleTabpan('cost')" style="width: auto;border:1px solid #F2F2F2;border-radius:16px;" />
        </div>
        <div class="action_container">
          <button class="new_action ios-add" type="button" @click="addModel('cost')">
            <Icon type="ios-add" />
            <span>新建</span>
          </button>
        </div>
        <Table :columns="cost.columns" :data="cost.pageList"></Table>

        <div class="table_page">
          <div class="table_page_l">
            <p>共
              <span>{{cost.list.length}}</span> 条数据</p>
          </div>
          <div class="table_page_r">
            <Page :total="cost.list.length" :current.sync="cost.curPage" :page-size="10" show-elevator @on-change="changePageCost" />
          </div>
        </div>
      </TabPane>
      <!-- 指标维度 -->
      <TabPane label="指标维度" name="level">
        <!-- 模块1 -->
        <div class="allocation_pages">
          <p class="data_page_title">1. 数据概览页-表头配置</p>
          <p class="indicators_dimension">指标维度</p>
          <!-- 选择框 -->
          <div class="check_all " style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox :indeterminate="level.overview.indeterminate" :value="level.overview.checkAll" @click.prevent.native="handleCheckAll('overview')">全选
            </Checkbox>
          </div>
          <CheckboxGroup v-model="level.overview.checkAllGroup" @on-change="overviewCheckAllGroupChange">
            <Checkbox v-for="(item, index) in level.overview.list" :key="index" :disabled="item.editable==='F'" :label="item.dim_id">
              {{item.dim_name}}
            </Checkbox>
          </CheckboxGroup>
          <input class="apply" type="button" @click="handleApply('overview', level.overview.checkAllGroup)" value="应用">
        </div>
        <!-- 模块2 -->
        <div class="allocation_pages">
          <p class="data_page_title">2. 活动效果分析页-表头配置</p>
          <p class="indicators_dimension">1）指标维度（上表）</p>
          <!-- 选择框 -->
          <div class="check_all " style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox :indeterminate="level.activityL1.indeterminate" :value="level.activityL1.checkAll" @click.prevent.native="handleCheckAll('activityL1')">全选
            </Checkbox>
          </div>
          <CheckboxGroup v-model="level.activityL1.checkAllGroup" @on-change="activityL1CheckAllGroupChange">
            <Checkbox v-for="(item, index) in level.activityL1.list" :key="index" :disabled="item.editable==='F'" :label="item.dim_id">
              {{item.dim_name}}
            </Checkbox>
          </CheckboxGroup>

          <p class="indicators_dimension">2）指标维度（下表）</p>
          <!-- 选择框 -->
          <div class="check_all " style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox :indeterminate="level.activityL2.indeterminate" :value="level.activityL2.checkAll" @click.prevent.native="handleCheckAll('activityL2')">全选
            </Checkbox>
          </div>
          <CheckboxGroup v-model="level.activityL2.checkAllGroup" @on-change="activityL2CheckAllGroupChange">
            <Checkbox v-for="(item, index) in level.activityL2.list" :key="index" :disabled="item.editable==='F'" :label="item.dim_id">
              {{item.dim_name}}
            </Checkbox>
          </CheckboxGroup>
          <input class="apply" type="button" @click="handleApply('activity', {L1:level.activityL1.checkAllGroup, L2: level.activityL2.checkAllGroup})" value="应用">
        </div>
        <!-- 模块3 -->
        <div class="allocation_pages">
          <p class="data_page_title">3. 券效果分析页-表头配置</p>
          <p class="indicators_dimension">指标维度</p>
          <!-- 选择框 -->
          <div class="check_all " style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox :indeterminate="level.coupon.indeterminate" :value="level.coupon.checkAll" @click.prevent.native="handleCheckAll('coupon')">全选
            </Checkbox>
          </div>
          <CheckboxGroup v-model="level.coupon.checkAllGroup" @on-change="couponCheckAllGroupChange">
            <Checkbox v-for="(item, index) in level.coupon.list" :key="index" :disabled="item.editable==='F'" :label="item.dim_id">{{item.dim_name}}
            </Checkbox>
          </CheckboxGroup>
          <input class="apply" type="button" @click="handleApply('coupon', level.coupon.checkAllGroup)" value="应用">
        </div>
      </TabPane>
    </Tabs>

    <Modal v-model="action.model" width="416px" :title="action.param.edit ? '编辑运营日志': '新建运营日志' " :loading="action.loading" @on-ok="submitAction" @on-cancel="cancel">
      <div class="action message" style="margin-bottom:0;">
        <span class="action_name">运营日志</span>
        <Input v-model="action.param.content" :maxlength=64 type="textarea" size="small" :rows="4" placeholder="例如：1.日志1；2.日志2；最多可输入64个字符" />
        <!-- <span class="remark_column"> 例如：1.录入内容<br>2.录入</span> -->
      </div>

      <div class="action active">
        <span class="action_name">生效时间</span>
        <DatePicker type="date" style="width:296px" @on-change="formatActionDate" v-model="action.param.ymd" :readonly="action.param.edit" :class="{'activeTime':action.param.edit}" placement="bottom-end" placeholder="请选择"></DatePicker>
      </div>

      <div class="action" style="margin-bottom:84px">
        <span class="action_name">备注</span>
        <Input v-model="action.param.remark" :maxlength=32 type="textarea" size="small" :rows="4" placeholder="请输入运营日志名称；最多可输入32个字符" />
      </div>
    </Modal>

    <Modal  v-model="cost.model" width="416px" :title="cost.param.edit ? '编辑营销成本': '新建营销成本' " :loading="cost.loading" @on-ok="submitCost" @on-cancel="cancel">
      <div class="action">
        <span class="action_name" style="margin-left:22px;">关联活动</span>
        <Select v-model="cost.param.activity_id" style="width:250px" ref="cost_ref" :disabled="cost.param.edit" @on-change="changeCostTime(cost.param.activity_id)">
          <Option v-for="item in activityList" :value="item.activity_id" :key="item.activity_id">{{ item.activity_name }}</Option>
        </Select>
      </div>
      <div class="action">
        <span class="action_name" style="margin-left:22px;">活动时间</span>
        <Input v-model="cost.param.time" style="width: 250px" disabled/>
      </div>
      <div class="action">
        <span class="action_name">线下物料成本</span>
        <InputNumber v-model="cost.param.offline_mat_cost" :min="0" :max="99999999" placeholder="请输入金额"></InputNumber>
        元
      </div>
      <div class="action">
        <span class="action_name">线上推广成本</span>
        <InputNumber v-model="cost.param.online_ad_cost" :min="0" :max="99999999" placeholder="请输入金额"></InputNumber>
        元
      </div>
      <div class="action">
        <span class="action_name" style="padding-right:26px;margin-left:35px;">券成本</span>
        <InputNumber v-model="cost.param.coupon_cost" :min="0" :max="99999999" placeholder="请输入金额"></InputNumber>
        元
      </div>
      <div class="action" style="margin-bottom:100px;">
        <span class="action_name" style="padding-right:24px;margin-left:24px;">其他成本</span>
        <InputNumber v-model="cost.param.other_cost" :min="0" :max="99999999" placeholder="请输入金额"></InputNumber>
        元
      </div>
    </Modal>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { sort } from "@/utils/filter.js";

export default {
  data() {
    let _this = this;
    return {
      market_id: this.$route.query.market_id || 12555,
      action: {
        list: [],
        pageList: [],
        curPage: 1,
        param: {
          ymd: "",
          content: ""
        },
        period_start_time: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
        period_end_time: dayjs().format("YYYY-MM-DD"),
        model: false,
        loading: true,
        content: "",
        ymd: "",
        //   运营日志配置数据
        columns: [
          {
            title: "运营日志名称",
            key: "content"
          },
          {
            title: "生效时间",
            key: "ymd"
          },
          {
            title: "备注",
            key: "remark"
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    size: "small"
                  },
                  class: {
                    iconfont: true,
                    "icon-bianji": true
                  },
                  style: {
                    cursor: "pointer",
                    marginRight: "15px",
                    color: "#4C84FF"
                  },
                  on: {
                    click: () => {
                      let row = params.row;
                      this.action.param.edit = true;
                      this.action.param.id = row.id;
                      this.action.param.content = row.content;
                      this.action.param.remark = row.remark;
                      this.action.param.ymd = row.ymd;
                      this.action.model = true;
                    }
                  }
                }),
                h("Icon", {
                  props: {
                    size: "small"
                  },
                  class: {
                    iconfont: true,
                    "icon-shanchu": true
                  },
                  style: {
                    color: "#E4007F",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "确认要删除此运营日志？",
                        onOk: () => {
                          this.$api
                            .deleteMarketAction({ market_id: this.market_id, ymd: params.row.ymd })
                            .then(res => {
                              this.$Message.success("删除成功！");
                              this.toggleTabpan("action");
                            });
                        },
                        onCancel: () => { }
                      });
                    }
                  }
                })
              ]);
            }
          }
        ]
      },
      cost: {
        list: [],
        pageList: [],
        curPage: 1,
        param: {
          offline_mat_cost: 1,
          online_ad_cost: 1,
          coupon_cost: 1,
          other_cost: 1
        },
        model: false,
        loading: true,
        activity_name: "",
        period_start_time: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
        period_end_time: dayjs().format("YYYY-MM-DD"),
        columns: [
          {
            title: "活动名称",
            key: "activity_name",
            width: 130
          },
          {
            title: "活动时间",
            key: "time",
            width: 180
          },
          {
            title: "总成本（元）",
            key: "gross_cost",
            align: "right",
            width: 100
          },
          {
            title: "线下物料成本（元）",
            key: "offline_mat_cost",
            align: "right"
          },
          {
            title: "线上推广成本（元）",
            key: "online_ad_cost",
            align: "right"
          },
          {
            title: "券成本（元）",
            key: "coupon_cost",
            align: "right",
          },
          {
            title: "其他成本（元）",
            key: "other_cost",
            align: "right"
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            width: 100,
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    size: "small"
                  },
                  class: {
                    iconfont: true,
                    "icon-bianji": true
                  },
                  style: {
                    marginRight: "15px",
                    color: "#4C84FF",
                    cursor: "pointer",
                  },
                  on: {
                    click: () => {
                      let row = params.row;
                      this.cost.param = Object.assign({}, row);
                      this.cost.param.edit = true;
                      this.cost.model = true;
                    }
                  }
                }),
                h("Icon", {
                  props: {
                    size: "small"
                  },
                  class: {
                    iconfont: true,
                    "icon-shanchu": true
                  },
                  style: {
                    color: "#E4007F",
                    cursor: "pointer",
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "确认要删除此营销成本？",
                        onOk: () => {
                          this.$api
                            .delActivitycost({
                              market_id: this.market_id,
                              activity_id: params.row.activity_id
                            })
                            .then(res => {
                              this.$Message.success("删除成功！");
                              this.toggleTabpan("cost");
                            });
                        },
                        onCancel: () => { }
                      });
                    }
                  }
                })
              ]);
            }
          }
        ]
      },
      level: {
        overview: {
          list: [],
          indeterminate: false,
          checkAll: true,
          checkAllGroup: []
        },
        coupon: {
          list: [],
          indeterminate: false,
          checkAll: true,
          checkAllGroup: []
        },
        activityL1: {
          list: [],
          indeterminate: false,
          checkAll: true,
          checkAllGroup: []
        },
        activityL2: {
          list: [],
          indeterminate: false,
          checkAll: true,
          checkAllGroup: []
        }
      },
      activityName: "",
      activityList: [],
      activityObj: {},
      optionAction: [
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
                (dayjs(_this.action.period_start_time).valueOf() &&
                  dayjs()
                    .subtract(1, "year")
                    .valueOf())) ||
              date.valueOf() >
              dayjs(_this.action.period_start_time)
                .add(1, "month")
                .valueOf() ||
              date.valueOf() > Date.now() ||
              date.valueOf() < dayjs(_this.action.period_start_time).valueOf()
            );
          }
        }
      ],
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
                (dayjs(_this.cost.period_start_time).valueOf() &&
                  dayjs()
                    .subtract(1, "year")
                    .valueOf())) ||
              date.valueOf() >
              dayjs(_this.cost.period_start_time)
                .add(1, "month")
                .valueOf() ||
              date.valueOf() > Date.now() ||
              date.valueOf() < dayjs(_this.cost.period_start_time).valueOf()
            );
          }
        }
      ],
      changeDate: {
        period_start_time: (type, date) => {
          if (!_this[type].period_end_time) return;
          if (
            _this[type].period_start_time.valueOf() > _this[type].period_end_time.valueOf()
          ) {
            _this[type].period_end_time = null;
            return;
          }
          if (
            _this[type].period_start_time.valueOf() <
            dayjs(_this[type].period_end_time)
              .add(1, "month")
              .valueOf()
          ) {
            _this[type].period_end_time = null;
            return;
          }

          this[type].period_start_time = dayjs(date).format("YYYY-MM-DD");
          this[type].period_end_time = dayjs(_this[type].period_end_time).format("YYYY-MM-DD");
          this.toggleTabpan(type);
        },
        period_end_time: (type, date) => {
          this[type].period_start_time = dayjs(_this[type].period_start_time).format(
            "YYYY-MM-DD"
          );
          this[type].period_end_time = dayjs(date).format("YYYY-MM-DD");
          this.toggleTabpan(type);
        }
      },
    };
  },
  watch: {
    'level.overview.checkAllGroup': function (newV) {
      if (newV.length < this.level.overview.list.length) {
        this.level.overview.indeterminate = true;
      } else {
        this.level.overview.checkAll = true;
      }
    },
    'level.coupon.checkAllGroup': function (newV) {
      if (newV.length < this.level.coupon.list.length) {
        this.level.coupon.indeterminate = true;
      } else {
        this.level.coupon.checkAll = true;
      }
    },
    'level.activityL1.checkAllGroup': function (newV) {
      if (newV.length < this.level.activityL1.list.length) {
        this.level.activityL1.indeterminate = true;
      } else {
        this.level.activityL1.checkAll = true;
      }
    },
    'level.activityL2.checkAllGroup': function (newV) {
      if (newV.length < this.level.activityL2.list.length) {
        this.level.activityL2.indeterminate = true;
      } else {
        this.level.activityL2.checkAll = true;
      }
    }
  },
  methods: {
    changeCostTime(acticityId) {
      let time = this.activityObj[acticityId];
      if (!time) return;
      time.period_end_time = time.period_end_time || "至今";
      this.cost.param.time = `${time.period_start_time}~${
        time.period_end_time
        }`;
    },
    addModel(name) {
      this[name].model = true;
      this[name].param = {};
      this.$refs.cost_ref && this.$refs.cost_ref.clearSingleSelect();
      if (name === "cost") {
        this.cost.param = {
          offline_mat_cost: 1,
          online_ad_cost: 1,
          coupon_cost: 1,
          other_cost: 1
        };
      }
    },
    formatActionDate(time) {
      this.action.param.ymd = time;
    },
    formatCostDate(time) {
      this.cost.param.period_start_time = time[0];
      this.cost.param.period_end_time = time[1];
    },
    changeLoading(param) {
       param.loading = false;
       setTimeout(function(){
          param.loading = true;
       },0);
    },
    submitAction() {
      if (!this.action.param.content) {
        this.$Message.info("请填写运营日志！");
        return this.changeLoading(this.action);
      }

      if (!this.action.param.ymd) {
        this.$Message.info("请选择时间！");
        return this.changeLoading(this.action);
      }

      let hasAct = this.action.list.some(item => item.ymd === this.action.param.ymd);
      if (!this.action.param.edit && hasAct) {
        this.$Message.info('此时间已存在，请重新选择！');
        return this.changeLoading(this.action);
      }

      if (this.action.param.edit) {
        this.$api.updateMarketAction({market_id: this.market_id, ...this.action.param}).then(res => {
          this.$Message.success("运营日志修改成功");
          this.toggleTabpan("action");
        });
      } else {
        this.$api.addMarketAction({market_id: this.market_id, ...this.action.param}).then(res => {
          this.$Message.success("运营日志添加成功");
          this.toggleTabpan("action");
        });
      }
      this.action.loading = false;
      this.action.model = false;
    },
    submitCost() {
      if (!this.cost.param.activity_id) {
        var that = this;
        this.$Message.info("请选择活动！");
        this.changeLoading(this.cost);
        return;
      }
      let hasAct = this.cost.list.some(item => item.activity_id === this.cost.param.activity_id);
      if (!this.cost.param.edit && hasAct) {
        this.$Message.info('此活动已存在，请重新选择！');
        this.changeLoading(this.cost);
        return false;
      }

      if (this.cost.param.time) {
        let time = this.cost.param.time.split("~");
        this.cost.param.period_start_time = dayjs(time[0]).format("YYYY-MM-DD");
        this.cost.param.period_end_time = time[1] === "至今" ? null : time[1];
      }
      if (!this.cost.param.period_start_time) {
        this.$Message.info("请选择生效时间！");
        return this.changeLoading(this.cost);
      }
      this.cost.param.activity_name = this.activityObj[
        this.cost.param.activity_id
      ].activity_name;
      delete this.cost.param.time;
      if (this.cost.param.edit) {
        this.$api.updataActivityCost({market_id: this.market_id, ...this.cost.param}).then(res => {
          this.$Message.success("营销成本修改成功");
          this.toggleTabpan("cost");
        });
      } else {
        this.$api.addActivityCost({market_id: this.market_id, ...this.cost.param}).then(res => {
          this.$Message.success("营销成本添加成功");
          this.toggleTabpan("cost");
        });
      }
     // this.cost.loading = false;
      this.cost.model = false;
    },
    cancel() {
      _this.$refs.cost_ref && _this.$refs.cost_ref.clearSingleSelect();
      this.action.param = {};
      this.cost.param = {
        offline_mat_cost: 1,
        online_ad_cost: 1,
        coupon_cost: 1,
        other_cost: 1
      };
    },
    changePageAction(page) {
      this.action.pageList.splice(0, this.action.pageList.length);
      this.action.pageList = this.action.list.slice((page - 1) * 10, page * 10);
    },
    changePageCost(page) {
      this.cost.pageList.splice(0, this.cost.pageList.length);
      this.cost.pageList = this.cost.list.slice((page - 1) * 10, page * 10);
    },
    handleCheckAll(name) {
      let toggle = function (param) {
        if (param.indeterminate) {
          param.checkAll = true;
          param.indeterminate = false;
        } else {
          param.checkAll = !param.checkAll;
        }
        if (param.checkAll) {
          param.checkAllGroup = param.list.map(item => item.dim_id);
        } else {
          param.checkAllGroup = param.list
            .filter(item => item.editable === "F")
            .map(item => item.dim_id);
        }
      };
      toggle(this.level[name]);
    },
    overviewCheckAllGroupChange(data) {
      this.level.overview.checkAllGroup = data;
      this.level.overview.checkAll =
        data.length === this.level.overview.list.length;
      this.level.overview.indeterminate = !(
        data.length === this.level.overview.list.length
      );
    },
    activityL1CheckAllGroupChange(data) {
      this.level.activityL1.checkAllGroup = data;
      this.level.activityL1.checkAll =
        data.length === this.level.activityL1.list.length;
      this.level.activityL1.indeterminate = !(
        data.length === this.level.activityL1.list.length
      );
    },
    activityL2CheckAllGroupChange(data) {
      this.level.activityL2.checkAllGroup = data;
      this.level.activityL2.checkAll =
        data.length === this.level.activityL2.list.length;
      this.level.activityL2.indeterminate = !(
        data.length === this.level.activityL2.list.length
      );
    },
    couponCheckAllGroupChange(data) {
      this.level.coupon.checkAllGroup = data;
      this.level.coupon.checkAll =
        data.length === this.level.coupon.list.length;
      this.level.coupon.indeterminate = !(
        data.length === this.level.coupon.list.length
      );
    },
    handleApply(name, data) {
      let _this = this;
      let format = function (name, data, activityList) {
        if (activityList) {
          _this.level[name] = { list: [] };
          _this.level[name].list = activityList;
        }
        _this.level[name].list.forEach(item => {
          item.market_id = _this.market_id;
          let ifShow = data.some(d => d === item.dim_id);
          item.dim_val = ifShow ? "T" : "F";
        });
        _this.$api.insertSysLevels(_this.level[name].list).then(res => {
          _this.$store.commit(`update${name}`, _this.level[name].list);
          _this.$Message.success("指标维度设置成功！");
        });
      };
      if (name === "activity") {
        let activityList = [];
        Object.keys(data).forEach(item => {
          activityList.push(..._this.level[`activity${item}`].list);
        });
        let selectArr = [];
        for (let key in data) {
          selectArr.push(...data[key])
        }
        format(name, selectArr, activityList);
      } else {
        format(name, data);
      }
    },
    getActivityList(param, cb) {
      let _this = this;
      this.$api.getActivityList({market_id: this.market_id, ...param}).then(res => {
        this.activityList = res;
        res.forEach(item => {
          _this.activityObj[item.activity_id] = item;
        });
        if (cb) cb();
      });
    },
    async toggleTabpan(name) {
      let _this = this;
      if (name === "action") {
        await this.$api
          .getMarketActions({
            market_id: this.market_id,
            content: this.action.content,
            period_start_time: dayjs(this.action.period_start_time).format("YYYY-MM-DD"),
            period_end_time: dayjs(this.action.period_end_time).format("YYYY-MM-DD")
          })
          .then(res => {
            let activitys = [];
            res.forEach(item => {
              if (item.act_id)
                item.activity_name = _this.activityObj[item.act_id]
                  ? _this.activityObj[item.act_id].activity_name
                  : "--";
              if (!item.val_begin) {
                item.date = "--";
              } else {
                item.val_end = item.val_end || "至今";
                item.date = `${item.val_begin}~${item.val_end}`;
              }
            });
            this.action.list = res;
            this.action.pageList = res.slice(0, 10);
          });
      } else if (name === "cost") {
        await this.$api
          .getActivityCost({
            market_id: this.market_id,
            activity_name: this.cost.activity_name,
            period_start_time: dayjs(this.cost.period_start_time).format("YYYY-MM-DD"),
            period_end_time: dayjs(this.cost.period_end_time).format("YYYY-MM-DD")
          })
          .then(res => {
            res.forEach(item => {
              if (item.act_id)
                item.activity_name =
                  _this.activityObj[item.act_id].activity_name;
              if (!item.period_start_time) {
                item.time = "--";
              } else {
                item.period_end_time = item.period_end_time || "至今";
                item.time = `${item.period_start_time}~${item.period_end_time}`;
              }
            });
            this.cost.list = res;
            this.cost.pageList = res.slice(0, 10);
          });
      } else if (name === "level") {
        let _this = this;
        await this.$store.dispatch("getLevels", {market_id: this.market_id}).then(() => {
          let levels = _this.$store.state.BI.levels;
          this.level.overview.list = levels.overview;
          this.level.coupon.list = levels.coupon;
          this.level.activityL1.list = levels.activityL1;
          this.level.activityL2.list = levels.activityL2;
          this.level.overview.checkAllGroup = sort(
            levels.overview,
            "disp_order",
            "asc"
          ).filter(item => item.default_val === 'T').map(item => item.dim_id);
          this.level.coupon.checkAllGroup = sort(
            levels.coupon,
            "disp_order",
            "asc"
          ).filter(item => item.default_val === 'T').map(item => item.dim_id);
          this.level.activityL1.checkAllGroup = sort(
            levels.activityL1,
            "disp_order",
            "asc"
          ).filter(item => item.default_val === 'T').map(item => item.dim_id);
          this.level.activityL2.checkAllGroup = sort(
            levels.activityL2,
            "disp_order",
            "asc"
          ).filter(item => item.default_val === 'T').map(item => item.dim_id);
        });
      }
    }
  },
  async created() {
    await this.getActivityList({ status: 1 }, () => {
      this.toggleTabpan("action");
    });
  }
};
</script>
<style lang="scss" >
@import "@/assets/style/components/filterBox.scss";
.allocation_container {
  .allocation_title {
    width: 100%;
    height: 14px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(42, 57, 98, 1);
    line-height: 14px;
  }
  .allocation_tabs {
    margin-top: 16px;
  }

  // 模块样式
  .allocation_pages {
    margin: 1rem 0;
    .data_page_title {
      width: 100%;
      height: 12px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(42, 57, 98, 1);
      line-height: 12px;
    }
    .indicators_dimension {
      width: 100%;
      height: 12px;
      font-size: 12px;
      font-family: MicrosoftYaHei-Bold;
      color: rgba(102, 102, 102, 1);
      line-height: 12px;
      margin: 1.5rem 0 1.5rem 1rem;
    }
    .check_all {
      margin: -0.5rem 0 2rem 1rem;
      border-bottom: 0 !important;
    }
    .ivu-checkbox-group {
      margin: 0 0 2rem 1rem;
      .ivu-checkbox-wrapper {
        margin: 0 3rem 0.5rem 0;
        width: 120px;
      }
    }
    .apply {
      display: block;
      cursor: pointer;
      width: 72px;
      height: 24px;
      background: rgba(57, 111, 255, 1);
      border-radius: 12px;
      outline: 0;
      border: 0;
      margin: -1.5rem 0 0 1rem;
      color: #ffffff;
    }
  }
}
</style>
