<template>
    <div class="allocation_container">
        <p class="allocation_title">系统设置详情</p>
        <Tabs class="allocation_tabs" @on-click="toggleTabpan" value="action">
            <!-- 动作配置 -->
            <TabPane label="动作配置" name="action">
	    				<div class="allocation-time">
                    <span style="float:left;margin-top:0.4rem">时间：</span>
                    <Row>
                        <Col span="12">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="请选择时间范围"
													@on-change="searchAction"  style="width: 180px"></DatePicker>
                        </Col>
                    </Row>
                    <Input suffix="ios-search" placeholder="请输入动作名称"
														v-model="action.action_name"
														@on-enter="toggleTabpan('action')"
                           style="width: auto;border:1px solid #F2F2F2;border-radius:16px;"/>
              </div>
								<div class="action_container">
										<button class="new_action ios-add" type="button" @click="addModel('action')">
												<Icon type="ios-add"/>
												<span>新建</span>
										</button>
								</div>
                <Table :columns="action.columns" :data="action.pageList"></Table>
                <div class="table_page">
                    <div class="table_page_l">
                        <p>共 <span>{{action.list.length}}</span> 条数据</p>
                    </div>
                    <div class="table_page_r">
        								<Page :total="action.list.length" :current.sync="action.curPage" :page-size="10" show-elevator @on-change="changePageAction"/>
                    </div>
                </div>
            </TabPane>
            <!-- 营销成本 -->
            <TabPane label="营销成本" name="cost">
                <div class="allocation-time">
                    <span style="float:left;margin-top:0.4rem">时间：</span>
                    <Row>
                        <Col span="12">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="请选择"
                          @on-change="searchCost"
                                    style="width: 180px"></DatePicker>
                        </Col>
                    </Row>
                    <Input suffix="ios-search" placeholder="请输入活动名称"
                            v-model="cost.action_name"
														@on-enter="toggleTabpan('cost')"
                           style="width: auto;border:1px solid #F2F2F2;border-radius:16px;"/>
                </div>
                <div class="action_container">
										<button class="new_action ios-add" type="button" @click="addModel('cost')">
												<Icon type="ios-add"/>
												<span>新建</span>
										</button>
								</div>
                <Table :columns="cost.columns" :data="cost.pageList"></Table>

                <div class="table_page">
                    <div class="table_page_l">
                        <p>共 <span>{{cost.list.length}}</span> 条数据</p>
                    </div>
                    <div class="table_page_r">
        								<Page :total="cost.list.length" :current.sync="cost.curPage" :page-size="10" show-elevator @on-change="changePageCost"/>
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
                    <div class="check_all "
                         style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <Checkbox
                                :indeterminate="level.overview.indeterminate"
                                :value="level.overview.checkAll"
                                @click.prevent.native="handleCheckAll('overview')">全选
                        </Checkbox>
                    </div>
                    <CheckboxGroup v-model="level.overview.checkAllGroup" @on-change="overviewCheckAllGroupChange">
                        <Checkbox v-for="(item, index) in level.overview.list" :key="index" :label="item.dim_id">{{item.dim_name}}</Checkbox>
                    </CheckboxGroup>
                    <input class="apply" type="button" @click="handleApply('overview', level.overview.checkAllGroup)" value="应用">
                </div>
                <!-- 模块2 -->
                <div class="allocation_pages">
                    <p class="data_page_title">2. 活动效果分析页-表头配置</p>
                    <p class="indicators_dimension">1）指标维度（上表）</p>
                    <!-- 选择框 -->
										<div class="check_all "
                         style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <Checkbox
                                :indeterminate="level.activityL1.indeterminate"
                                :value="level.activityL1.checkAll"
                                @click.prevent.native="handleCheckAll('activityL1')">全选
                        </Checkbox>
                    </div>
                    <CheckboxGroup v-model="level.activityL2.checkAllGroup" @on-change="activityL1CheckAllGroupChange">
                        <Checkbox v-for="(item, index) in level.activityL1.list" :key="index" :label="item.dim_id">{{item.dim_name}}</Checkbox>
                    </CheckboxGroup>

                    <p class="indicators_dimension">2）指标维度（下表）</p>
                    <!-- 选择框 -->
                    <div class="check_all "
                         style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <Checkbox
                                :indeterminate="level.activityL2.indeterminate"
                                :value="level.activityL2.checkAll"
                                @click.prevent.native="handleCheckAll('activityL2')">全选
                        </Checkbox>
                    </div>
                    <CheckboxGroup v-model="level.activityL2.checkAllGroup" @on-change="activityL2CheckAllGroupChange">
                        <Checkbox v-for="(item, index) in level.activityL2.list" :key="index" :label="item.dim_id">{{item.dim_name}}</Checkbox>
                    </CheckboxGroup>
                    <input class="apply" type="button" @click="handleApply('activity', {L1:level.activityL1.checkAllGroup, L2: level.activityL2.checkAllGroup})" value="应用">
                </div>
                <!-- 模块3 -->
                <div class="allocation_pages">
                    <p class="data_page_title">3. 券效果分析页-表头配置</p>
                    <p class="indicators_dimension">指标维度</p>
                    <!-- 选择框 -->
                    <div class="check_all "
                         style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <Checkbox
                                :indeterminate="level.coupon.indeterminate"
                                :value="level.coupon.checkAll"
                                @click.prevent.native="handleCheckAll('coupon')">全选
                        </Checkbox>
                    </div>
                    <CheckboxGroup v-model="level.coupon.checkAllGroup" @on-change="couponCheckAllGroupChange">
                        <Checkbox v-for="(item, index) in level.coupon.list" :key="index" :disabled="item.editable==='F'" :label="item.dim_id">{{item.dim_name}}</Checkbox>
                    </CheckboxGroup>
                    <input class="apply" type="button" @click="handleApply('coupon', level.coupon.checkAllGroup)" value="应用">
                </div>
            </TabPane>
        </Tabs>
			
			<Modal
						v-model="action.model"
						width="416px"
						title="新建动作"
            :loading="action.loading"
						@on-ok="submitAction"
						@on-cancel="cancel"
            >
				<div class="action"><span class="action_name">动作名称</span>
						<input v-model="action.param.action_name"  placeholder="请输入动作名称"/>
				</div>
				<div class="action"><span class="action_name">关联活动</span>
						<Select v-model="action.param.act_id" style="width:296px">
								<Option v-for="item in activityList" :value="item.activity_id" :key="item.activity_id">{{ item.activity_name }}</Option>
						</Select>
				</div>
				<div class="action"><span class="action_name">生效时间</span>
						<DatePicker type="daterange" @on-change="formatActionDate" v-model="action.param.time" placement="bottom-end" placeholder="请选择" style="width: 296px"></DatePicker>
				</div>
			</Modal>

      <Modal
						v-model="cost.model"
						width="416px"
						title="新建营销成本"
            :loading="cost.loading"
						@on-ok="submitCost"
						@on-cancel="cancel"
            >
				<div class="action"><span class="action_name">关联活动</span>
						<Select v-model="cost.param.activity_id" style="width:296px" :disabled="cost.param.edit" @on-change="changeCostTime(cost.param.activity_id)">
							<Option v-for="item in activityList" :value="item.activity_id" :key="item.activity_id">{{ item.activity_name }}</Option>
						</Select>
				</div>
				<div class="action"><span class="action_name">活动时间</span>
            <Input v-model="cost.param.time" disabled />
						<!-- <DatePicker type="daterange" @on-change="formatCostDate" v-model="cost.param.time" placement="bottom-end" placeholder="请选择" style="width: 296px"></DatePicker> -->
				</div>
        <div class="action"><span class="action_name">线下物料成本</span>
						<InputNumber v-model="cost.param.offline_mat_cost"  placeholder="请输入金额"></InputNumber>元
				</div>
        <div class="action"><span class="action_name">线上推广成本</span>
						<InputNumber v-model="cost.param.online_ad_cost"  placeholder="请输入金额"></InputNumber>元
				</div>
        <div class="action"><span class="action_name">券成本</span>
						<InputNumber v-model="cost.param.coupon_cost"  placeholder="请输入金额"></InputNumber>元
				</div>
        <div class="action"><span class="action_name">其他成本</span>
						<InputNumber v-model="cost.param.other_cost"  placeholder="请输入金额"></InputNumber>元
				</div>
			</Modal>
    </div>
</template>
<script>
import newAction from "@/components/newAction.vue";
import dayjs from "dayjs";

export default {
  components: {
    newAction
  },
  data() {
    return {
      action: {
        list: [],
        pageList: [],
        curPage: 1,
        param: {},
        model: false,
        loading: true,
        action_name: "",
        val_begin: "",
        val_end: "",
        //   动作配置数据
        columns: [
          {
            title: "动作名称",
            key: "action_name"
          },
          {
            title: "关联活动",
            key: "activity_name"
          },
          {
            title: "生效时间",
            key: "date"
          },
          {
            title: "操作",
            key: "action",
            width: 150,
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
                    marginRight: "15px",
                    color: "#4C84FF"
                  },
                  on: {
                    click: () => {
                      let row = params.row;
                      this.action.param.id = row.id;
                      this.action.param.action_name = row.action_name;
                      this.action.param.act_id = row.act_id;
                      this.action.param.time = [row.val_begin, row.val_end];
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
                    color: "#E4007F"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "确认要删除此动作？",
                        onOk: () => {
                          this.$api
                            .deleteMarketAction({ id: params.row.id })
                            .then(res => {
                              this.$Message.success("删除成功！");
                              this.toggleTabpan("action");
                            });
                        },
                        onCancel: () => {}
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
        action_name: "",
        period_start_time: "",
        period_end_time: "",
        columns: [
          {
            title: "活动名称",
            key: "activity_name"
          },
          {
            title: "活动时间",
            key: "date"
          },
          {
            title: "总成本",
            key: "gross_cost"
          },
          {
            title: "线下物料成本",
            key: "offline_mat_cost"
          },
          {
            title: "线上推广成本",
            key: "online_ad_cost"
          },
          {
            title: "券成本",
            key: "coupon_cost"
          },
          {
            title: "其他成本",
            key: "other_cost"
          },
          {
            title: "操作",
            key: "action",
            width: 150,
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
                    marginRight: "15px",
                    color: "#4C84FF"
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
                    color: "#E4007F"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "确认要删除此营销成本？",
                        onOk: () => {
                          this.$api
                            .delActivitycost({ activity_id: params.row.activity_id })
                            .then(res => {
                              this.$Message.success("删除成功！");
                              this.toggleTabpan("cost");
                            });
                        },
                        onCancel: () => {}
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
      activityObj: {}
    };
  },
  methods: {
    changeCostTime(acticityId) {
      let time = this.activityObj[acticityId];
      if (!time) return;
      time.period_end_time = time.period_end_time || '至今';
      this.cost.param.time = `${time.period_start_time}~${time.period_end_time}`;
    },
    addModel(name) {
      this[name].model = true;
      this[name].param = {};
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
      this.action.param.val_begin = time[0];
      this.action.param.val_end = time[1];
    },
    formatCostDate(time) {
      this.cost.param.period_start_time = time[0];
      this.cost.param.period_end_time = time[1];
    },
    changeLoading(param) {
      param.loading = false;
      this.$nextTick(() => {
        param.loading = true;
      });
    },
    submitAction() {
      if (!this.action.param.action_name) {
        this.$Message.info("请填写动作名称！");
        return this.changeLoading(this.action);
      }
      if (!this.action.param.act_id) {
        this.$Message.info("请选择活动！");
        return this.changeLoading(this.action);
      }
      if (this.action.param.time.length > 0) {
        let time = this.action.param.time;
        this.action.param.val_begin = dayjs(time[0]).format("YYYY-MM-DD");
        this.action.param.val_end = dayjs(time[1]).format("YYYY-MM-DD");
      }
      if (!this.action.param.val_begin) {
        this.$Message.info("请选择生效时间！");
        return this.changeLoading(this.action);
      }
      if (this.action.param.id) {
        this.$api.updateMarketAction(this.action.param).then(res => {
          this.$Message.success("动作修改成功");
          this.toggleTabpan("action");
        });
      } else {
        this.$api.addMarketAction(this.action.param).then(res => {
          this.$Message.success("动作添加成功");
          this.toggleTabpan("action");
        });
      }
      this.action.loading = false;
      this.action.model = false;
    },
    submitCost() {
      if (!this.cost.param.activity_id) {
        this.$Message.info("请选择活动！");
        return this.changeLoading(this.cost);
      }

      debugger
      if (this.cost.param.time) {
        let time = this.cost.param.time.split('~');
        this.cost.param.period_start_time = dayjs(time[0]).format("YYYY-MM-DD");
        this.cost.param.period_end_time = (time[1] === '至今' ? null : time[1]);
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
        this.$api.updataActivityCost(this.cost.param).then(res => {
          this.$Message.success("营销成本修改成功");
          this.toggleTabpan("cost");
        });
      } else {
        this.$api.addActivityCost(this.cost.param).then(res => {
          this.$Message.success("营销成本添加成功");
          this.toggleTabpan("cost");
        });
      }
      this.cost.loading = false;
      this.cost.model = false;
    },
    searchAction(time) {
      this.action.val_begin = time[0];
      this.action.val_end = time[1];
      this.toggleTabpan("action");
    },
    searchCost(time) {
      this.cost.period_start_time = time[0];
      this.cost.period_end_time = time[1];
      this.toggleTabpan("cost");
    },
    cancel() {
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
      let toggle = function(param) {
        if (param.indeterminate) {
          param.checkAll = false;
        } else {
          param.checkAll = !param.checkAll;
        }
        param.indeterminate = false;
        if (param.checkAll) {
          param.checkAllGroup = param.list.map(item => item.dim_id);
        } else {
          param.checkAllGroup = [];
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
      this.level[name].list.forEach(item => {
        item.market_id = 12555;
        let ifShow = data.some(d => d === item.dim_id)
        item.default_val = ifShow ? 'T' : 'F'
      })
      this.$api.insertSysLevels(this.level[name].list).then(res => {
        sessionStorage.setItem(name, JSON.stringify(this.level[name].list));
        this.$Message.success("指标维度设置成功！");
      });
    },
    getActivityList(param, cb) {
      let _this = this;
      this.$api.getActivityList(param).then(res => {
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
            action_name: this.action.action_name,
            val_begin: this.action.val_begin,
            val_end: this.action.val_end
          })
          .then(res => {
            res.forEach(item => {
              if (item.act_id)
                item.activity_name = _this.activityObj[item.act_id]
                  ? _this.activityObj[item.act_id].activity_name
                  : "--";
              if (!item.val_begin) {
                item.date = "--";
              } else {
                item.val_end = item.val_end || '至今'
                item.date = `${item.val_begin}~${item.val_end}`;
              }
            });
            this.action.list = res;
            this.action.pageList = res.slice(0, 10);
          });
      } else if (name === "cost") {
        await this.$api
          .getActivityCost({
            action_name: this.cost.action_name,
            period_start_time: this.cost.period_start_time,
            period_end_time: this.cost.period_end_time
          })
          .then(res => {
            res.forEach(item => {
              if (item.act_id)
                item.activity_name =
                  _this.activityObj[item.act_id].activity_name;
              if (!item.period_start_time) {
                item.time = "--";
              } else {
                item.period_end_time = item.period_end_time || '至今'
                item.time = `${item.period_start_time}~${
                  item.period_end_time
                }`;
              }
            });
            this.cost.list = res;
            this.cost.pageList = res.slice(0, 10);
          });
      } else if (name === "level") {
        this.$api.getSysLevels({}).then(res => {
          let [overview, coupon, activityL1, activityL2] = [
            res.filter(item => item.dim_grp === 'sale.overview'),
            res.filter(item => item.dim_grp === 'sale.coupon'),
            res.filter(item => item.dim_grp === 'sale.activity.1'),
            res.filter(item => item.dim_grp === 'sale.activity.2'),
          ];
          this.level.overview.list = overview;
          this.level.coupon.list = coupon;
          this.level.activityL1.list = activityL1;
          this.level.activityL2.list = activityL2;
          this.level.overview.checkAllGroup = overview.map(item => item.dim_id);
          this.level.coupon.checkAllGroup = coupon.map(item => item.dim_id);
          this.level.activityL1.checkAllGroup = activityL1.map(
            item => item.dim_id
          );
          this.level.activityL2.checkAllGroup = activityL2.map(
            item => item.dim_id
          );
          sessionStorage.setItem("coupon", JSON.stringify(coupon));
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
<style lang="scss" scoped>
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
        width: 85px;
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
