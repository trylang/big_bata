<template>
  <div id="table_container">
  	<div class="ticketsTop">
      <header>
	      <h4 class="title-head">活动对比</h4>
	      <p>
	        <span class="btn-left" :class="[toggleName == 'sum' ? 'actived' : '']" @click="handleChange('sum')">总量</span>
	        <span class="btn-right" :class="[toggleName == 'average' ? 'actived' : '']" @click="handleChange('average')">日均</span>
	      </p>
	    </header>
      <Row style="margin-top:10px">
          <Col span="9" offset="1">
            <div>
              <span>时间:</span>
	          <DatePicker type="date" :clearable="false" format="yyyy.MM.dd" :options="options[0]" v-model="start_date1" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate['start_date1'](start_date1)"></DatePicker>
	          <DatePicker type="date" :clearable="false" format="yyyy.MM.dd" :options="options[1]" v-model="end_date1" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate['end_date1'](end_date1)"></DatePicker>
	          <span style="padding-left:10px">活动1:</span>
	          <Select :label-in-value="true" v-model="selectActivity1" @on-change="changeSelect1" size="small" style="width:100px">
    			    <Option v-for="item in activityList1" :value="item.activity_id" :key="item.activity_id">{{ item.activity_name }}</Option>
    			</Select>
	        </div>
	        <div class="holidayDetail">
	        	<div>活动名称:<span style="font-weight:bold">{{activityName1.label}}</span></div>
            <div>活动时间:<span>{{periodTime1}}</span></div>
	        	<!-- <div>活动时间:<span>{{startDate1}}</span><span> - </span><span>{{endDate1}}</span></div> -->
	        </div>
          </Col>
          <Col span="4" style="text-align:center">
            <div @click="compareHandler" style="margin-top:40px;cursor:pointer">
              <div v-if="compareFlag == 0 ">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAABMNJREFUaAXtmH9oVWUYx7/PuZtzxtqKYdEMK5mVadb6Abubtkni/sgRmYZF/RGlEG3ubjb/CRpDCGt5rzgwrAySbGvGCIbWkLrGdhdsXGQVqPTLfuEfEhvqdefunvP2fVdnnF2LGrt3rXzfy+F93+f9cd7nc57nOc+5giyXYIOKxSIS1LdZ/YIqdVKYl37L3EKcibbIBS0vb1DDBTko722Ti9487vGGUjg8sEc+9mS6rmhWNygHuX5Zenu+i9QnYfk5XZ6pfk6mNvqrfah4sTeWGsdHbPcrwPVkQmbJETSuCakTtmApgSQTLkoI54LloIjrcyk7pgStlY3qrF7nCkZir8kZ10YEgiW+vYrYvpb7f+vJxhR+YXu91890zfNnp1Q0qGdchZVU8EkoHLSALwmhefntuG3/Vhn37lq+Te0TQQ/7t/J6msqf46F+YHuQVykvDSW9DNKq96YLab0P816P01I3pY9lq581C8wVRG2FH6nQVsnBOwELI7TA5tMnsTjYpCYBwkGBVo5AdhNArVjYKwpF/WF5S8sJ+E0CPkS/j9vAoavysPnYLhnVY3OhZA1gNCxfE8hmKhmQAE5+9oqcJwxJAjsJbdKFaXH3wUJHVbNalEzCsRSSHLxJw6EVP8Hx0pIgjndtEicYUj2JMRypalHrUqNY6AawQM/zCl19Ma23MLhdLfdkumYoSPSFZdKt/WMzbWcN4MaQyv/JxRYqNKps9JY3qiaCQ0kRnupq0Rx/L4T8um7Z49hAN49zyi20wOs5/27lopVDbe9v1GGPRfEHnGLMfI6x8Ub2VmixVzinmLKFKoV2T6ZrR+ELVnV+WabaE+fK1Gb+fSpC6nkquZRXDd23hkrU8Wa1Vh6qxcakCxPYLq7rtATzGDOrCeBm9q+jKx/IVegg6XbG0Z78fHx66SL6C5fgjiN1SIoQc1r5X8VA18XqvHmot5Oo+cN9QkxHap0xRAjS78JljHGdnNNNHt2VIbWeg/czBk5YJt+8rY6D7rEE7lGMj0frxZb6NHL/YjdrLpwn2BJ9VUYY96aot2IZHkt/C+sJwW1KY7mLVqjdsoTWtDYWRjkt7TTHhgn12YIASvTcuVSyBjAakZE/U/Sb73E1c7zJGMjWRGJNFx7mS2FAXCyj25cOROTFVfPVNbTal/gI7qXDxs+PI0YL3UFr1fnkZSUgWMCQMPWJXTYrswLG7dktiUs4zJfKh95FdWv0CfoiEmVyPEj3/pUxT+k3uDuGr0gjUVyElbE9soZx8WXHxdu06t3+U3NuJ2XvcmwnFTrhH8t2O2sW6B3csrDPaxPW/kUVaNMpiSdjqvJIwPflQCv8Dim4gQDO8m1aTXCnvLmxsHQ8uEMdte2p6QvToIOMqgWE394XxucS8VaY2hAwBAwBQ8AQmCMEKhtUVfpRZj2NST/Af6nPZL6rokmt9Z/ZAPTT+Pt2rZvCe/yj4yFvqgHokfgHNf+zHAjkYB2z2AP8QnpUL2Huacp0Cazaru7kn8O9eRYqhZ9As/rtON3DmvmGgCFgCBgChoAhYAgYAobAXCQgQ0NDJpGewZPJsSyrynXdD1hvKCsrOz6Dva7cpfF4/AFa4jldX7kUZqi5gThDgHq5gTh9iL8Bf/HVoDX7AUUAAAAASUVORK5CYII=">
              </div>
              <div v-else>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAjCAYAAAADp43CAAAAAXNSR0IArs4c6QAABL5JREFUaAXtmWtoXEUUx//nbh5NJSZKqGIqVUuq1taqVSGbtCbFYj7YINZWqugH0RbEpNlU0y+CIRSkGrtbGqjUF1isTVMJQmg1FN1qshGSbEpUaIuv+qKISELbbXaz947/id7lZmspMbsx6pxwmZkz586d+d1zzszdCLIs/gYViYTErx+z8jlVZieRl/7I3CKcCjfLWa0vb1DDhTko726Vc64dx3hNKRzs2ykfujpdVjSpa5SNXK8uvT7HQfKjoPyUrs9UOydTA11sHC68xO1LjuMD1nsV4Lg6IbPECBpXBdSxuGARgSRiDkoJ56xlo5j351J3RAlaKhvVaX2fIxiJvCKnnDhCECz0jFXM+pUc/xtXN6bwM+tr3HamS84/O1LRoJ50FJZxgY9BYa8FfEEITUtuxk17Nsm4+9TyzWq3CLrYvpHXE1z8r5zU96z38yrjpaGkSz+9ele6kt77AJ/1CD11fXpfttpZ88BcQTiu8AMXtEly8LbPwgg9sOnkcSzwb1EpgLBRqBdHIDsIoFYs7BKF4t6gvKH1BPw6Ae9j3EfjwL7L8rHhyHYZ1X2zQbIGMByUrwhkAxfpEx+Of/KSnCEMSQDbCC0VwvS4u2Bhf1WTmp9IwLYUEuy8TsOhFz/K/rJSP452rBfbH1BdsTEcqmpW9yVHMc/xYa62c4WhvoDeW+R/Vi1xdbpkKoj1BCUV1t6+6dazBnBdQBX86GAjFzSq4ugub1RbCA6lxXi8o1lz/EMI+VVdi49jLcM8SpMb6IFX0/525aCFXa0H1um0R1H8A04wZz7N3HgtW0u12hXalFA3TyXR5up0aSt8zqLOq8tUfWJemRrMO05FQD3DRS7iVcPwreEi6viwWisf1RJHKoQJbDvva7cEecyZ1QRwPdtXMZTfzFXYT9JtzKNdBQX4+Pw59BYtxC2H6pAQIeY0+U/lQMfByvw81McTqPkzfAI8jtTaYwgRpDeE72COa6dNJ3l0VgbUGnbezRw44ZnceVtsG51jMSxXzI+H6yUu9Wnk/sFm1kI4X7Ax/LKMMO9NWt7SxXg4fRfWBv7NSmO5jV6ow7KU3rQ6EkQ5Pe0k+4YJ9alCH0q17WySrAEMh2Tkrxb69Xe4nGe8VA5kbeJgzRAe5qbQJw4WM+zL+kLy/Io56gp67Qt8BXcyYKNnxhGhh26lt+rz5AXiE8xlSpj8xi6wyqyCeXtmJXYeB7mpvO9eXG6NnkFPSMI8HPczvH9jzlN6B3fG8CVpxEqKsSyyU1YxL75oO3iLXr3DO2vatlP3Dvu2cUHHvH3ZrmfNA92JWxZ2u3XC2jO/Aq36SOLqeFR50Of5cqAXfoskHJ8Pp7mbVhPcCdc2EpT9925Vh+PxyccXHoP2MqsWEn5bTxCfSci9w5SGgCFgCBgChsAsITA0NFSVPpUZP8akT+Df1LZtu4MQV3vnbAB6aVyibllWLSG+Ozg4eP8lTE33xQgQ3nJev0Sj0Ye0Dc+eRqZKgABvVUp18zu9UgYGBmb023GqkzX2hoAhYAgYAoaAIWAIGAKGwGwkIPxfgjlIT+PN5ORYqEo6eI/l2k+DcnQaY/0vb534Fl4RUPcYiH/v/ad+TDAQpwlQ324gTh3i78b22g7XS3sQAAAAAElFTkSuQmCC">
              </div>
            </div>
          </Col>
          <Col span="9">
            <div>
              <span>时间:</span>
	          <DatePicker type="date" :clearable="false" :options="options[0]" format="yyyy.MM.dd" v-model="start_date2" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate['start_date2'](start_date2)"></DatePicker>
	          <DatePicker type="date" :clearable="false" :options="options[2]"  format="yyyy.MM.dd" v-model="end_date2" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate['end_date2'](end_date2)"></DatePicker>
	          <span style="padding-left:10px">活动2:</span>
	          <Select :label-in-value="true" v-model="selectActivity2" @on-change="changeSelect2" size="small" style="width:100px">
      			    <Option v-for="item in activityList2" :value="item.activity_id" :key="item.activity_id">{{ item.activity_name }}</Option>
      			</Select>
	        </div>
	        <div class="holidayDetail">
	        	<div>活动名称:<span style="font-weight:bold">{{activityName2.label}}</span></div>
            <div>活动时间:<span>{{periodTime2}}</span></div>
	        	<!-- <div>活动时间:<span>{{startDate2}}</span><span> - </span><span>{{endDate2}}</span></div> -->
	        </div>
          </Col>
      </Row>
      <div style="margin-top:30px">
      	<i-Table width="100%" :columns="columns1" :data="data1"></i-Table>
      </div>
      
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { sort } from "@/utils/filter.js";
import axios from 'axios'
export default {
  name: "ticketsTop",
  data() {
    let _this = this;
    let renderHandler = (h, params) => {
         let ratioRender,color='',ratio=params.row[params['column']['key']+'_ratio'];
         if(params.index == _this.compareFlag){
            if(ratio > 0 ){
              color = '#90c31f';
              ratioRender = h('div', {
                  style: {
                      color: color
                  }
              }, (Math.abs(ratio* 100)).toFixed(2)+'%  ↑');
            }
            else if(ratio < 0){
              color = '#e4007f';
              ratioRender = h('div', {
                  style: {
                      color: color
                  }
              }, (Math.abs(ratio* 100)).toFixed(2)+'%  ↓');
            }
            else if(parseInt(ratio) == 0){
              color = '#999';
              ratioRender = h('div', {
                  style: {
                      color: color
                  }
              }, (Math.abs(ratio* 100))+'%  -');
            }
         }
          return h('div', [
                   h('div', {

                   }, params.row[params['column']['key']]),ratioRender
          ]);
      };
    return {
      market_id: this.$route.query.market_id || 12555,
      toggleName: "sum",
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
                (dayjs(_this.start_date1).valueOf() &&
                  dayjs()
                    .subtract(1, "year")
                    .valueOf())) ||
              date.valueOf() >
              dayjs(_this.start_date1)
                .add(1, "month")
                .valueOf() ||
              date.valueOf() > Date.now() ||
              date.valueOf() < dayjs(_this.start_date1).valueOf()
            );
          }
        },
        {
          disabledDate(date) {
            return (
              (date &&
                date.valueOf() <
                (dayjs(_this.start_date2).valueOf() &&
                  dayjs()
                    .subtract(1, "year")
                    .valueOf())) ||
              date.valueOf() >
              dayjs(_this.start_date2)
                .add(1, "month")
                .valueOf() ||
              date.valueOf() > Date.now() ||
              date.valueOf() < dayjs(_this.start_date2).valueOf()
            );
          }
        }
      ],
      changeDate: {
        start_date1: date => {
          if (
            _this.start_date1.valueOf() > _this.end_date1.valueOf()
          ) {
            _this.end_date1 = null;
          }
          if (
            _this.start_date1.valueOf() <
            dayjs(_this.end_date1)
              .add(1, "month")
              .valueOf()
          ) {
            _this.end_date1 = null;
          }
          if (!_this.end_date1) return;
          _this.startDate1 = dayjs(date).format("YYYY-MM-DD");
          _this.actList1().then(function(){
            if(_this.toggleName == 'sum'){
              _this.actContrastSum();
            }else{
              _this.actContrastAvg();
            }
          });
        },
        end_date1: date => {
          _this.endDate1 = dayjs(date).format("YYYY-MM-DD");
          _this.actList1().then(function(){
            if(_this.toggleName == 'sum'){
              _this.actContrastSum();
            }else{
              _this.actContrastAvg();
            }
          });
        },
        start_date2: date => {
          if (
            _this.start_date2.valueOf() > _this.end_date2.valueOf()
          ) {
            _this.end_date2 = null;
          }
          if (
            _this.start_date2.valueOf() <
            dayjs(_this.end_date2)
              .add(1, "month")
              .valueOf()
          ) {
            _this.end_date2 = null;
          }
          if (!_this.end_date2) return;
          
          _this.startDate2 = dayjs(date).format("YYYY-MM-DD");
          _this.actList2().then(function(){
            if(_this.toggleName == 'sum'){
              _this.actContrastSum();
            }else{
              _this.actContrastAvg();
            }
          });
        },
        end_date2: date => {
          _this.endDate2 = dayjs(date).format("YYYY-MM-DD");
          _this.actList2().then(function(){
            if(_this.toggleName == 'sum'){
              _this.actContrastSum();
            }else{
              _this.actContrastAvg();
            }
          });
        }
      },
      start_date1: dayjs(new Date()).subtract(1, "month").format("YYYY-MM-DD"),
      end_date1: dayjs(new Date()).format("YYYY-MM-DD"),
      start_date2: dayjs(new Date()).subtract(1, "month").format("YYYY-MM-DD"),
      end_date2: dayjs(new Date()).format("YYYY-MM-DD"),
      activityList1:[],// 活动1
      activityList2:[],// 活动2
      selectActivity1:'',
      selectActivity2:'',
      activityName1:{},
      activityName2:{},
      startDate1:dayjs(new Date()).subtract(1, "month").format("YYYY-MM-DD"),
      startDate2:dayjs(new Date()).subtract(1, "month").format("YYYY-MM-DD"),
      periodTime1:'',
      periodTime2:'',
      endDate1:dayjs(new Date()).format("YYYY-MM-DD"),
      endDate2:dayjs(new Date()).format("YYYY-MM-DD"),
      compareFlag: 0,
      columns1: [
            {
                title: '活动名称',
                key: 'activity_name'
            },
            {
                title: '活动UV',
                key: 'uv',
                render: renderHandler
            },
            {
                title: '活动PV',
                key: 'pv',
                render: renderHandler
            },
            {
                title: '参与会员数',
                key: 'attend_count',
                render: renderHandler
            },
            {
                title: '新增会员数',
                key: 'mbr_reg_count',
                render: renderHandler
            },
            {
                title: '发券量',
                key: 'cpn_put_count',
                render: renderHandler
            },
            {
                title: '领券量',
                key: 'cpn_get_count',
                render: renderHandler
            },
            {
                title: '领券人数',
                key: 'cpn_get_persons',
                render: renderHandler
            },
            {
                title: '核销量',
                key: 'cpn_chk_count',
                render: renderHandler
            },
            {
                title: '核销人数',
                key: 'cpn_chk_persons',
                render: renderHandler
            }
      ],
      data1:[]
    };
  },

  methods: {
    compareHandler(){
        this.compareFlag == 1 ? (this.compareFlag = 0) : (this.compareFlag = 1);
        if(this.toggleName == 'sum'){
           this.actContrastSum();
        }else{
           this.actContrastAvg();
        }
    },

    changeSelect1(val){
      this.activityName1 = val;
      if(this.toggleName == 'sum'){
           this.actContrastSum();
        }else{
           this.actContrastAvg();
        }
    },
    changeSelect2(val){
      this.activityName2 = val;
      if(this.toggleName == 'sum'){
           this.actContrastSum();
        }else{
           this.actContrastAvg();
        }
    },
    handleChange(e) {
      this.toggleName = e;
      if(e == 'sum'){
        this.actContrastSum();
      }
      else if(e == 'average'){
        this.actContrastAvg();
      }
    },
    //活动名称列表1
    actList1() {
      let param = {
        market_id: this.market_id,
        start_date: this.startDate1,
        end_date: this.endDate1
      };
      return this.$api.actList(param).then(res => {
        if (res[0]) {
          this.selectActivity1 = res[0].activity_id;
          this.activityName1 = {label:res[0].activity_name,value:res[0].activity_id};
          this.activityList1 = res;
        } else {
          
          this.activityName1 = {label: '', value: ''};
          this.activityList1 = [];
          this.selectActivity1 = '';
        } 
        this.start_date1 = dayjs(new Date(this.start_date1)).format("YYYY-MM-DD");
        this.end_date1 = dayjs(new Date(this.end_date1)).format("YYYY-MM-DD");
      })
    },
    //活动名称列表2
    actList2() {
      let param = {
        market_id: this.market_id,
        start_date: this.startDate2,
        end_date: this.endDate2
      };
      return this.$api.actList(param).then(res => {
        
        if (res.length > 2) {
          this.selectActivity2 = res[1].activity_id;
          this.activityName2 = {label:res[1].activity_name,value:res[1].activity_id};
          this.activityList2 = res;
        } else {
          
          this.activityName2 = {label: '', value: ''};
          this.activityList2 = [];
          this.selectActivity2 = '';
        }
       
        this.start_date2 = dayjs(new Date(this.start_date2)).format("YYYY-MM-DD");
        this.end_date2 = dayjs(new Date(this.end_date2)).format("YYYY-MM-DD");
        
      })
    },

    //活动对比平均值
    actContrastAvg() {
      let param = {
        market_id: this.market_id,
        act_start1_date:this.startDate1,
        act_end1_date:this.endDate1,
        act_start2_date:this.startDate2,
        act_end2_date:this.endDate2,
        activity1_id: this.activityName1 ? this.activityName1.value : '',
        activity2_id: this.activityName2 ? this.activityName2.value : ''
      }
      this.$api.actContrastAvg(param).then(res => {
        this.data1 = res;
        let that = this;
        that.periodTime1 = res[0] ? res[0].period_time : null;
        that.periodTime2 = res[1] ?  res[1].period_time : null;
      })
    },

    //活动对比总量
    actContrastSum() {
      let param = {
        market_id: this.market_id,
        act_start1_date:this.startDate1,
        act_end1_date:this.endDate1,
        act_start2_date:this.startDate2,
        act_end2_date:this.endDate2,
        activity1_id: this.activityName1 ? this.activityName1.value : '',
        activity2_id: this.activityName2 ? this.activityName2.value : ''
      }
      this.$api.actContrastSum(param).then(res => {
        // res[0].pv_ratio = 0;
        // res[1].pv_ratio = -1;
        // res[0].cpn_get_persons_ratio = 0;
        // res[1].cpn_get_persons_ratio = -12;
        this.data1 = res;
        let that = this;
        that.periodTime1 = res[0] ? res[0].period_time : null;
        that.periodTime2 = res[1] ? res[1].period_time : null;
      })
    }

  },
  created() {
    var that = this;
    axios.all([this.actList1(), this.actList2()])
    .then(axios.spread(function (acct, perms) {
       that.actContrastSum();
    }));
  }

};
</script>
<style lang="scss" scoped>
@import "@/assets/style/public.scss";

.ticketsTop {
  width: 100%;
  box-sizing: border-box;
  header {
    width: 100%;
    display: flex;
    align-items: flex-end;
    line-height:40px;
    border-bottom: 1px solid $color-border;
    h4 {
      flex: 1;
      width: 33px;
      line-height:40px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(42, 57, 98, 1);
      padding-right: 5px;
      position: relative;
      top: 2px;
    }

    p {
      span {
        display: inline-block;
        cursor: pointer;
        width: 2.75rem;
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
  }
}
.holidayDetail{
	border:1px dotted #ccc;
	padding:10px;
  div{
    line-height:24px;
  }
}
.title-head{
  font-weight:normal;
  margin-top:4px;
  font-size: 14px;
  color: #2a3962;
  font-family: MicrosoftYaHei;
}
</style>
