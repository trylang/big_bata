<template>
	<div id="table_container">
		<Row class="number_data"> 
			<div class="number_header">
				<span class="number_title">会员数据</span>
			</div>
			<Col span="12" class="item">
				<div class="item_header">
					<span class="item_title">累计注册会员参与数</span>
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
					<Select class="select_option" clearable filterable v-model="param.activity_id" @on-change="toggleActivity(param.activity_id)">
						<Option v-for="(item, index) in activityList" :value="item.activity_id" :key="index">
							{{item.activity_name}}
						</Option>
					</Select>
				</div>
			</div>
			<div class="number_content">
				<div id="number_channel_chart5" :style="{width: '1100px', height: '400px'}"></div>
			</div>
		</Row>

    <Row class="number_data">
			<div class="number_header">
				<span class="number_title">带参二维码详情</span>
        <download title="带参二维码详情" :meta="$route.meta" :slotFilter="slotFilter" :noTimeCheck="true" :noFilter="true" name="memberQrCord"></download>
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
        
        <Tabs class="allocation_tabs" value="channel">
          <!-- <TabPane label="活  动" name="activity">
            <download title="参与会员来源详情_活动" :meta="$route.meta" name="memberact"></download>
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
          </TabPane> -->
          <TabPane label="渠  道" name="channel">
            <download title="参与会员来源详情_渠道" :meta="$route.meta" :noTimeCheck="true" :slotFilter="slotFilter" name="memberchnl"></download>
            <Table style="margin-top: 2rem;" v-if="tableData.channel.columns.length>1" :columns="tableData.channel.columns" :data="tableData.channel.pageList" @on-sort-change="handleChannelSort"></Table>
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
				<span class="number_title">会员画像分析</span>
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
import download from "@/components/download.vue";

export default {
  components: {
    download
  },
  data() {
    return {
      slotFilter: [{
        "title": "时间：",
        "type": "daterange",
        "name": "dateTime",
        "data": [
          {
            "name": "start_date"
          },
          {
            "name": "end_date"
          }
        ]
      }],
      activityList: [],
      chartData: {
        number: {},
        activity: [],
        sourcesAct: [],
        sourcesChnnl: [],
        dist: {}
      },
      tableData: {
        qrcord: {
          columns: [
            {
              title: "ID",
              key: "id"
            },
            {
              title: "二维码名称",
              key: "code_name"
            },
            {
              title: "渠道",
              key: "chnnel_name"
            },
            {
              title: "创建时间",
              key: "create_time"
            },
            {
              title: "累计数",
              key: "visits"
            },
            {
              title: "关联会员注册",
              key: "rel_mbr"
            },
            {
              title: "简介",
              key: "code_desc"
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
    toggleActivity(activity_id) {
      let param = Object.assign({}, this.param, {activity_id})
      this.$api.getMemberActivity(param).then(activity => {
        this.chartData.activity = activity.length > 0 ? activity.sort(function(a, b) {
          return new Date(a.stat_ymd) - new Date(b.stat_ymd);
        }) : [];
        this.drawChart("number_channel_chart5", this.setLineOptions());
      })
      
    },
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
      this.tableData.qrcord.pageList = this.tableData.qrcord.list.slice(
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
        10
      );
      this.tableData.activity.pageList.push(this.tableData.activity.totalRow);
      this.tableData.activity.curPage = 1;
    },
    changeActivityPage(page) {
      this.tableData.activity.pageList.splice(
        0,
        this.tableData.activity.pageList.length - 1
      );
      this.tableData.activity.pageList = this.tableData.activity.list.slice(
        (page - 1) * 10,
        page * 10
      );
      this.tableData.activity.pageList.push(this.tableData.activity.totalRow);
    },
    handleChannelSort(column) {
      this.tableData.channel.list = sort(
        this.tableData.channel.list,
        column.key,
        column.order
      );
      this.tableData.channel.pageList = this.tableData.channel.list.slice(
        0,
        10
      );
      this.tableData.channel.pageList.push(this.tableData.channel.totalRow);
      this.tableData.channel.curPage = 1;
    },
    changeChannelPage(page) {
      this.tableData.channel.pageList.splice(
        0,
        this.tableData.channel.pageList.length - 1
      );
      this.tableData.channel.pageList = this.tableData.channel.list.slice(
        (page - 1) * 10,
        page * 10
      );
      this.tableData.channel.pageList.push(this.tableData.channel.totalRow);
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
        grid: {
          left: "60%",
          right: "10%",
          bottom: "50%",
          padding: ['10%', '10%']
        },
        color,
        legend: {
          top: "30",
          width: "88%",
          data: []
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            label: {
              normal: {
                show: true,
                color: '#666',
                formatter: "{b}" + "\n\r" + "{d}%"
              }
            },
            labelLine: {
              lineStyle: {
                color: '#ccc'
              }
            }
          }
        ]
      };

      if (type === "tag_edu_dist" || type === "tag_m_dist") {
        if (!this.chartData.dist[type]) return;
      }

      (function(_this, options) {
        if (_this.chartData.number.length ==  0) {
          _this.chartData.number.list = [];
        }
        let activitylist = _this.chartData.number.list.filter(
          item => item.cat === "activity"
        );
        let channelList = _this.chartData.number.list.filter(
          item => item.cat === "channel"
        );
        let series = [];
        switch (type) {
          case "number":
            options.tooltip.show = false;
            options.tooltip.formatter = function(param) {
              let data = activitylist.find(
                item => item.target_name === param.name
              ).reg_mem;
              return data;
            };
            options.legend.data = activitylist.map(item => item.target_name);
            options.legend.data.forEach((item, index) => {
              series.push({
                value: activitylist.find(act => act.target_name === item).reg_members,
                name: item
              });
            });
            options.series[0].data = series;
            break;
          case "channel":
            options.tooltip.show = false;
            options.tooltip.formatter = function(param) {
              return channelList.find(item => item.target_name === param.name)
                .reg_mem;
            };
            options.legend.data = channelList.map(item => item.target_name);
            options.legend.data.forEach((item, index) => {
              series.push({
                value: channelList.find(act => act.target_name === item).reg_members,
                name: item
              });
            });
            options.series[0].data = series;
            break;
          case "add_number":
            options.tooltip.show = false;
            options.tooltip.formatter = function(param) {
              return activitylist.find(item => item.target_name === param.name)
                .add_mem;
            };
            options.legend.data = activitylist.map(item => item.target_name);
            options.legend.data.forEach((item, index) => {
              series.push({
                value: activitylist.find(act => act.target_name === item).add_members,
                name: item
              });
            });
            options.series[0].data = series;
            break;
          case "add_channel":
            options.tooltip.show = false;
            options.tooltip.formatter = function(param) {
              return channelList.find(item => item.target_name === param.name)
                .add_mem;
            };
            options.legend.data = channelList.map(item => item.target_name);
            options.legend.data.forEach((item, index) => {
              series.push({
                value: channelList.find(act => act.target_name === item).add_members,
                name: item
              });
            });
            options.series[0].data = series;
            break;
          case "tag_m_dist":
          case "tag_edu_dist":
            let legend = Object.keys(_this.chartData.dist[type]);
            legend.forEach((item, index) => {
              series.push({
                value: _this.chartData.dist[type][item],
                name: item
              });
            });
            options.series[0].data = series;
            break;

          default:
            break;
        }
      })(_this, options);
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
          right: "10%"
        },
        color,
        grid: {
          left: "0%",
          right: "8%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: []
        },
        yAxis: {
          type: "value",
        //   axisLabel: {
        //   formatter: value => {
        //     return this.$dayjs(value).format("MM.DD");
        //   }
        // },
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
      options.xAxis.data = this.chartData.activity.length > 0 ? this.chartData.activity.map(item => item.stat_ymd) : [];
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
      if (!this.chartData.dist.tag_loc_y1_days_dist) return;
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
        grid: {
          left: "60%",
          right: "10%",
          bottom: "30%",
        },
        // legend: {
        //   orient: "vertical",
        //   x: "left",
        //   left: '5%',
        //   data: []
        // },
        color,
        series: [
          {
            name: "年内到访频次",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                // formatter: "{b}:{c}" + "\n\r" + "({d}%)"
                formatter: "{b}({d}%)"
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
            data: []
          }
        ]
      };

      let visit = this.chartData.dist.tag_loc_y1_days_dist;
      let visitArr = Object.keys(visit);
      // options.legend.data = visitArr;
      visitArr.forEach(item => {
        options.series[0].data.push({
          value: visit[item],
          name: item
        });
      });
      return options;
    },
    setBubbleOptions() {
      if (!this.chartData.dist.tag_bizcat_dist) return;

      let _this = this;

      let color = ["#E4007F", "#396FFF"];
      let options = {
        xAxis: {
          show: false,
          type: "category",
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          }
        },
        yAxis: {
          show: false,
          boundaryGap: true,
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          scale: true
        },
        series: []
      };

      let bizcat = this.chartData.dist.tag_bizcat_dist;
      let bizcatArr = Object.keys(bizcat);

      let series = [];
      bizcatArr.forEach(item => {
        series.push({
          name: item,
          data: bizcat[item],
          type: "scatter",
          silent: true,
          symbolSize: function(data) {
            return bizcat[item] / 2;
          },
          label: {
            normal: {
              show: true,
              fontSize: "12px",
              color: "#fff",
              formatter: function(data) {
                return `${data.seriesName}: ${data.value}`;
              }
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: "rgba(120, 36, 50, 0.5)",
              shadowOffsetY: 5,
              color: new this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: "rgb(251, 118, 123)"
                },
                {
                  offset: 1,
                  color: "rgb(204, 46, 72)"
                }
              ])
            }
          }
        });
      });

      options.series = series;
      return options;
    },
    setTwoProportion(type) {
      var carIcon = {
        无车: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSIyN3B4IiB2aWV3Qm94PSIwIDAgNDAgMjciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjEgKDU3NTAxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAzIENvcHkgOEAyeDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTEiIHBvaW50cz0iMCAtMC4wMDAzIDM5LjQ0MyAtMC4wMDAzIDM5LjQ0MyAyNi44MjE3IDAgMjYuODIxNyI+PC9wb2x5Z29uPgogICAgPC9kZWZzPgogICAgPGcgaWQ9IkJJ5pWw5o2u5YiG5p6QIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iYzQt5Lya5ZGY57uP6JCl5YiG5p6QLeS6jOacnyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc0NS4wMDAwMDAsIC00MzI5LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMy1Db3B5LTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc0NS4wMDAwMDAsIDQzMjkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+CiAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgICAgIDxnIGlkPSJDbGlwLTIiPjwvZz4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMS40MTM3LDIzLjMwNzcgTDMxLjQxMzcsMjQuNzI0NyBDMzEuNDEzNywyNS44ODc3IDMyLjM1NTcsMjYuODIxNyAzMy41MTA3LDI2LjgyMTcgTDM0LjMwNzcsMjYuODIxNyBDMzUuNDcwNywyNi44MjE3IDM2LjQwNDcsMjUuODc5NyAzNi40MDQ3LDI0LjcyNDcgTDM2LjQwNDcsMjMuMjczNyBDMzYuMjYwNywyMy4yOTA3IDM2LjEwNzcsMjMuMzA3NyAzNS45NTQ3LDIzLjMwNzcgTDMxLjQxMzcsMjMuMzA3NyBaIE0zNy4wOTE3LDE0LjQyOTcgQzM2LjUyMzcsMTUuNzI3NyAzNS4xNDg3LDE2Ljc4MDcgMzQuMDE5NywxNi43ODA3IEMzMi44OTA3LDE2Ljc4MDcgMzIuNDIzNywxNS43Mjc3IDMyLjk5MjcsMTQuNDI5NyBDMzMuNTYwNywxMy4xMzA3IDM0LjkzNTcsMTIuMDc4NyAzNi4wNjQ3LDEyLjA3ODcgQzM3LjIwMjcsMTIuMDY5NyAzNy42NjA3LDEzLjEzMDcgMzcuMDkxNywxNC40Mjk3IFogTTcuMzQxNyw3LjAxOTcgQzguNDYyNyw0LjYzNDcgOS45NzM3LDIuMzQyNyAxMC43NjI3LDEuODU4NyBMMjguNjgwNywxLjg1ODcgQzI5LjQ3ODcsMi4zMzM3IDMwLjk4MDcsNC42MjU3IDMyLjEwMTcsNy4wMTk3IEw3LjM0MTcsNy4wMTk3IFogTTI5LjM1MDcsMTYuNzcxNyBDMjkuMzUwNywxNi45NTA3IDI5LjI4MzcsMTcuMTExNyAyOS4xNzI3LDE3LjIxMzcgTDI4LjcxNDcsMTcuNjIwNyBMMjguNzA1NywxNy42MjA3IEwxMC43NDU3LDE3LjYyMDcgTDEwLjI3ODcsMTcuMjEzNyBDMTAuMTY4NywxNy4xMTE3IDEwLjEwMDcsMTYuOTUwNyAxMC4xMDA3LDE2Ljc3MTcgTDEwLjEwMDcsMTMuNTIwNyBMMjkuMzU5NywxMy41MjA3IEwyOS4zNTk3LDE2Ljc3MTcgTDI5LjM1MDcsMTYuNzcxNyBaIE01LjQyMzcsMTYuNzgwNyBDNC4yOTQ3LDE2Ljc4MDcgMi45MTE3LDE1LjcyNzcgMi4zNTA3LDE0LjQyOTcgQzEuNzgyNywxMy4xMzA3IDIuMjQwNywxMi4wNzg3IDMuMzc3NywxMi4wNzg3IEM0LjUwNjcsMTIuMDc4NyA1Ljg5MDcsMTMuMTMwNyA2LjQ1MDcsMTQuNDI5NyBDNy4wMTk3LDE1LjcyNzcgNi41NjA3LDE2Ljc4MDcgNS40MjM3LDE2Ljc4MDcgWiBNMzguMTY5NywxMS4yMjA3IEwzNS44ODY3LDkuMTMyNyBMMzUuNDcwNyw4Ljc1MDcgTDM1LjA3MTcsOC4zODU3IEwzNC4xMjk3LDcuNTIwNyBMMzMuOTM0Nyw3LjM0MTcgQzMzLjkzNDcsNy4zNDE3IDMzLjkwODcsNy4yNzM3IDMzLjg0OTcsNy4xNDY3IEMzMy44MDc3LDcuMDQ0NyAzMy43Mzk3LDYuOTAwNyAzMy42NjI3LDYuNzIyNyBDMzIuODgxNyw0Ljk1NjcgMzAuNDk2NywtMC4wMDAzIDI4LjQyNTcsLTAuMDAwMyBMMTkuNzE3NywtMC4wMDAzIEwxMS4wMDg3LC0wLjAwMDMgQzguOTM3NywtMC4wMDAzIDYuNTUyNyw0Ljk1NjcgNS43NzE3LDYuNzIyNyBDNS42OTU3LDYuODkxNyA1LjYzNTcsNy4wMzY3IDUuNTg0Nyw3LjE0NjcgQzUuNTMzNyw3LjI3MzcgNS40OTk3LDcuMzQxNyA1LjQ5OTcsNy4zNDE3IEw1LjMwNDcsNy41MjA3IEw0LjM2MjcsOC4zODU3IEwzLjk2MzcsOC43NTA3IEwzLjU0NzcsOS4xMzI3IEwxLjI2NDcsMTEuMjIwNyBDMC40NTg3LDExLjk1OTcgLTAuMDAwMywxMy4wMDM3IC0wLjAwMDMsMTQuMDk4NyBMLTAuMDAwMywxOC45MTk3IEMtMC4wMDAzLDE5LjkyMDcgMC40OTI3LDIwLjg2MjcgMS4zMjM3LDIxLjQyMzcgTDIuMDk2NywyMS45NDk3IEwyLjE1NTcsMjEuOTkxNyBDMi4yODM3LDIyLjA3NjcgMi40MTg3LDIyLjE1MzcgMi41NTQ3LDIyLjIxMjcgQzIuNjk4NywyMi4yNzE3IDIuODUxNywyMi4zMjI3IDMuMDEyNywyMi4zNTY3IEMzLjE1NzcsMjIuMzgyNyAzLjMxMDcsMjIuMzk5NyAzLjQ2MjcsMjIuMzk5NyBMMzUuOTYyNywyMi4zOTk3IEMzNi4xMTU3LDIyLjM5OTcgMzYuMjY4NywyMi4zODI3IDM2LjQxMjcsMjIuMzU2NyBDMzYuNTc0NywyMi4zMjI3IDM2LjcyNjcsMjIuMjgwNyAzNi44NzE3LDIyLjIxMjcgQzM3LjAwNzcsMjIuMTUzNyAzNy4xNDI3LDIyLjA4NTcgMzcuMjcwNywyMS45OTE3IEwzNy4zMjk3LDIxLjk0OTcgTDM4LjEwMTcsMjEuNDIzNyBDMzguOTMzNywyMC44NjI3IDM5LjQyNjcsMTkuOTIwNyAzOS40MjY3LDE4LjkxOTcgTDM5LjQyNjcsMTQuMDk4NyBDMzkuNDM0NywxMy4wMDM3IDM4Ljk3NjcsMTEuOTU5NyAzOC4xNjk3LDExLjIyMDcgWiBNMi4xODE3LDguMDk3NyBDMi41ODA3LDguMDk3NyAyLjkyODcsOC4xMjI3IDMuMjUwNyw4LjE1NjcgTDQuNTA2Nyw3LjAxMDcgQzQuMTA3Nyw2LjcyMjcgMy43MjU3LDYuMzc0NyAzLjUyMjcsNS45OTI3IEMzLjE0MDcsNS4yNzk3IDEuNjgwNyw1LjEyNjcgMC43NTU3LDUuMTAwNyBMMC43Mzg3LDUuMTAwNyBDMC4yOTY3LDUuMTAwNyAtMC4wNTEzLDUuNDk5NyAwLjAwODcsNS45NDE3IEMwLjE0NDcsNi44MjQ3IDAuNjEwNyw4LjA5NzcgMi4xODE3LDguMDk3NyBaIE0zLjAyMTcsMjMuMjczNyBMMy4wMjE3LDI0LjcyNDcgQzMuMDIxNywyNS44ODc3IDMuOTYzNywyNi44MjE3IDUuMTE3NywyNi44MjE3IEw1LjkxNTcsMjYuODIxNyBDNy4wNzg3LDI2LjgyMTcgOC4wMTI3LDI1Ljg3OTcgOC4wMTI3LDI0LjcyNDcgTDguMDEyNywyMy4zMDc3IEwzLjQ2MjcsMjMuMzA3NyBDMy4zMTg3LDIzLjMwNzcgMy4xNzQ3LDIzLjI5OTcgMy4wMjE3LDIzLjI3MzcgWiBNMzcuMjYxNyw4LjA5NzcgQzM4Ljg0MDcsOC4wOTc3IDM5LjI5ODcsNi44MzI3IDM5LjQzNDcsNS45NDk3IEMzOS41MDI3LDUuNTA4NyAzOS4xNTQ3LDUuMTA5NyAzOC43MDQ3LDUuMTA5NyBMMzguNjg3Nyw1LjEwOTcgQzM3Ljc2MjcsNS4xMzQ3IDM2LjMxMTcsNS4yODc3IDM1LjkyMDcsNi4wMDA3IEMzNS43MTY3LDYuMzgyNyAzNS4zMzQ3LDYuNzMwNyAzNC45MzU3LDcuMDE5NyBMMzYuMTkyNyw4LjE2NTcgQzM2LjUwNjcsOC4xMTQ3IDM2Ljg2MjcsOC4wOTc3IDM3LjI2MTcsOC4wOTc3IFoiIGlkPSJGaWxsLTEiIGZpbGw9IiNDQ0NDQ0MiIG9wYWNpdHk9IjAuOCIgbWFzaz0idXJsKCNtYXNrLTIpIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",

        有车: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSIyN3B4IiB2aWV3Qm94PSIwIDAgNDAgMjciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjEgKDU3NTAxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAzQDJ4PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPHBvbHlnb24gaWQ9InBhdGgtMSIgcG9pbnRzPSIwIC0wLjAwMDMgMzkuNDQzIC0wLjAwMDMgMzkuNDQzIDI2LjgyMTcgMCAyNi44MjE3Ij48L3BvbHlnb24+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iQknmlbDmja7liIbmnpAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJjNC3kvJrlkZjnu4/okKXliIbmnpAt6aKc6Imy5a+55q+UMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI4NS4wMDAwMDAsIC0zODIwLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjg1LjAwMDAwMCwgMzgyMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgPGcgaWQ9IkNsaXAtMiI+PC9nPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMxLjQxMzcsMjMuMzA3NyBMMzEuNDEzNywyNC43MjQ3IEMzMS40MTM3LDI1Ljg4NzcgMzIuMzU1NywyNi44MjE3IDMzLjUxMDcsMjYuODIxNyBMMzQuMzA3NywyNi44MjE3IEMzNS40NzA3LDI2LjgyMTcgMzYuNDA0NywyNS44Nzk3IDM2LjQwNDcsMjQuNzI0NyBMMzYuNDA0NywyMy4yNzM3IEMzNi4yNjA3LDIzLjI5MDcgMzYuMTA3NywyMy4zMDc3IDM1Ljk1NDcsMjMuMzA3NyBMMzEuNDEzNywyMy4zMDc3IFogTTM3LjA5MTcsMTQuNDI5NyBDMzYuNTIzNywxNS43Mjc3IDM1LjE0ODcsMTYuNzgwNyAzNC4wMTk3LDE2Ljc4MDcgQzMyLjg5MDcsMTYuNzgwNyAzMi40MjM3LDE1LjcyNzcgMzIuOTkyNywxNC40Mjk3IEMzMy41NjA3LDEzLjEzMDcgMzQuOTM1NywxMi4wNzg3IDM2LjA2NDcsMTIuMDc4NyBDMzcuMjAyNywxMi4wNjk3IDM3LjY2MDcsMTMuMTMwNyAzNy4wOTE3LDE0LjQyOTcgWiBNNy4zNDE3LDcuMDE5NyBDOC40NjI3LDQuNjM0NyA5Ljk3MzcsMi4zNDI3IDEwLjc2MjcsMS44NTg3IEwyOC42ODA3LDEuODU4NyBDMjkuNDc4NywyLjMzMzcgMzAuOTgwNyw0LjYyNTcgMzIuMTAxNyw3LjAxOTcgTDcuMzQxNyw3LjAxOTcgWiBNMjkuMzUwNywxNi43NzE3IEMyOS4zNTA3LDE2Ljk1MDcgMjkuMjgzNywxNy4xMTE3IDI5LjE3MjcsMTcuMjEzNyBMMjguNzE0NywxNy42MjA3IEwyOC43MDU3LDE3LjYyMDcgTDEwLjc0NTcsMTcuNjIwNyBMMTAuMjc4NywxNy4yMTM3IEMxMC4xNjg3LDE3LjExMTcgMTAuMTAwNywxNi45NTA3IDEwLjEwMDcsMTYuNzcxNyBMMTAuMTAwNywxMy41MjA3IEwyOS4zNTk3LDEzLjUyMDcgTDI5LjM1OTcsMTYuNzcxNyBMMjkuMzUwNywxNi43NzE3IFogTTUuNDIzNywxNi43ODA3IEM0LjI5NDcsMTYuNzgwNyAyLjkxMTcsMTUuNzI3NyAyLjM1MDcsMTQuNDI5NyBDMS43ODI3LDEzLjEzMDcgMi4yNDA3LDEyLjA3ODcgMy4zNzc3LDEyLjA3ODcgQzQuNTA2NywxMi4wNzg3IDUuODkwNywxMy4xMzA3IDYuNDUwNywxNC40Mjk3IEM3LjAxOTcsMTUuNzI3NyA2LjU2MDcsMTYuNzgwNyA1LjQyMzcsMTYuNzgwNyBaIE0zOC4xNjk3LDExLjIyMDcgTDM1Ljg4NjcsOS4xMzI3IEwzNS40NzA3LDguNzUwNyBMMzUuMDcxNyw4LjM4NTcgTDM0LjEyOTcsNy41MjA3IEwzMy45MzQ3LDcuMzQxNyBDMzMuOTM0Nyw3LjM0MTcgMzMuOTA4Nyw3LjI3MzcgMzMuODQ5Nyw3LjE0NjcgQzMzLjgwNzcsNy4wNDQ3IDMzLjczOTcsNi45MDA3IDMzLjY2MjcsNi43MjI3IEMzMi44ODE3LDQuOTU2NyAzMC40OTY3LC0wLjAwMDMgMjguNDI1NywtMC4wMDAzIEwxOS43MTc3LC0wLjAwMDMgTDExLjAwODcsLTAuMDAwMyBDOC45Mzc3LC0wLjAwMDMgNi41NTI3LDQuOTU2NyA1Ljc3MTcsNi43MjI3IEM1LjY5NTcsNi44OTE3IDUuNjM1Nyw3LjAzNjcgNS41ODQ3LDcuMTQ2NyBDNS41MzM3LDcuMjczNyA1LjQ5OTcsNy4zNDE3IDUuNDk5Nyw3LjM0MTcgTDUuMzA0Nyw3LjUyMDcgTDQuMzYyNyw4LjM4NTcgTDMuOTYzNyw4Ljc1MDcgTDMuNTQ3Nyw5LjEzMjcgTDEuMjY0NywxMS4yMjA3IEMwLjQ1ODcsMTEuOTU5NyAtMC4wMDAzLDEzLjAwMzcgLTAuMDAwMywxNC4wOTg3IEwtMC4wMDAzLDE4LjkxOTcgQy0wLjAwMDMsMTkuOTIwNyAwLjQ5MjcsMjAuODYyNyAxLjMyMzcsMjEuNDIzNyBMMi4wOTY3LDIxLjk0OTcgTDIuMTU1NywyMS45OTE3IEMyLjI4MzcsMjIuMDc2NyAyLjQxODcsMjIuMTUzNyAyLjU1NDcsMjIuMjEyNyBDMi42OTg3LDIyLjI3MTcgMi44NTE3LDIyLjMyMjcgMy4wMTI3LDIyLjM1NjcgQzMuMTU3NywyMi4zODI3IDMuMzEwNywyMi4zOTk3IDMuNDYyNywyMi4zOTk3IEwzNS45NjI3LDIyLjM5OTcgQzM2LjExNTcsMjIuMzk5NyAzNi4yNjg3LDIyLjM4MjcgMzYuNDEyNywyMi4zNTY3IEMzNi41NzQ3LDIyLjMyMjcgMzYuNzI2NywyMi4yODA3IDM2Ljg3MTcsMjIuMjEyNyBDMzcuMDA3NywyMi4xNTM3IDM3LjE0MjcsMjIuMDg1NyAzNy4yNzA3LDIxLjk5MTcgTDM3LjMyOTcsMjEuOTQ5NyBMMzguMTAxNywyMS40MjM3IEMzOC45MzM3LDIwLjg2MjcgMzkuNDI2NywxOS45MjA3IDM5LjQyNjcsMTguOTE5NyBMMzkuNDI2NywxNC4wOTg3IEMzOS40MzQ3LDEzLjAwMzcgMzguOTc2NywxMS45NTk3IDM4LjE2OTcsMTEuMjIwNyBaIE0yLjE4MTcsOC4wOTc3IEMyLjU4MDcsOC4wOTc3IDIuOTI4Nyw4LjEyMjcgMy4yNTA3LDguMTU2NyBMNC41MDY3LDcuMDEwNyBDNC4xMDc3LDYuNzIyNyAzLjcyNTcsNi4zNzQ3IDMuNTIyNyw1Ljk5MjcgQzMuMTQwNyw1LjI3OTcgMS42ODA3LDUuMTI2NyAwLjc1NTcsNS4xMDA3IEwwLjczODcsNS4xMDA3IEMwLjI5NjcsNS4xMDA3IC0wLjA1MTMsNS40OTk3IDAuMDA4Nyw1Ljk0MTcgQzAuMTQ0Nyw2LjgyNDcgMC42MTA3LDguMDk3NyAyLjE4MTcsOC4wOTc3IFogTTMuMDIxNywyMy4yNzM3IEwzLjAyMTcsMjQuNzI0NyBDMy4wMjE3LDI1Ljg4NzcgMy45NjM3LDI2LjgyMTcgNS4xMTc3LDI2LjgyMTcgTDUuOTE1NywyNi44MjE3IEM3LjA3ODcsMjYuODIxNyA4LjAxMjcsMjUuODc5NyA4LjAxMjcsMjQuNzI0NyBMOC4wMTI3LDIzLjMwNzcgTDMuNDYyNywyMy4zMDc3IEMzLjMxODcsMjMuMzA3NyAzLjE3NDcsMjMuMjk5NyAzLjAyMTcsMjMuMjczNyBaIE0zNy4yNjE3LDguMDk3NyBDMzguODQwNyw4LjA5NzcgMzkuMjk4Nyw2LjgzMjcgMzkuNDM0Nyw1Ljk0OTcgQzM5LjUwMjcsNS41MDg3IDM5LjE1NDcsNS4xMDk3IDM4LjcwNDcsNS4xMDk3IEwzOC42ODc3LDUuMTA5NyBDMzcuNzYyNyw1LjEzNDcgMzYuMzExNyw1LjI4NzcgMzUuOTIwNyw2LjAwMDcgQzM1LjcxNjcsNi4zODI3IDM1LjMzNDcsNi43MzA3IDM0LjkzNTcsNy4wMTk3IEwzNi4xOTI3LDguMTY1NyBDMzYuNTA2Nyw4LjExNDcgMzYuODYyNyw4LjA5NzcgMzcuMjYxNyw4LjA5NzcgWiIgaWQ9IkZpbGwtMSIgZmlsbD0iIzM5NkZGRiIgb3BhY2l0eT0iMC44IiBtYXNrPSJ1cmwoI21hc2stMikiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
      };

      var sexIcon = {
        男:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjEgKDU3NTAxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAyMEAyeDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJCSeaVsOaNruWIhuaekCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImM0LeS8muWRmOe7j+iQpeWIhuaekC3popzoibLlr7nmr5QyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjg1LjAwMDAwMCwgLTMxMDQuMDAwMDAwKSIgZmlsbD0iIzRDN0VGRiI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjg1LjAwMDAwMCwgMzEwNC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik04LDM0IEwxNiwzNCBMMTUuMTg3MTM0OSw0Ny4wMDU4NDIzIEMxNS4wODE5NDY4LDQ4LjY4ODg1MTIgMTMuNjg2MjkyOCw1MCAxMiw1MCBMMTIsNTAgQzEwLjMxMzcwNzIsNTAgOC45MTgwNTMyLDQ4LjY4ODg1MTIgOC44MTI4NjUxNCw0Ny4wMDU4NDIzIEw4LDM0IFoiIGlkPSJSZWN0YW5nbGUtMjYiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtOSIgY3g9IjEyIiBjeT0iNSIgcj0iNSI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC43OTI4NTA4NywxMiBMMTkuMjA3MTQ5MSwxMiBDMjEuNDE2Mjg4MSwxMiAyMy4yMDcxNDkxLDEzLjc5MDg2MSAyMy4yMDcxNDkxLDE2IEMyMy4yMDcxNDkxLDE2LjIzOTk2NjQgMjMuMTg1NTU1MywxNi40Nzk0NDYgMjMuMTQyNjI4OCwxNi43MTU1NDE4IEwyMC4yOTg1ODcxLDMyLjM1Nzc3MDkgQzIwLjEyNTY4MTQsMzMuMzA4NzUyMyAxOS4yOTc0MTk2LDM0IDE4LjMzMDg0NzMsMzQgTDUuNjY5MTUyNzEsMzQgQzQuNzAyNTgwNDIsMzQgMy44NzQzMTg1OSwzMy4zMDg3NTIzIDMuNzAxNDEyODksMzIuMzU3NzcwOSBMMC44NTczNzEyMjgsMTYuNzE1NTQxOCBDMC40NjIxODg0MywxNC41NDIwMzY0IDEuOTAzODAzNzMsMTIuNDU5NzAzMiA0LjA3NzMwOTEyLDEyLjA2NDUyMDQgQzQuMzEzNDA0ODQsMTIuMDIxNTkzOSA0LjU1Mjg4NDQ3LDEyIDQuNzkyODUwODcsMTIgWiIgaWQ9IlJlY3RhbmdsZS0yNSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
        女:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMjQgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjEgKDU3NTAxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAyMCBDb3B5QDJ4PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkJJ5pWw5o2u5YiG5p6QIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iYzQt5Lya5ZGY57uP6JCl5YiG5p6QLeminOiJsuWvueavlDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03NjEuMDAwMDAwLCAtMzEwNC4wMDAwMDApIiBmaWxsPSIjRTQwMDdGIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIwLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc2MS4wMDAwMDAsIDMxMDQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOCwzNCBMMTYsMzQgTDE1LjE4NzEzNDksNDcuMDA1ODQyMyBDMTUuMDgxOTQ2OCw0OC42ODg4NTEyIDEzLjY4NjI5MjgsNTAgMTIsNTAgTDEyLDUwIEMxMC4zMTM3MDcyLDUwIDguOTE4MDUzMiw0OC42ODg4NTEyIDguODEyODY1MTQsNDcuMDA1ODQyMyBMOCwzNCBaIiBpZD0iUmVjdGFuZ2xlLTI2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTkiIGN4PSIxMiIgY3k9IjUiIHI9IjUiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQuMDAwODgzNDEsMTIgTDE5Ljk5OTk1MDQsMTIgQzIyLjIwOTA4OTQsMTIgMjMuOTk5OTUwNCwxMy43OTA4NjEgMjMuOTk5OTUwNCwxNiBDMjMuOTk5OTUwNCwxNi4yODM4MTI0IDIzLjk2OTc0NDYsMTYuNTY2ODE4OCAyMy45MDk4NDMzLDE2Ljg0NDIzNzggTDE5Ljg0NTMwMzYsMzUuNjY4MjE2MiBDMTkuMDQ3NTYyMSwzOS4zNjI3NzE5IDE1Ljc4MDExNzEsNDIgMTIuMDAwNDE2OSw0MiBMMTIuMDAwNDE2OSw0MiBDOC4yMjA3MTY2OCw0MiA0Ljk1MzI3MTY5LDM5LjM2Mjc3MTkgNC4xNTU1MzAyLDM1LjY2ODIxNjIgTDAuMDkwOTkwNTEyNCwxNi44NDQyMzc4IEMtMC4zNzUyNjkxNzMsMTQuNjg0ODYzNiAwLjk5NzI3MTM0NywxMi41NTYzNjY4IDMuMTU2NjQ1NTcsMTIuMDkwMTA3MSBDMy40MzQwNjQ1OCwxMi4wMzAyMDU4IDMuNzE3MDcxMDIsMTIgNC4wMDA4ODM0MSwxMiBaIiBpZD0iUmVjdGFuZ2xlLTI1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4wMDAwMDAsIDI3LjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMTIuMDAwMDAwLCAtMjcuMDAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
      };

      let data = this.chartData.dist[type];
      let keys = Object.keys(data);
      let values = Object.values(data);

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
          }
        },
        color: ["#4C7EFF", "#E4007F", "#ccc"],
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
        grid: {
          width: "70%",
          left: "18%"
        },
        series: [
          {
            type: "bar",
            stack: "性别比例",
            barWidth: 10,
            label: {
              normal: {
                show: true,
                position: "left",
                offset: [40, -50]
              }
            },
            data: [
              {
                name: keys[0],
                value: values[0],
                label: {
                  position: "left",
                  normal: {
                    formatter: ["     {Male|}     " + "\n\n" + "{b}: {c}%"].join(
                      "\n"
                    ),
                    rich: {
                      Male: {
                        height: type === "tag_gender_dist" ? 40 : 25,
                        align: "center",
                        backgroundColor: {
                          image:
                            type === "tag_gender_dist"
                              ? sexIcon[keys[0]]
                              : carIcon[keys[0]]
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
            color: type === "tag_gender_dist" ? "#E4007F" : "#ccc",
            barWidth: 10,
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [-40, -50]
              }
            },
            data: [
              {
                name: keys[1],
                value: values[1],
                label: {
                  normal: {
                    formatter: ["{Female|}     " + "\n\n" + "{b}: {c}%"].join(
                      "\n"
                    ),
                    rich: {
                      Female: {
                        height: type === "tag_gender_dist" ? 40 : 25,
                        align: "center",
                        backgroundColor: {
                          image:
                            type === "tag_gender_dist"
                              ? sexIcon[keys[1]]
                              : carIcon[keys[1]]
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
    setMultipleProportion(type) {
      if (!this.chartData.dist[type]) return;
      var titlename = Object.keys(this.chartData.dist[type]);
      var valdata = Object.values(this.chartData.dist[type]);
      var xMax = Math.max.apply(null, valdata);
      let options = {
        xAxis: {
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
        },
        yAxis: [
          {
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#666"
            }
          },
          {
            show: true,
            inverse: true,
            data: ((valdata) => {
              let arr = [];
              valdata.forEach(item => {
                arr.push({
                  value: `${item}%`
                })
              });
              return arr;
            })(valdata),
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#999"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        grid: {
          width: "70%",
          left: "18%"
        },
        series: [
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            silent: true,
            data: valdata.map(function(d) {
              return xMax;
            }),
            barWidth: 8,
            itemStyle: {
              normal: {
                color: "#f2f2f2",
              }
            },
          },
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: valdata,
            barWidth: 8,
            itemStyle: {
              normal: {
                color: "#4C7EFF"
                // color: function(params) {
                //   var num = myColor.length;
                //   return myColor[params.dataIndex % num];
                // }
              }
            },
            label: {
              normal: {
                show: false,
                position: "inside",
                formatter: "{c}%"
              }
            }
          }
        ]
      };
      return options;
    },
    formatTable(type, data) {
      if (data.length == 0) {
        this.tableData[type].list = [];
        this.tableData[type].pageList = [];
        return;
      };
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
        if (!activityObjs[`${item.act_chnl_name}♚reg_members`]) {
          activityObjs[`${item.act_chnl_name}♚reg_members`] = [];
        }
        if (!activityObjs[`${item.act_chnl_name}♚add_members`]) {
          activityObjs[`${item.act_chnl_name}♚add_members`] = [];
        }
        activityObjs[`${item.act_chnl_name}♚reg_members`].push(item);
        activityObjs[`${item.act_chnl_name}♚add_members`].push(item);
      });

      let activityColumnKeys = Object.keys(activityObjs);
      function format(data) {
        let itemObjs = {};
        for (let i = 0; i < activityColumnKeys.length; i++) {
          let item = activityColumnKeys[i];
          let keys = item.split("♚");

          if (activityObjs[item].find(act => act.stat_ymd === data.stat_ymd)) {
            itemObjs[item] = activityObjs[item].find(
              act => act.stat_ymd === data.stat_ymd
            )[keys[1]];
            itemObjs[item] = itemObjs[item] == null ? "--" : itemObjs[item];
          }
        }
        return itemObjs;
      }

      let total2 = data.find(item => item.cat === "day-sum2");
      let activitySumObj = {};
      activitySum.forEach(sum => {
        activitySumObj.stat_ymd = "合计";
        activitySumObj[`${sum.act_chnl_name}♚reg_members`] =
          sum.reg_members == null ? "--" : sum.reg_members;
        activitySumObj[`${sum.act_chnl_name}♚add_members`] =
          sum.add_members == null ? "--" : sum.add_members;
        activitySumObj.reg_members = total2.reg_members;
        activitySumObj.add_members = total2.add_members;
      });

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
              key: `${item.act_chnl_name}♚reg_members`
            },
            {
              title: "新增",
              sortable: true,
              width: 100,
              key: `${item.act_chnl_name}♚add_members`
            }
          ]
        });
      });

      // createProxy(this.tableData[type]);
      this.tableData[type].totalRow = activitySumObj;

      this.tableData[type].columns = new Array(this.tableData[type].columns.shift());
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
      this.tableData[type].pageList = totalList.slice(0, 10);
      this.tableData[type].pageList.push(activitySumObj);
    },
    async getData(param) {
      let $api = this.$api;
      let _this = this;
      let [
        number,
        activity,
        qrcord,
        // sourcesAct,
        sourcesChnnl,
        dist
      ] = await Promise.all([
        $api.getMemberNumber(param),
        $api.getMemberActivity(param),
        $api.getMemberQrcord(param),
        // $api.getMemberSourcesAct(param),
        $api.getMemberSourcesChnnl(param),
        $api.getMemberDist(param)
      ]);
      this.chartData.number = number;
      if (activity.length > 0) {
        this.chartData.activity = activity.sort(function(a, b) {
          return new Date(a.stat_ymd) - new Date(b.stat_ymd);
        });
      }
      

      var format = function(data) {
        if (!data) return {};
        let obj = {};
        data.split(",").forEach(item => {
          let v = item.split(":");
          obj[v[0]] = v[1];
          // arr.push({
          //   [v[0]]: v[1]
          // })
        });
        return obj;
      };

      dist.forEach(item => {
        _this.chartData.dist[item.illustrate] = format(item.dist);
      });
      qrcord.map(item => item.rel_mbr = item.rel_mbr == 2 ? '关联' : '不关联');
      this.tableData.qrcord.list = qrcord;
      this.tableData.qrcord.pageList = qrcord.length > 0 ? qrcord.slice(0, 10) : [];

      // this.formatTable("activity", sourcesAct);
      
      delete(sourcesChnnl.total);
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
      this.drawChart(
        "number_other_chart3",
        this.setTwoProportion("tag_gender_dist")
      );
      this.drawChart(
        "number_other_chart4",
        this.setMultipleProportion("tag_age_dist")
      );
      this.drawChart(
        "number_other_chart5",
        this.setMultipleProportion("tag_ocp_dist")
      );
      this.drawChart("number_other_chart6", this.setPieOptions("tag_edu_dist"));
      this.drawChart(
        "number_other_chart7",
        this.setTwoProportion("tag_car_dist")
      );
      this.drawChart("number_other_chart8", this.setPieOptions("tag_m_dist"));
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
  computed: {
    searchParam() {
      return this.$store.state.BI.searchParam;
    }
  },
  async created() {
    let param = {
      start_date: "2018-08-01",
      end_date: "2018-08-21"
    };
    this.param = this.$store.state.BI.searchParam;
    this.getData(this.$store.state.BI.searchParam);
    eventBus.$on("updateSearchParam_sales-member", data => {
      this.param = data;
      this.getData(data);
    });
    await this.$api.getActivityList().then(res => {
      this.activityList = res;
    });
  },
  beforeDestroy() {
    eventBus.$off("updateSearchParam_sales-member");
  },
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
      width: 20%;
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