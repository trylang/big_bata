<template>
  <div class="allocation_container">
      <p class="allocation_title">系统设置详情</p>
      <Tabs class="allocation_tabs" value="name1">
        <TabPane label="动作配置" name="name1">
            <input class="new_action" type="button" value="+ 新建">
            <Table border :columns="columns1" :data="data1"></Table>
             <!-- Table分页 -->
            <div class="table_page">
                <div class="table_page_l">
                    <p>共 <span>20</span> 条数据</p>
                    <!-- <div class="drop_down">10</div> -->
                    <!-- <Icon class="drop_arrows" type="ios-arrow-down" /> -->
                </div>
                <div class="table_page_r">
                    <Page :total="100" show-elevator  @on-chang="changePage"/>
                 </div>
            </div>
        </TabPane>
        <TabPane label="营销成本" name="name2">
            <input class="new_action" type="button" value="+ 新建">
            <Table border :columns="columns2" :data="data2"></Table>
             <!-- Table分页 -->
            <div class="table_page">
                <div class="table_page_l">
                    <p>共 <span>20</span> 条数据</p>
                    <!-- <div class="drop_down">10</div> -->
                    <!-- <Icon class="drop_arrows" type="ios-arrow-down" /> -->
                </div>
                <div class="table_page_r">
                    <Page :total="100" show-elevator  @on-chang="changePage"/>
                 </div>
            </div>
        </TabPane>
        <TabPane label="指标维度" name="name3">
        <!-- 模块1 -->
        <div class="allocation_pages">
            <p class="data_page_title">1. 数据概览页-表头配置</p>
            <p class="indicators_dimension">指标维度</p>
            <!-- 选择框 -->
            <div class="check_all " style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup  v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
            </CheckboxGroup>
            <input class="apply" type="button" value="应用">
        </div>
        <!-- 模块2 -->
        <div class="allocation_pages">
            <p class="data_page_title">2. 活动效果分析页-表头配置</p>
            <p class="indicators_dimension">指标维度</p>
            <!-- 选择框 -->
            <div class="check_all " style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup  v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
            </CheckboxGroup>
            <input class="apply" type="button" value="应用">
        </div>
        <!-- 模块3 -->
        <div class="allocation_pages">
            <p class="data_page_title">3. 券效果分析页-表头配置</p>
            <p class="indicators_dimension">指标维度</p>
            <!-- 选择框 -->
            <div class="check_all " style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup  v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
            </CheckboxGroup>
            <input class="apply" type="button" value="应用">
        </div>
        <!-- 模块4 -->
        <div class="allocation_pages">
            <p class="data_page_title">4. 会员经营分析页-表头配置</p>
            <p class="indicators_dimension">指标维度</p>
            <!-- 选择框 -->
            <div class="check_all " style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup  v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流1"></Checkbox>
                <Checkbox label="客流2"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
                <Checkbox label="客流3"></Checkbox>
            </CheckboxGroup>
            <input class="apply" type="button" value="应用">
        </div>
        </TabPane>
    </Tabs>
      </div>
</template>
<script>
export default {
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ["客流1", "客流2", "客流3"],
      //   动作配置数据
      columns1: [
        {
          title: "动作名称",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "关联活动",
          key: "events"
        },
        {
          title: "生效时间",
          key: "time"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "100元代金券",
          events: "五一活动",
          time: "2018.06.01"
        },
        {
          name: "五折折扣券",
          events: "端午活动",
          time: "2018.06.01"
        },
        {
          name: "五元代金券",
          events: "周年庆",
          time: "2018.06.01"
        },
        {
          name: "满100元减去30券",
          events: "年中大促",
          time: "2018.06.01"
        }
      ],
      columns2: [
        {
          title: "动作名称",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "活动时间",
          key: "time"
        },
        {
          title: "总成本",
          key: "total"
        },
        {
          title: "线下物料成本",
          key: "material"
        },
        {
          title: "线上推广成本",
          key: "promote"
        },
        {
          title: "券成本",
          key: "ticket"
        },
        {
          title: "其他成本",
          key: "else"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      data2: [
        {
          name: "五一活动",
          time: "2018.06.01",
          total:284456,
          material:4576,
          promote:4576,
          ticket:4576,
          else:46746
        },
        {
          name: "五一活动",
          time: "2018.06.01",
          total:284456,
          material:4576,
          promote:4576,
          ticket:4576,
          else:46746
        },
        {
          name: "五一活动",
          time: "2018.06.01",
          total:284456,
          material:4576,
          promote:4576,
          ticket:4576,
          else:46746
        },
        {
          name: "五一活动",
          time: "2018.06.01",
          total:284456,
          material:4576,
          promote:4576,
          ticket:4576,
          else:46746
        }
      ]
    };
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["客流1", "客流2", "客流3"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 3) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    // 动作配置表格
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data[index].name}<br>Age：${
          this.data[index].evebts
        }<br>Address：${this.data[index].time}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    changePage(page) {
      console.log(page);
    }
  }
};
</script>
<style lang="scss" scoped>
.allocation_container {
  .allocation_title {
    width: 84px;
    height: 14px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(42, 57, 98, 1);
    line-height: 14px;
  }
  .allocation_tabs {
    margin-top: 10px;
  }

  // 动作配置
  .ivu-tabs-tabpane {
    .new_action {
      width: 72px;
      height: 24px;
      background: rgba(57, 111, 255, 1);
      border-radius: 12px;
      border: 0;
      outline: 0;
      color: #ffffff;
    }
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
      width: 48px;
      height: 12px;
      font-size: 12px;
      font-family: MicrosoftYaHei-Bold;
      color: rgba(102, 102, 102, 1);
      line-height: 12px;
      margin: 1rem 0 2rem 1rem;
    }
    .check_all {
      margin: -1rem 0 2rem 1rem;
      border-bottom: 0 !important;
    }
    .ivu-checkbox-group {
      margin: 0 0 2rem 1rem;
      .ivu-checkbox-wrapper {
        margin: 0 4.2rem 0.5rem 0;
      }
    }
    .apply {
      display: block;
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
<style>
.ivu-table-cell {
  padding-left: 14px;
  padding-right: 0px;
}
.indicators_dimension {
  font-weight: bold;
}
.ivu-tabs-ink-bar{
        width: 56px!important;
}
.ivu-tabs-nav .ivu-tabs-tab{
    padding: 10px 1px;
}
.ivu-tabs-nav-scroll{
    height:41px
}
</style>
