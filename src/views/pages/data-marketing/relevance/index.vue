<template>
  <div id="table_container">
  	<Row class="row">
        <Col span="4">
        	<span class="title-head">客流数据分析</span>
        </Col>
        <Col span="20">
          <div style="float:right;margin-top:4px">
	          <p>
		        <span class="btn-left" :class="[toggleName == 'dp' ? 'actived' : '']" @click="handleChange('dp')">日客流</span>
		        <span class="btn-right" :class="[toggleName == 'mp' ? 'actived' : '']" @click="handleChange('mp')">月客流</span>
		      </p>
	        <span>时间:</span>
	        <span v-if="toggleName == 'dp' ">
	        	<DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" :options="options[0]" v-model="start_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate['start_date'](start_date)"></DatePicker>
	        	<DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" :options="options[1]" v-model="end_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate['end_date'](end_date)"></DatePicker>
	        </span>
	        <span v-else>
	        	<DatePicker type="month" placeholder="请选择时间" :options="options[0]" v-model="start_month" @on-change="changeStartMonth"></DatePicker>
	        	<DatePicker type="month" placeholder="请选择时间" :options="options[0]" v-model="end_month" @on-change="changeEndMonth"></DatePicker>
	        </span>
	        
	        <span style="padding-left:5px">来源:</span>
	        <Select v-model="model2" size="small" style="width:100px">
			   <Option v-for="item in sourceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 </Select>
	      </div>
        </Col>
    </Row>
    <div style="margin-top:10px">
      <div id="timeLine" :style="{width: '100%', height: '300px'}"></div>
    </div>

    <Row class="row rowMargin">
        <Col span="4">
        	<span class="title-head">爬楼率分析</span>
        </Col>
        <Col span="20">
          <div style="float:right;margin-top:4px">
	        <span>时间:</span>
	        <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" :options="options[0]" v-model="stat_ymd" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeStatYmd"></DatePicker>
	        <Checkbox v-model="single" @on-change="checkChange">对比时段:</Checkbox>
	        <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" :options="options[0]" v-model="vs_day_ymd" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeVsDayYmd" :readonly="readonly" :disabled="disabled"></DatePicker>
	        <span style="padding-left:5px">来源:</span>
	        <Select v-model="model2" size="small" style="width:100px">
			   <Option v-for="item in sourceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 </Select>
	      </div>
        </Col>
    </Row>
    <div style="margin-top:10px">
      <div id="floorLine" :style="{width: '100%', height: '300px'}"></div>
    </div>

    <Row class="row rowMargin">
        <Col span="4">
        	<span class="title-head">停留时长分布</span>
        </Col>
        <Col span="20">
          <div style="float:right;margin-top:4px">
	        <span>时间:</span>
	        <DatePicker type="date" :clearable="false" :options="options[0]"  format="yyyy.MM.dd" v-model="stayDate" placeholder="请选择时间" class="filter-input filter-date-picker"></DatePicker>
	        <Select size="small" style="width:100px" :label-in-value="true" v-model="selectModel" @on-change="changeSelect">
			   <Option value="1">按区域</Option>
			   <Option value="2">按楼层</Option>
			   <Option value="3">按业态</Option>
			   <Option value="4">按店铺</Option>
			 </Select>
	         <Select v-model="selectModel1" size="small" style="width:100px" @on-change="changeFloorHandler">
			   <Option v-for="item in selectList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
			 </Select>
			 	
		 	<Select v-model="selectModel2" size="small" style="width:100px" v-show="floorShow" @on-change="changeFloorHandler2">
			   <Option v-for="item in selectList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			
		 	<Select v-model="selectModel3" size="small" style="width:100px" v-show="bizcatShow">
			   <Option v-for="item in selectList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			
		 	<Select filterable clearable ref="shopSel" v-model="selectModel4" size="small" style="width:100px" v-show="shopShow">
			   <Option v-for="item in selectList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Button @click="handleStay" class="searchBtn">
		        <span class="query">查询</span>
		     </Button>
			 
	      </div>
        </Col>
    </Row>
    <div style="margin-top:10px">
      <div id="waitLine" :style="{width: '100%', height: '300px'}"></div>
    </div>

  </div>
</template>
<script>
import dayjs from "dayjs";
import { sort } from "@/utils/filter.js";
 
export default {
  name: "ticketsTop",
  data() {
  	let _this = this;
    return {
	    _myChart3:{},
	    _myChart2:{},
	    _myChart1:{},
	    start_date: dayjs(new Date().getTime()-24*60*60*1000).subtract(1, "month").format("YYYY-MM-DD"),
	    end_date: dayjs(new Date().getTime()-24*60*60*1000).format("YYYY-MM-DD"),
	    start_month: dayjs(new Date()).subtract(6, "month").format("YYYY-MM"),
	    end_month: dayjs(new Date()).format("YYYY-MM"),
	    stat_ymd: dayjs(new Date().setTime(new Date().getTime()-24*60*60*1000)).format("YYYY-MM-DD"),
	    vs_day_ymd:dayjs(new Date().setTime(new Date().getTime()-2*24*60*60*1000)).format("YYYY-MM-DD"),
	    stayDate:dayjs(new Date().setTime(new Date().getTime()-24*60*60*1000)).format("YYYY-MM-DD"),
	    market_id: this.$route.query.market_id || 12555,
	    toggleName: "dp",
	    filterParam: {},
	    single: false,
	    disabledVsDayYmd:true,//对比时间段默认不可点击
	    floorShow:false,
	    bizcatShow:false,
	    shopShow:false,
	    readonly:true,
	    disabled:true,
	  	sourceList: [
		    {
		        value: '1',
		        label: 'WIFI客流'
		    }
	    ],
	    options: [
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
                (dayjs(_this.start_date).valueOf() &&
                  dayjs()
                    .subtract(1, "year")
                    .valueOf())) ||
              date.valueOf() >
              dayjs(_this.start_date)
                .add(1, "month")
                .valueOf() ||
              date.valueOf() > Date.now() ||
              date.valueOf() < dayjs(_this.start_date).valueOf()
            );
          }
        }
      ],
      changeDate: {
        start_date: date => {
          if (
            _this.start_date.valueOf() > _this.end_date.valueOf()
          ) {
            _this.end_date = null;
          }
          if (
            _this.start_date.valueOf() <
            dayjs(_this.end_date)
              .add(1, "month")
              .valueOf()
          ) {
            _this.end_date = null;
          }
          if (!_this.end_date) return;
          _this.startDate = dayjs(date).format("YYYY-MM-DD");
          this.dateLine(); 
        },
        end_date: date => {
          _this.endDate = dayjs(date).format("YYYY-MM-DD");
          this.dateLine(); 
        }   
      },
      	model2: '1',
	    selectModel:'1',
	    selectList1:[],
	    selectList2:[],
	    selectList3:[],
	    selectList4:[],
	    selectModel1:'',
	    selectModel3:'',
	    selectModel4:'',
	    selectModel2:''
	};
  },
  mounted() {
  	var that = this;
  	let statYmd1 = dayjs(new Date()).subtract(1, "day").format("YYYY-MM-DD");
    let vsDayYmd1 = dayjs(new Date()).subtract(2, "day").format("YYYY-MM-DD");
    this.dateLine();
    this.floorLine(statYmd1,'');
    this.getOrgList();
    window.onresize = function(){
    	 
		that._myChart1.resize && that._myChart1.resize();
    	that._myChart2.resize && that._myChart2.resize();
    	that._myChart3.resize && that._myChart3.resize();
    	
    } 
  },
  methods: {
  	 changeFloorHandler(){
  	    this.getFloorList();
  	 	if(this.selectModel == 4){
  	 		this.getShopList();
  	 	}
  	 },
  	 changeFloorHandler2(){
  	 	this.$refs.shopSel.clearSingleSelect();
  	 	this.getShopList();
  	 },
  	//客流数据分析---日客流与月客流切换
    handleChange(e) {
      this.toggleName = e;
      if(e == 'dp'){
        this.dateLine();
      }
      else if(e == 'mp'){
        this.monthLine();
      }
    },
    //日客流--开始时间
  	changeStartDate(val){
      	this.dateLine();
    },
    //日客流--结束时间
    changeEndDate(val){
      	this.dateLine();
    },
    //月客流--开始月份
    changeStartMonth(val){
	    this.monthLine();
    },
    //月客流--结束月份
    changeEndMonth(val){
		this.monthLine();
    },
    //爬楼率--时间
    changeStatYmd(val){
      	this.floorLine(dayjs(new Date(this.stat_ymd)).format("YYYY-MM-DD"),dayjs(new Date(this.vs_day_ymd)).format("YYYY-MM-DD"));
    },
    //爬楼率--对比时间
    changeVsDayYmd(val){
      	this.floorLine(dayjs(new Date(this.stat_ymd)).format("YYYY-MM-DD"),dayjs(new Date(this.vs_day_ymd)).format("YYYY-MM-DD"));
    },
    //爬楼率---对比时段选中与不选中状态
  	checkChange(val){
  		let statYmd1 = dayjs(new Date(this.stat_ymd)).format("YYYY-MM-DD");
        let vsDayYmd1 = dayjs(new Date(this.vs_day_ymd)).format("YYYY-MM-DD");
  		if(val){
           this.floorLine(statYmd1,vsDayYmd1);
           this.readonly = false;
           this.disabled = false;
          
  		}else{
  		   this.floorLine(statYmd1,'');
  		   this.readonly = true;
  		   this.disabled = true;
  		   
  		}
  	},
    //停留时长--时间
    // changeStayDate(val){
    // 	this.stayLine(dayjs(new Date(this.stayDate)).format("YYYY-MM-DD"),this.selectModel1,'','');
    // },
    //停留时长--下拉框
    changeSelect(val){
      val = val.value;
      if(val == 1){
      	this.floorShow = false;
      	this.bizcatShow = false;
      	this.shopShow = false;
      	this.getOrgList();
      }
      else if(val == 2){
      	this.floorShow = true;
      	this.bizcatShow = false;
      	this.shopShow = false;
      	this.getFloorList();
      }
      else if(val == 3){
      	this.floorShow = false;
      	this.bizcatShow = true;
      	this.shopShow = false;
      	this.getBizcatList();
      }
      else if(val == 4){
      	this.floorShow = true;
      	this.bizcatShow = false;
      	this.shopShow = true;
      	this.getFloorList();
      	

      }
    },
    //停留时长分布----店铺查询
  	handleStay() {
  		 var bizcat = '';
  		 if(this.selectModel == 3){
  		 	bizcat = this.selectModel3;
  		 }else if(this.selectModel == 4){
  		 	bizcat = this.selectModel4
  		 }

  		 this.stayLine(dayjs(new Date(this.stayDate)).format("YYYY-MM-DD"),this.selectModel1,this.selectModel2,bizcat);
  	},
  	
    dateLine:function(){
    	let param = {
		 "market_id":this.market_id,
		 "dimensionality":"dp",
		 "period_start_day":dayjs(new Date(this.start_date)).format("YYYY-MM-DD"),
		 "period_end_day":dayjs(new Date(this.end_date)).format("YYYY-MM-DD"),
		 "source":1
		}
      	this.$api.getpassengersum(param).then(res => {
			res.sort(function(a, b) {
			    return new Date(a.dy) - new Date(b.dy);
			});

      		let chartX = [];
	        let sm = [];
	        res.forEach(item => {
	        	if(item.dy){
	        		item.dy = dayjs(item.dy).format("MM.DD");
	        		chartX.push(item.dy);
	        	}
	        	
	            sm.push(item.sm);
	        });

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
			        data: ['日客流']
			    },
			    xAxis: {
			        type: 'category',
			        name: '日期',
			        splitLine: {show: false},
			        axisLine:{
                        lineStyle:{
                            color:'#999'
                        }
                    },
			        data: chartX
			    },
			    grid: {
			        left: '3%',
			        right: '12%',
			        bottom: '3%',
			        containLabel: true
			    },
			    yAxis: {
			        type: 'value',
			        name: '到访人数',
			        nameTextStyle:{     //名称的样式
		                color:'#999'
		            },
			        axisLabel: {  
	                  show: true,  
	                  interval: 'auto', 
	                  textStyle: {
				          color: "#999"
				      }
	                },  
	            	axisLine: {
				        show: false
				    },
				    axisTick: {
				        show: false
				    }
			    },
			    series: [
			        {
			            name: '日客流',
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
			            data: sm
			        }
			    ]
			};
	        if (option && typeof option === "object") {
	            this._myChart1.setOption(option, true);
	        } 

	    })
               
    },
    monthLine:function(){
    	let param = {
		 "market_id":this.market_id,
		 "dimensionality":"mp",
		 "period_start_month":dayjs(new Date(this.start_month)).format("YYYY-MM-DD"),
		 "period_end_month":dayjs(new Date(this.end_month)).format("YYYY-MM-DD"),
		 "source":1
		}
      	this.$api.getpassengersum(param).then(res => {
      		res.sort(function(a, b) {
			    return new Date(a.mh) - new Date(b.mh);
			});
      		let chartX = [];
	        let sm = [];
	        res.forEach(item => {
	           chartX.push(dayjs(item.mh).format("MM"+"月"));
	           sm.push(item.sm);
	        });

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
			        data: ['月客流']
			    },
			    xAxis: {
			        type: 'category',
			        name: '月份',
			        axisLine:{
                        lineStyle:{
                            color:'#999'
                        }
                    },
			        splitLine: {show: false},
			        data: chartX
			    },
			    grid: {
			        left: '3%',
			        right: '12%',
			        bottom: '3%',
			        containLabel: true
			    },
			    yAxis: {
			        type: 'value',
			        name: '到访人数',
			        nameTextStyle:{     //名称的样式
		                color:'#999'
		            },
			        axisLabel: {  
	                  show: true,  
	                  interval: 'auto', 
	                  textStyle: {
				          color: "#999"
				      }
	                },  
	            	axisLine: {
				        show: false
				    },
				    axisTick: {
				        show: false
				    }
			    },
			    series: [
			        {
			            name: '月客流',
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
			            data: sm
			        }
			    ]
			};
	        if (option && typeof option === "object") {
	            this._myChart1.setOption(option, true);
	        } 

	    })
               
    },
    floorLine:function(statYmd1,vsDayYmd1){
    	let param = {
		 "market_id":this.market_id,
		 "stat_ymd":statYmd1,
		 "source" :1
		}
		if(vsDayYmd1){
			param.vs_day_ymd = vsDayYmd1;
		}
      	this.$api.getclimbfloorsum(param).then(res => {
      		let chartX = [];
      		let fr1 = [];
	        let rationStart = [];
	        let rationComp = [];
	        if(res.length > 0){
	        	//var date = res[0].stat_ymd;
	        	res.forEach(item => {
		        	 if(statYmd1 == item.stat_ymd){
  						rationStart.push((item.ration*100).toFixed(2));
  						chartX.push(item.fr);
		        	 }
		        	 if(vsDayYmd1 == item.stat_ymd){
		        	 	rationComp.push((item.ration*100).toFixed(2));
		        	 }
		        });
	        }
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
			        name:'爬楼数',
			        axisLine:{
                        lineStyle:{
                            color:'#999'
                        }
                    },
			        splitLine: {show: false},
			        data: chartX
			    },
			    grid: {
			        left: '3%',
			        right: '12%',
			        bottom: '3%',
			        containLabel: true
			    },
			    yAxis: {
			        type: 'value',
			        name: '爬楼率',

			        axisLabel: {  
	                  show: true,  
	                  interval: 'auto', 
	                  textStyle: {
				          color: "#999"
				      }, 
	                  formatter: '{value} %'  
	                },  
	            	nameTextStyle:{     //名称的样式
		                color:'#999'
		            },
	            	axisLine: {
				        show: false
				    },
				    axisTick: {
				        show: false
				    }
			    },
			    series: [
			        {
			            name: '对比爬楼率',
			            type: 'line',
			            smooth: true,
			            // symbol:'none',//这句就是去掉点的  
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
			            data: rationComp
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
			            data: rationStart
			        }
			    ]
			};
	        if (option && typeof option === "object") {
	            this._myChart2.setOption(option, true);
	        } 

	    })
                
    },
    // 停留时长--获取商场建筑物
    getOrgList(){
    	this.$api.getOrgList({market_id: this.market_id}).then(res => {
        res.forEach(item =>{
        	item.value = item.org_id;
        	item.label = item.org_name;
        });
        if(res.length > 0){
	        this.selectList1 = res;
	        this.selectModel1 = '01';
	        this.stayLine(dayjs(new Date(this.stayDate)).format("YYYY-MM-DD"),this.selectModel1,'','');
	    }
      });
    },
    // 停留时长--获取楼层
    getFloorList(){
	      this.$api.getFloorList({market_id: this.market_id,org_id:this.selectModel1}).then(res => {
	        res.forEach(item =>{
	        	item.value = item.shop_floor;
	        	item.label = item.shop_floor;
	        });
	        if(res.length > 0){
		        this.selectList2 = res;
		        this.selectModel2 = '';
		    }
		    this.getShopList();
	      });
    },
	// 停留时长--获取业态
	getBizcatList(){
    	this.$api.getBizcatList({market_id: this.market_id,org_id:this.selectModel1}).then(res => {
        res.forEach(item =>{
        	item.value = item.shop_bizcat;
        	item.label = item.shop_bizcat;
        });
        if(res.length > 0){
	        this.selectList3 = res;
	        this.selectModel3 = '';
	    }
      });
    },
    // 停留时长--获取店铺
    getShopList(){
    	this.$api.getShopList({market_id: this.market_id,org_id:this.selectModel1,shop_floor:this.selectModel2}).then(res => {
        	res.forEach(item =>{
	        	item.value = item.shop_id;
	        	item.label = item.shop_name;
	        });
	        if(res.length > 0){
	        	this.selectList4 = res;
	       		this.selectModel4 = '';
	        }
	        
        });
    },
    //停留时长--停留时长折线图
    stayLine:function(stat_ymd,org_id,shop_floor,shop_bizcat){
	    let param = {
		 "market_id":this.market_id,
		 "stat_ymd":stat_ymd
		}
		if(org_id){
			param.org_id = org_id;
		}
		if(shop_floor){
			param.shop_floor = shop_floor;
		}
		if(shop_bizcat){
			param.shop_bizcat = shop_bizcat;
		}
      	this.$api.stay(param).then(res => {
      		let that = this;
        	let chartX = [];
	        let ration = [];
	        res.forEach(item => {
	           item.ration = (item.ration * 100).toFixed(2);
	           chartX.push(item.timeq);
	           ration.push({name:item.timeq,value:item.ration,avg_dura:item.avg_dura});
	        });

	        var dom = document.getElementById("waitLine");
	        this._myChart3 = echarts.init(dom);
	        var option = null;
	        option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: function(params) {
			        	if(params && params.length>0){
                            var res =params[0].data.name + '<br/>人均停留时长:' + params[0].data.avg_dura + '<br/>人数占比:' + params[0].data.value + '%';
                            return res;
			        	}	
                    }

			    },
			    legend: {
			        right:"12%",
			        data: ['停留时长分布']
			    },
			    xAxis: {
			        type: 'category',
			        name:'停留时长(分钟)',
			        axisPointer: {
			            snap: true,
			            lineStyle: {
			                color: '#ccc',
			                opacity: 0.5,
			                type: 'dashed',
			                width: 2
			            },
			            label: {
			                show: false,
			                backgroundColor: '#ccc'
			            },
			            handle: {
			                show: true
			            }
			        },
			        axisLine:{
                        lineStyle:{
                            color:'#999'
                        }
                    },
			        splitLine: {show: false},
			        data:chartX
			    },
			    grid: {
			        left: '3%',
			        right: '12%',
			        bottom: '3%',
			        containLabel: true
			    },
			    yAxis: {
			        type: 'value',
			        name: '人数占比',
			        nameTextStyle:{     //名称的样式
		                color:'#999'
		            },
			        axisLabel: {  
	                  show: true,  
	                  interval: 'auto', 
	                  textStyle: {
				          color: "#999"
				      },
	                  formatter: '{value} %'  
	                },  
	            	axisLine: {
				        show: false
				    },
				    axisTick: {
				        show: false
				    }
			    },
			    series: [
			        {
			            name: '停留时长',
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
			            data: ration
			        }
			    ]
			};
	        if (option && typeof option === "object") {
	            this._myChart3.setOption(option, true);
	        } 

	    })
                
    },

  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/public.scss";

p {
  display: inline-block;
  margin-right:10px;
  span {
    display: inline-block;
    cursor: pointer;
    width: 3.75rem;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
  }
  .btn-left {
    color: $color-primary;
    border: 1px solid $color-primary;
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
  }
  .btn-right {
    color: $color-primary;
    border: 1px solid $color-primary;
    border-top-right-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
  }
  .actived {
    background: rgba(42, 57, 98, 0.8);
    color: rgba(255, 255, 255, 1);
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
.title-head{
	display:inline-block;
	margin-top:4px;
	font-size: 14px;
    color: #2a3962;
    font-family: MicrosoftYaHei;
}
</style>
