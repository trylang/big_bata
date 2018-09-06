<template>
  <div id="table_container">
  	<Row class="row">
        <Col span="4">
        	<h4 style="margin-top:4px">客流数据分析</h4>
        </Col>
        <Col span="20">
          <div style="float:right;margin-top:4px">
	        <span>时间:</span>
	        <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" v-model="param.start_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate"></DatePicker>
	        <Checkbox v-model="single">对比时段:</Checkbox>
	        <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" v-model="param.end_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate"></DatePicker>
	        <span>来源:</span>
	        <Select v-model="model2" size="small" style="width:100px">
			   <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 </Select>
	      </div>
	      <p class="tiket_btn" style="margin-right:10px">
        	<span v-for="(item, index) in btnList" :key="index" :class="[`tiket_btn${index+1}`, toggleName == item.type ? 'active' : '']" @click="handleChange(item.type)">{{item.title}}</span>
          </p>
        </Col>
    </Row>
    <div style="margin-top:10px">
      <div id="timeLine" :style="{width: '92%', height: '300px'}"></div>
    </div>

    <Row class="row rowMargin">
        <Col span="4">
        	<h4 style="margin-top:4px">爬楼率分析</h4>
        </Col>
        <Col span="20">
          <div style="float:right;margin-top:4px">
	        <span>时间:</span>
	        <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" v-model="param.start_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate"></DatePicker>
	        <Checkbox v-model="single">对比时段:</Checkbox>
	        <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" v-model="param.end_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate"></DatePicker>
	        <span>来源:</span>
	        <Select v-model="model2" size="small" style="width:100px">
			   <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 </Select>
	      </div>
        </Col>
    </Row>
    <div style="margin-top:10px">
      <div id="floorLine" :style="{width: '92%', height: '300px'}"></div>
    </div>

    <Row class="row rowMargin">
        <Col span="4">
        	<h4 style="margin-top:4px">停留时长分布</h4>
        </Col>
        <Col span="20">
          <div style="float:right;margin-top:4px">
	        <span>时间:</span>
	        <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" v-model="param.start_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate"></DatePicker>
	        <span>建筑物:</span>
	        <Select v-model="model2" size="small" style="width:100px">
			   <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 </Select>
			 <span>楼层:</span>
	        <Select v-model="model2" size="small" style="width:100px">
			   <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 </Select>
			 <span>业态:</span>
	        <Select v-model="model2" size="small" style="width:100px">
			   <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 </Select>
			 <span>店铺:</span>
	        <Select v-model="model2" size="small" style="width:100px">
			   <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 </Select>
			 <Button @on-click="handle" class="searchBtn">
		        <span class="query">查询</span>
		     </Button>
	      </div>
        </Col>
    </Row>
    <div style="margin-top:10px">
      <div id="waitLine" :style="{width: '92%', height: '300px'}"></div>
    </div>

  </div>
</template>
<script>
import dayjs from "dayjs";
import { sort } from "@/utils/filter.js";
 
export default {
  name: "ticketsTop",
  data() {
    return {
      _myChart3:{},
      _myChart2:{},
      _myChart1:{},
      toggleName: "sum",
      param: {
        start_date: dayjs(new Date())
          .subtract(1, "month")
          .format("YYYY-MM-DD"),
        end_date: dayjs(new Date()).format("YYYY-MM-DD"),
        region_id: "1",
        org_id: null,
        shop_floor: null,
        shop_bizcat: null,
        shop_id: null,
        activity_id: null,
        stat_type: null
      },
      toggleName: "this_week",
      filterParam: {},
      single: false,
      btnList: [
        {
          title: "当周",
          type: "this_week"
        },
        {
          title: "上周",
          type: "last_week"
        },
        {
          title: "当月",
          type: "this_month"
        },
        {
          title: "上月",
          type: "last_month"
        }
      ],
      cityList: [
        {
            value: 'New York',
            label: 'New York'
        },
        {
            value: 'London',
            label: 'London'
        },
        {
            value: 'Sydney',
            label: 'Sydney'
        },
        {
            value: 'Ottawa',
            label: 'Ottawa'
        },
        {
            value: 'Paris',
            label: 'Paris'
        },
        {
            value: 'Canberra',
            label: 'Canberra'
        }
    ],
    model2: '',
    };
  },
  mounted() {
  	var that = this;
    this.timeLine();
    this.floorLine();
    this.waitLine();
    window.onresize = function(){
    	that._myChart1.resize();
    	that._myChart2.resize();
    	that._myChart3.resize();
    } 
  },
  methods: {
  	handle() {

  	},
  	changeDate(val) {

  	},
    handleChange(type) {
      let _this = this;
      this.toggleName = type; //last_month
      this.top2Tail10.forEach(item => {
        item.list = _this.couponObj[item.type].filter(item => {
          return item.stat_date === type;
        });
      });
    },
    timeLine:function(){
        var dom = document.getElementById("timeLine");
        this._myChart1 = echarts.init(dom);
        var option = null;
        option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c}'
		    },
		    legend: {
		        right:"12%",
		        data: ['时段客流', '对比客流']
		    },
		    xAxis: {
		        type: 'category',
		        splitLine: {show: false},
		        data: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
		    },
		    grid: {
		        left: '3%',
		        right: '12%',
		        bottom: '3%',
		        containLabel: true
		    },
		    yAxis: {
		        type: 'log',
		        name: '到访人数'
		    },
		    series: [
		        {
		            name: '对比客流',
		            type: 'line',
		            smooth: true,//这句就是让曲线变平滑的
		            symbol:'none',//这句就是去掉点的  
		            itemStyle : {
						normal : {
							lineStyle:{
								color:'#e83798',
								type:'dotted'
							},
							color:'#e83798'
						}
					},
					areaStyle:{
		                normal:{
		                    color: "#fffafd"
		                }
		            },
		            data: [10, 3, 69, 7, 81, 247, 41, 223, 69]
		        },
		        {
		            name: '时段客流',
		            type: 'line',
		            smooth: true,//这句就是让曲线变平滑的
		            itemStyle : {
						normal : {
							lineStyle:{
								color:'#7499fb'
							},
							color:'#90affc'
						}
					},
					areaStyle:{
		                normal:{
		                    color: "#ebebfc"
		                }
		            },
		            label: {
		              normal: {
		                  show: true,
		                  position: 'top'
		              }
		            },
		            data: [1, 23, 4, 8, 16, 32, 64, 128, 256]
		        }
		    ]
		};
        if (option && typeof option === "object") {
            this._myChart1.setOption(option, true);
        } 
               
    },
    floorLine:function(){
        var dom = document.getElementById("floorLine");
        this._myChart2 = echarts.init(dom);
        var option = null;
        option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c}'
		    },
		    legend: {
		        right:"12%",
		        data: ['爬楼率', '对比爬楼率']
		    },
		    xAxis: {
		        type: 'category',
		        splitLine: {show: false},
		        data: ['一层', '二层', '三层', '四层', '五层', '六层', '七层', '八层', '九层','十层及以上']
		    },
		    grid: {
		        left: '3%',
		        right: '12%',
		        bottom: '3%',
		        containLabel: true
		    },
		    yAxis: {
		        type: 'log',
		        name: '爬楼率',
		        axisLabel: {  
                  show: true,  
                  interval: 'auto',  
                  formatter: '{value} %'  
                },  
            	show: true 
		    },
		    series: [
		        {
		            name: '对比爬楼率',
		            type: 'line',
		            smooth: true,
		            symbol:'none',//这句就是去掉点的  
		            itemStyle : {
						normal : {
							lineStyle:{
								color:'#e83798',
								type:'dotted'
							},
							color:'#e83798',
							label: {  
		                        show: true,  
		                        position: 'top',  
		                        formatter: '{c}%'  
		                    }  
						}
					},
					areaStyle:{
		                normal:{
		                    color: "#fffafd"
		                }
		            },
		            data: [10, 3, 69, 7, 81, 47, 41, 23, 69,11]
		        },
		        {
		            name: '爬楼率',
		            type: 'line',
		            smooth: true,
		            itemStyle : {
						normal : {
							lineStyle:{
								color:'#7499fb'
							},
							color:'#90affc'
						}
					},
					areaStyle:{
		                normal:{
		                    color: "#ebebfc"
		                }
		            },
		            label: {
		              normal: {
		                  show: true,
		                  position: 'top',
		                  formatter: '{c}%'  
		              }
		            },
		            data: [1, 23, 4, 8, 16, 32, 64, 28, 56,23]
		        }
		    ]
		};
        if (option && typeof option === "object") {
            this._myChart2.setOption(option, true);
        } 
                
    },
    waitLine:function(){
        var dom = document.getElementById("waitLine");
        this._myChart3 = echarts.init(dom);
        var option = null;
        option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c}'
		    },
		    legend: {
		        right:"12%",
		        data: ['停留时长分布']
		    },
		    xAxis: {
		        type: 'category',
		        splitLine: {show: false},
		        data: ['0', '10', '20', '30', '40', '50', '60', '70', '80及以上']
		    },
		    grid: {
		        left: '3%',
		        right: '12%',
		        bottom: '3%',
		        containLabel: true
		    },
		    yAxis: {
		        type: 'log',
		        name: '停留率',
		        axisLabel: {  
                  show: true,  
                  interval: 'auto',  
                  formatter: '{value} %'  
                },  
            	show: true 
		    },
		    series: [
		        {
		            name: '停留时长分布',
		            type: 'line',
		            smooth: true,
		            itemStyle : {
						normal : {
							lineStyle:{
								color:'#7499fb'
							},
							color:'#90affc'
						}
					},
					areaStyle:{
		                normal:{
		                    color: "#ebebfc"
		                }
		            },
		            label: {
		              normal: {
		                  show: true,
		                  position: 'top',
		                  formatter: '{c}%'  
		              }
		            },
		            data: [1, 23, 4, 8, 16, 32, 64, 18, 36]
		        }
		    ]
		};
        if (option && typeof option === "object") {
            this._myChart3.setOption(option, true);
        } 
                
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/public.scss";

.tiket_btn {
  float: right;
  width: 226px;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid rgba(42, 57, 98, 1);
  margin-top: 0.4rem;
  .active {
    background: rgba(42, 57, 98, 0.8);
    color: rgba(255, 255, 255, 1);
  }
  span {
    display: inline-block;
    width: 56px;
    height: 23px;
    line-height: 24px;
    text-align: center;
  }
  .tiket_btn1 {
    border-right: 1px solid rgba(42, 57, 98, 1);
    border-radius: 12px 0px 0px 12px;
  }
  .tiket_btn2,
  .tiket_btn3 {
    border-right: 1px solid rgba(42, 57, 98, 1);
  }
  .tiket_btn4 {
    border-radius: 0 12px 12px 0;
  }
}

.searchBtn {
  width: 64px;
  height: 24px;
  margin-left: 10px;
  border-radius: 12px;
  border: 1px solid rgba(42, 57, 98, 0.4);

  .query {
    display: block;
    height: 12px;
    font-size: 12px;
    text-align: center;
    font-family: MicrosoftYaHei;
    color: $color-primary;
    line-height: 11px;
  }
}
.row{
	border-bottom:1px solid #f2f2f2;
	padding-bottom:5px;
}
.rowMargin{
	margin-top:20px
}

</style>
