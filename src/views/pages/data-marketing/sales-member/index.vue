<template>
	<div id="table_container">
		<Row class="number_data"> 
			<div class="number_header">
				<span class="number_title">会员数据</span>
			</div>
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">注册会员参与数</span>
					<p>
						<span>参与总数：</span>
						<strong>{{chartData.number.reg_members}}</strong>
					</p>
				</div>
				<div class="item_content">
					<div id="number_channel_chart1" :style="{width: '550px', height: '400px'}"></div>
					<div id="number_channel_chart2" :style="{width: '550px', height: '400px'}"></div>
				</div>
				
			</Col> 
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">新增注册会员参与数</span>
					<p>
						<span>参与总数：</span>
						<strong>{{chartData.number.add_members}}</strong>
					</p>
				</div>
				<div class="item_content">
					<div id="number_channel_chart3" :style="{width: '550px', height: '400px'}"></div>
					<div id="number_channel_chart4" :style="{width: '550px', height: '400px'}"></div>
				</div>
			</Col> 
		</Row>

		<Row class="number_data">
			<div class="number_header">
				<span class="number_title">数据展示</span>
				<div class="select">
					<span>活动：</span>
					<Select class="select_option" clearable  v-model="param.activity_id">
						<Option v-for="(item, index) in [{id: 1, value: '五一活动'}]" :value="item.id" :key="index">
							{{item.value}}
						</Option>
					</Select>
				</div>
			</div>
			<div class="number_content">
				<div id="number_channel_chart5" :style="{width: '1200px', height: '400px'}"></div>
			</div>
		</Row>

    <Row class="number_data">
			<div class="number_header">
				<span class="number_title">带参二维码详情</span>
			</div>
			<div class="number_content">
            <Table :columns="tableData.qrcord.columns" :data="tableData.qrcord.pageList" @on-sort-change="handleQrcordSort"></Table>
        <div class="table_page">
          <div class="table_page_l">
              <p>共 <span>{{tableData.qrcord.list.length}}</span> 条数据</p>
          </div>
          <div class="table_page_r">
              <Page :total="tableData.qrcord.list.length" :current.sync="tableData.qrcord.curPage" :page-size="10" show-elevator
                    @on-change="changeQrcordPage"/>
          </div>
        </div>
      </div>
		</Row>

    <Row class="number_data">
			<div class="number_header">
				<span class="number_title">参与会员来源详情</span>
			</div>
			<div class="number_content">
        <Tabs class="allocation_tabs" value="activity">
          <TabPane label="活  动" name="activity">
            <Table width="100%" v-if="tableData.activity.columns.length>1" :columns="tableData.activity.columns" :data="tableData.activity.pageList" @on-sort-change="handleActivitySort"></Table>
            <div class="table_page">
              <div class="table_page_l">
                  <p>共 <span>{{tableData.activity.list.length}}</span> 条数据</p>
              </div>
              <div class="table_page_r">
                  <Page :total="tableData.activity.list.length" :current.sync="tableData.activity.curPage" :page-size="10" show-elevator
                        @on-change="changeActivityPage"/>
              </div>
            </div>
          </TabPane>
          <TabPane label="渠  道" name="channel">
            <Table v-if="tableData.channel.columns.length>1" :columns="tableData.channel.columns" :data="tableData.channel.pageList" @on-sort-change="handleChannelSort"></Table>
            <div class="table_page">
              <div class="table_page_l">
                  <p>共 <span>{{tableData.channel.list.length}}</span> 条数据</p>
              </div>
              <div class="table_page_r">
                  <Page :total="tableData.channel.list.length" :current.sync="tableData.channel.curPage" :page-size="10" show-elevator
                        @on-change="changeChannelPage"/>
              </div>
            </div>
          </TabPane>
        </Tabs>
        
      </div>
		</Row>

		<Row class="number_data">
			<div class="number_header">
				<span class="number_title">其他数据展示</span>
			</div>
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">年内到访频次</span>
				</div>
				<div class="item_content">
					<div id="number_other_chart1" :style="{width: '550px', height: '400px'}"></div>
				</div>		
			</Col> 
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">年内逛店偏好</span>
				</div>
				<div class="item_content">
					<div id="number_other_chart2" :style="{width: '550px', height: '400px'}"></div>
				</div>
			</Col> 
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">性别比例</span>
				</div>
				<div class="item_content">
					<div id="number_other_chart3" :style="{width: '550px', height: '400px'}"></div>
				</div>	
			</Col>
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">年龄分布</span>
				</div>
				<div class="item_content">
					<div id="number_other_chart4" :style="{width: '550px', height: '400px'}"></div>
				</div>	
			</Col>
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">职业分布</span>
				</div>
				<div class="item_content">
					<div id="number_other_chart5" :style="{width: '550px', height: '400px'}"></div>
				</div>	
			</Col>
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">学历分布</span>
				</div>
				<div class="item_content">
					<div id="number_other_chart6" :style="{width: '550px', height: '400px'}"></div>
				</div>	
			</Col>
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">私家车拥有情况</span>
				</div>
				<div class="item_content">
					<div id="number_other_chart7" :style="{width: '550px', height: '400px'}"></div>
				</div>	
			</Col>
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">消费能力分布</span>
				</div>
				<div class="item_content">
					<div id="number_other_chart8" :style="{width: '550px', height: '400px'}"></div>
				</div>	
			</Col>
		</Row>

	</div>
</template>
<script>
import { sort, createProxy } from "@/utils/filter.js";
export default {
  data() {
    return {
      chartData: {
        number: {},
        activity: [],
        sourcesAct: [],
        sourcesChnnl: [],
        dist: []
      },
      tableData: {
        qrcord: {
          columns: [
            {
              title: "ID",
              key: ""
            },
            {
              title: "二维码名称",
              key: ""
            },
            {
              title: "渠道",
              key: ""
            },
            {
              title: "创建时间",
              key: ""
            },
            {
              title: "链接地址",
              key: ""
            },
            {
              title: "累计数",
              key: ""
            },
            {
              title: "关联合同注册",
              key: ""
            },
            {
              title: "简介",
              key: ""
            }
          ],
          list: [],
          pageList: [],
          curPage: 1
        },
        activity: {
          columns: [
            {
              title: "来源/日期",
              key: "stat_ymd",
              width: 120,
              fixed: "left",
              className: "demo-table-info-column"
            }
          ],
          list: [],
          pageList: [],
          totalRow: {},
          curPage: 1
        },
        channel: {
          columns: [
            {
              title: "来源/日期",
              key: "stat_ymd",
              width: 120,
              fixed: "left",
              className: "demo-table-info-column"
            }
          ],
          list: [],
          pageList: [],
          totalRow: {},
          curPage: 1
        }
      },
      param: {}
    };
  },
  methods: {
    handleQrcordSort(column) {
      this.tableData.qrcord.list = sort(
        tableData.qrcord.list,
        column.key,
        column.order
      );
      this.tableData.qrcord.pageList = tableData.qrcord.list.slice(0, 10);
      this.tableData.qrcord.curPage = 1;
    },
    changeQrcordPage(page) {
      this.tableData.qrcord.pageList.splice(
        0,
        this.tableData.qrcord.pageList.length
      );
      this.tableData.qrcord.pageList = tableData.qrcord.list.slice(
        (page - 1) * 10,
        page * 10
      );
    },
    handleActivitySort(column) {
      this.tableData.activity.list = sort(
        this.tableData.activity.list,
        column.key,
        column.order
      );
      this.tableData.activity.pageList = this.tableData.activity.list.slice(
        0,
        9
      );
      this.tableData.activity.pageList.push(this.tableData.activity.totalRow)
      this.tableData.activity.curPage = 1;
    },
    changeActivityPage(page) {
      this.tableData.activity.pageList.splice(
        0,
        this.tableData.activity.pageList.length
      );
      this.tableData.activity.pageList = this.tableData.activity.list.slice(
        (page - 1) * 9,
        page * 9
      );
      this.tableData.activity.pageList.push(this.tableData.activity.totalRow)
    },
    handleChannelSort(column) {
      this.tableData.channel.list = sort(
        this.tableData.channel.list,
        column.key,
        column.order
      );
      this.tableData.channel.pageList = this.tableData.channel.list.slice(
        0,
        9
      );
      this.tableData.channel.pageList.push(this.tableData.channel.totalRow)
      this.tableData.channel.curPage = 1;
    },
    changeChannelPage(page) {
      this.tableData.channel.pageList.splice(
        0,
        this.tableData.channel.pageList.length
      );
      this.tableData.channel.pageList = this.tableData.channel.list.slice(
        (page - 1) * 9,
        page * 9
      );
      this.tableData.channel.pageList.push(this.tableData.channel.totalRow)
    },
    drawChart(id, options) {
      let numberChannelChart = this.$echarts.init(document.getElementById(id));
      numberChannelChart.setOption(options);
    },
    setPieOptions(type) {
      let _this = this;
      // let color = ["#396FFF", "#62A1FF", "#4ED4FF", "#6FFAFF"];
      let color = [
        "#396FFF",
        "#62A1FF",
        "#4ED4FF",
        "#6FFAFF",
        "#1F7EBF",
        "#7693FF",
        "#FF6EBF",
        "#E4007F"
      ];
      let options = {
        tooltip: {
          trigger: "item"
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color,
        legend: {
          top: "30",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            // data: [
            //   {
            //     value: 335,
            //     name: "直接访问",
            //     emphasis: {
            //       label: {
            //         show: true
            //       },
            //       labelLine: { show: true }
            //     }
            //   },
            //   {
            //     value: 310,
            //     name: "邮件营销",
            //     emphasis: {
            //       label: {
            //         show: true
            //       }
            //     }
            //   },
            //   {
            //     value: 234,
            //     name: "联盟广告",
            //     emphasis: {
            //       label: {
            //         show: true
            //       }
            //     }
            //   },
            //   {
            //     value: 135,
            //     name: "视频广告",
            //     emphasis: {
            //       label: {
            //         show: true
            //       }
            //     }
            //   },
            //   {
            //     value: 1548,
            //     name: "搜索引擎",
            //     emphasis: {
            //       label: {
            //         show: true
            //       }
            //     }
            //   }
            // ],
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}" + "\n\r" + "({d}%)"
              }
            },
            itemStyle: {
              emphasis: {
                label: {
                  show: true,
                  formatter: "{b}: {@score}"
                },
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      (function(_this, options) {
        let activitylist = _this.chartData.number.list.filter(
          item => item.cat === "activity"
        );
        let channelList = _this.chartData.number.list.filter(
          item => item.cat === "channel"
        );
        let series = [];
        switch (type) {
          case "number":
            options.tooltip.formatter = function(param) {
              let data = activitylist.find(
                item => item.target_name === param.name
              ).reg_mem;
              // data = data ? JSON.parse(data) : ''
              // console.log(data)
              return data;
            };
            options.legend.data = activitylist.map(item => item.target_name);
            options.legend.data.forEach((item, index) => {
              series.push({
                value: 10 + index,
                // value: activitylist.find(act => act.target_name === item).
                name: item
              });
            });
            options.series[0].data = series;
            break;
          case "channel":
            options.tooltip.formatter = function(param) {
              return channelList.find(item => item.target_name === param.name)
                .reg_mem;
            };
            options.legend.data = channelList.map(item => item.target_name);
            options.legend.data.forEach((item, index) => {
              series.push({
                value: 10 + index,
                // value: channelList.find(act => act.target_name === item).
                name: item
              });
            });
            options.series[0].data = series;
            break;
          case "add_number":
            options.tooltip.formatter = function(param) {
              return activitylist.find(item => item.target_name === param.name)
                .add_mem;
            };
            options.legend.data = activitylist.map(item => item.target_name);
            options.legend.data.forEach((item, index) => {
              series.push({
                value: 10 + index,
                // value: activitylist.find(act => act.target_name === item).
                name: item
              });
            });
            options.series[0].data = series;
            break;
          case "add_channel":
            options.tooltip.formatter = function(param) {
              return channelList.find(item => item.target_name === param.name)
                .add_mem;
            };
            options.legend.data = channelList.map(item => item.target_name);
            options.legend.data.forEach((item, index) => {
              series.push({
                value: 10 + index,
                // value: channelList.find(act => act.target_name === item).
                name: item
              });
            });
            options.series[0].data = series;
            break;

          default:
            break;
        }
      })(this, options);

      return options;
    },
    setLineOptions() {
      let _this = this;
      let series = [];
      let color = ["#396FFF", "#E4007F"];
      let options = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新增量", "累计量"],
          right: "40"
        },
        color,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            smooth: true,
            stack: "总量",
            areaStyle: {
              opacity: 0.1
            },
            itemStyle: { normal: { label: { show: true } } },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            smooth: true,
            stack: "总量",
            areaStyle: {
              opacity: 0.1
            },
            itemStyle: { normal: { label: { show: true } } },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      };

      options.xAxis.data = this.chartData.activity.map(item => item.stat_ymd);
      options.legend.data.forEach((leg, index) => {
        series.push({
          name: leg,
          type: "line",
          smooth: true,
          stack: "总量",
          areaStyle: {
            opacity: 0.1
          },
          itemStyle: { normal: { label: { show: true } } },
          data: this.chartData.activity.map(item => {
            if (index === 0) {
              return item.add_members;
            } else {
              return item.reg_members;
            }
          })
        });
      });
      options.series = series;
      return options;
    },
    setSemiCircleOptions() {
      let _this = this;
      let color = [
        "#396FFF",
        "#62A1FF",
        "#4ED4FF",
        "#6FFAFF",
        "#1F7EBF",
        "#7693FF",
        "#FF6EBF",
        "#E4007F"
      ];
      let options = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        color,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}" + "\n\r" + "({d}%)"
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };

      return options;
    },
    setBubbleOptions() {
      let _this = this;
      let color = [
        "#396FFF",
        "#62A1FF",
        "#4ED4FF",
        "#6FFAFF",
        "#1F7EBF",
        "#7693FF",
        "#FF6EBF",
        "#E4007F"
      ];
      var plantCap = [
        {
          name: "重大项目决策",
          value: "222"
        },
        {
          name: "重要人事任免",
          value: "115"
        },
        {
          name: "大额度资金运作",
          value: "113"
        },
        {
          name: "重大事项安排",
          value: "95"
        },
        {
          name: "十九大",
          value: "92"
        },
        {
          name: "党建",
          value: "87"
        },
        {
          name: "贯彻落实",
          value: "87"
        },
        {
          name: "党廉",
          value: "60"
        }
      ];

      var datalist = [
        {
          offset: [56, 48],
          symbolSize: 120,
          opacity: 0.95,
          color: "#f467ce"
        },
        {
          offset: [35, 80],
          symbolSize: 95,
          opacity: 0.88,
          color: "#7aabe2"
        },
        {
          offset: [20, 43],
          symbolSize: 90,
          opacity: 0.84,
          color: "#ff7123"
        },
        {
          offset: [83, 30],
          symbolSize: 90,
          opacity: 0.8,
          color: "#ffc400"
        },
        {
          offset: [36, 20],
          symbolSize: 65,
          opacity: 0.75,
          color: "#5e333f"
        },
        {
          offset: [64, 10],
          symbolSize: 70,
          opacity: 0.7,
          color: "#6b3442"
        },
        {
          offset: [75, 75],
          symbolSize: 60,
          opacity: 0.68,
          color: "#8a3647"
        },
        {
          offset: [88, 62],
          symbolSize: 50,
          opacity: 0.6,
          color: "#68333f"
        }
      ];
      var datas = [];
      for (var i = 0; i < plantCap.length; i++) {
        var item = plantCap[i];
        var itemToStyle = datalist[i];
        datas.push({
          name: item.value + "\n" + item.name,
          value: itemToStyle.offset,
          symbolSize: itemToStyle.symbolSize,
          label: {
            normal: {
              textStyle: {
                fontSize: 11
              }
            }
          },
          itemStyle: {
            normal: {
              color: itemToStyle.color,
              opacity: itemToStyle.opacity
            }
          }
        });
      }
      let options = {
        grid: {
          show: false,
          top: 10,
          bottom: 10
        },
        xAxis: [
          {
            gridIndex: 0,
            type: "value",
            show: false,
            min: 0,
            max: 100,
            nameLocation: "middle",
            nameGap: 5
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: "middle",
            nameGap: 30
          }
        ],
        series: [
          {
            type: "scatter",
            symbol: "circle",
            symbolSize: 120,
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                color: "#fff",
                textStyle: {
                  fontSize: "20"
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#00acea"
              }
            },
            data: datas
          }
        ]
      };
      return options;
    },
    setTwoProportion() {
      var sexIcon = {
        male:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODkzRDIwQTE0MTIxMTFFODkyOTU4RUU5NzM3MjE3MDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODkzRDIwQTA0MTIxMTFFODkyOTU4RUU5NzM3MjE3MDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTQ4MERFMjNCRDNDMTFFNzgyQTFFRkM1MDA3MjdBRTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ4MERFMjRCRDNDMTFFNzgyQTFFRkM1MDA3MjdBRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4iuAMWAAABl0lEQVR42uzWTSgEYRzH8ZmJcPDOkRMXG1cl5SInJ1e5aEtuLhwoNy5K0mpzWCXJyQEH5eDEwUVecuKCKEJ5qU2L8R2e1fT0zLM7O3NR869P284zz69nnmeemTFt2zac6kz+/kpVjG6MoB0ZbGMWJ/jKnrg3bP78WoZ3OW2DWEcPKlGHAWyiC6aqk1fFMI4yRVsDJlDrJ7AXjZp2Z4RtfgLrDX0VocJP4H2OwE+8+Ancwa2mfR9nfgIPMYMnxchuMI071TzoKoFHxMXKOjfrERaw6zWxuvrACjZQLW5kZ27fdSslT0ETyqXjGdeuqHH1e8WFe8e4A0vQL7ZZs2oXSOVc/jnmsJodtTuwDynDX7WKPmmsyas8ahReY6rbpiVAYEwVaBkhlCVNcqFlhzoqI+zLjAL/ygyQY4Z9H1qqkKsAgdeqwESAwHnV4yslnnVD4oWeTz1gEUuqwGdMYQtV4tgkOjzCklgWnyRprye203Dg+h/XjO5YOjevldW9c0qjrRcF/tdA029brsBT8aEke8OlqsO3AAMAxyBOvxLL2/sAAAAASUVORK5CYII=",
        female:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAdCAYAAACaCl3kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTgxQUVBQkE0MTIwMTFFODlBRjc4REM5QkNCNEQ3NkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTgxQUVBQjk0MTIwMTFFODlBRjc4REM5QkNCNEQ3NkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTQ4MERFMjNCRDNDMTFFNzgyQTFFRkM1MDA3MjdBRTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ4MERFMjRCRDNDMTFFNzgyQTFFRkM1MDA3MjdBRTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Op4glAAABOUlEQVR42mL8//8/Awj8zY1lgAJ2IG4C4lQg/gbEy4C4Foh/giSZJy8GK2JhwAQzgDgByhYE4lIgFgXiRGRFTGiaQArjsBgWC5XDqVEcixjYhVA5nBrvA/F7LBrfQeVwagQFQDEorJDEQOwSWODAALbAmQ/EN5ACaAEQH0dXxPgnJ4aBHIAtILYB8X80vJWQRiEgdsFimCtUDqfGACBmxaKRFSqHU2M4Hm+F49IoAsROeDQ6QdVgaAzEET3IUReITWMYEbEQhq5RDIgdidDoCFUL1xgETciEADNULVxjGAmJJgymUQKI7UjQaA/SA9JoRaQzkcPFCkScQs8yBABI7SmQxidQDz8gQtMDqNonTEg5QhGUzYC4A4uGDqicIlQtAwusuEMrIrHHBZJaJgYywRDX+IkYMYAAAwB6sjfXWpdRXAAAAABJRU5ErkJggg=="
      };

      let options = {
        tooltip: {
          trigger: "item",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "rgba(255,255,255,0.7)",
          borderColor: "#cee5ff",
          borderWidth: 1,
          padding: [5, 10],
          textStyle: {
            color: "#444"
          },
          formatter: function(params) {
            return (
              '<div style="height:30px;line-height: 30px;">' +
              params.name +
              "</div>" +
              '<div style="height: 40px;line-height: 40px;">' +
              params.data.name +
              ': <span style="color: ' +
              params.color +
              ';">' +
              params.value +
              "%</span></div>"
            );
          }
        },
        color: ["#e34c4c", "#3a8eff"],
        xAxis: [
          {
            type: "value",
            show: false
          }
        ],
        yAxis: [
          {
            type: "category",
            show: false,
            data: ["性别比例"]
          }
        ],
        series: [
          {
            type: "bar",
            stack: "性别比例",
            barWidth: 10,
            label: {
              normal: {
                show: true,
                position: "left"
              }
            },
            data: [
              {
                name: "女",
                value: "55",
                label: {
                  position: "left",
                  normal: {
                    formatter: ["{Female|}     " + "\n\n" + " 女"].join("\n"),
                    rich: {
                      Female: {
                        height: 40,
                        align: "center",
                        backgroundColor: {
                          image: sexIcon.female
                        }
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            type: "bar",
            stack: "性别比例",
            barWidth: 10,
            label: {
              normal: {
                show: true,
                position: "right"
              }
            },
            data: [
              {
                name: "男",
                value: "45",
                label: {
                  normal: {
                    formatter: ["     {Male|}     " + "\n\n" + "      男"].join(
                      "\n"
                    ),
                    rich: {
                      Male: {
                        height: 40,
                        align: "center",
                        backgroundColor: {
                          image: sexIcon.male
                        }
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      return options;
    },
    setMultipleProportion() {
      var data = ["6933万公顷", "24.83亿立方米", "52.76立方米"];
      var xMax = 100;
      let options = {
        tooltip: {
          show: true,
          formatter: "{b} :{c}%"
        },
        grid: {
          left: "15%",
          top: "5%",
          bottom: "0",
          right: "0"
        },
        xAxis: [
          {
            max: xMax,
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: [
              "每公顷蓄积量52.76立方米",
              "总蓄积量24.83亿立方米",
              "人工林面积6933 万公顷"
            ],

            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: " ",
            type: "bar",
            barWidth: 16,
            silent: true,
            itemStyle: {
              normal: {
                color: "#f2f2f2"
              }
            },
            barGap: "-100%",
            barCategoryGap: "50%",
            data: data.map(function(d) {
              return xMax;
            })
          },
          {
            name: " ",
            type: "bar",
            barWidth: 16,
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "占总量的{c}%"
              }
            },
            data: [
              {
                value: 59,
                itemStyle: {
                  normal: {
                    color: "#51a7fa"
                  }
                }
              },
              {
                value: 16.8,
                itemStyle: {
                  normal: {
                    color: "#f39019"
                  }
                }
              },
              {
                value: 36.27,
                itemStyle: {
                  normal: {
                    color: "#ec5d57"
                  }
                }
              }
            ]
          }
        ]
      };
      return options;
    },
    formatTable(type, data) {
      let activityOnlyList = [];
      let activityList = [];
      let activitySum = [];
      if (type === "activity") {
        activityOnlyList = Array.from(
          new Set(data.filter(item => item.cat === "act-sum"))
        );
        activityList = data.filter(item => item.cat === "act-day"); // 活动数据
        activitySum = data.filter(item => item.cat === "act-sum"); // 活动合计
      } else if (type === "channel") {
        activityOnlyList = Array.from(
          new Set(data.filter(item => item.cat === "chnl-sum"))
        );
        activityList = data.filter(item => item.cat === "chnl-day"); // 活动数据
        activitySum = data.filter(item => item.cat === "chnl-sum"); // 活动合计
      }
      let totalList = Array.from(
        // 统计列表总条数
        new Set(data.filter(item => item.cat === "day-sum"))
      );

      let activityObjs = {};
      activityList.forEach(item => {
        if (!activityObjs[`${item.act_chnl_name}-reg_members`]) {
          activityObjs[`${item.act_chnl_name}-reg_members`] = [];
        }
        if (!activityObjs[`${item.act_chnl_name}-add_members`]) {
          activityObjs[`${item.act_chnl_name}-add_members`] = [];
        }
        activityObjs[`${item.act_chnl_name}-reg_members`].push(item);
        activityObjs[`${item.act_chnl_name}-add_members`].push(item);
      });

      let activityColumnKeys = Object.keys(activityObjs);
      function format(data) {
        let itemObjs = {};
        for (let i = 0; i < activityColumnKeys.length; i++) {
          let item = activityColumnKeys[i];
          let keys = item.split("-");
          if (!activityObjs[item].find(act => act.stat_ymd === data.stat_ymd))
            break;
          itemObjs[item] = activityObjs[item].find(
            act => act.stat_ymd === data.stat_ymd
          )[keys[1]];
          itemObjs[item] = itemObjs[item] == null ? '--' : itemObjs[item];
        }
        return itemObjs;
      }

      let total2 = data.find(item => item.cat === "day-sum2");
      let activitySumObj = {};
      activitySum.forEach(sum => {
        activitySumObj.stat_ymd = '合计';
        activitySumObj[`${sum.act_chnl_name}-reg_members`] = (sum.reg_members == null ? '--' : sum.reg_members);
        activitySumObj[`${sum.act_chnl_name}-add_members`] = (sum.add_members == null ? '--' : sum.add_members);
        activitySumObj.reg_members = total2.reg_members;
        activitySumObj.add_members = total2.add_members;
      })

      totalList.forEach(item => {
        let data = format(item);
        item = Object.assign(item, data);
      });

      let activityColumns = [];
      activityOnlyList.forEach(item => {
        activityColumns.push({
          title: item.act_chnl_name,
          children: [
            {
              title: "累计",
              sortable: true,
              width: 100,
              key: `${item.act_chnl_name}-reg_members`
            },
            {
              title: "新增",
              sortable: true,
              width: 100,
              key: `${item.act_chnl_name}-add_members`
            }
          ]
        });
      });

      createProxy(this.tableData[type]);
      this.tableData[type].totalRow = activitySumObj;
      this.tableData[type].columns.push(...activityColumns);
      this.tableData[type].columns.push({
        title: "合计",
        width: 200,
        fixed: "right",
        children: [
          {
            title: "累计",
            sortable: true,
            width: 100,
            fixed: "right",
            key: "reg_members"
          },
          {
            title: "新增",
            sortable: true,
            width: 100,
            fixed: "right",
            key: "add_members"
          }
        ]
      });
      this.tableData[type].list = totalList;
      this.tableData[type].pageList = totalList.slice(0, 9);
      this.tableData[type].pageList.push(activitySumObj);
    },
    async getData(param) {
      let $api = this.$api;
      let [
        number,
        activity,
        qrcord,
        sourcesAct,
        sourcesChnnl,
        dist
      ] = await Promise.all([
        $api.getMemberNumber(param),
        $api.getMemberActivity(param),
        $api.getMemberQrcord(),
        $api.getMemberSourcesAct(param),
        $api.getMemberSourcesChnnl(param),
        $api.getMemberDist(param)
      ]);
      this.chartData.number = number;
      this.chartData.activity = activity.sort(function(a, b) {
        return new Date(a.stat_ymd) - new Date(b.stat_ymd);
      });
      this.chartData.dist = dist;

      this.tableData.qrcord.list = qrcord;
      this.tableData.qrcord.pageList = qrcord.slice(0, 10);

      this.formatTable("activity", sourcesAct);
      this.formatTable("channel", sourcesChnnl);

    },
    init() {
      // 绘制饼图
      this.drawChart("number_channel_chart1", this.setPieOptions("channel"));
      this.drawChart("number_channel_chart2", this.setPieOptions("number"));
      this.drawChart(
        "number_channel_chart3",
        this.setPieOptions("add_channel")
      );
      this.drawChart("number_channel_chart4", this.setPieOptions("add_number"));
      this.drawChart("number_channel_chart5", this.setLineOptions());

      this.drawChart("number_other_chart1", this.setSemiCircleOptions());
      this.drawChart("number_other_chart2", this.setBubbleOptions());
      this.drawChart("number_other_chart3", this.setTwoProportion());
      this.drawChart("number_other_chart4", this.setMultipleProportion());
      this.drawChart("number_other_chart5", this.setMultipleProportion());
      this.drawChart("number_other_chart6", this.setPieOptions("channel"));
      this.drawChart("number_other_chart7", this.setTwoProportion());
      this.drawChart("number_other_chart8", this.setPieOptions("channel"));
    }
  },
  watch: {
    chartData: {
      handler(nV, oV) {
        this.init();
      },
      deep: true
    }
  },
  created() {
    let param = {
      start_date: "2018-08-01",
      end_date: "2018-08-21"
    };
    this.getData(param);
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/public.scss";
.number_data {
  width: 100%;
  margin-bottom: 3rem;
  .number_header {
    display: flex;
    height: 2.4rem;
    .number_title {
      flex: 1;
      font-size: 14px;
      color: rgba(42, 57, 98, 1);
      line-height: 14px;
    }
    .select {
      width: 16%;
      display: flex;
      span {
        height: 12px;
        font-size: 12px;
        color: $color-gray;
        line-height: 2rem;
      }
      .select_option {
        width: 79%;
      }
    }
  }
  .item {
    padding: 1rem;
    border: 1px solid $color-border;
    .item_header {
      display: flex;
      .item_title {
        flex: 1;
        font-size: 14px;
        color: $color-primary;
      }
      p {
        span: {
          font-size: 12px;
          color: $color-gray;
        }
        strong {
          color: #1e2538;
        }
      }
    }
    .item_content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>