<template>
  <div id="table_container">
  	<div class="ticketsTop">
      <header>
	      <h4>活动对比</h4>
	      <p>
	        <span class="btn-left" :class="[toggleName == 'sum' ? 'actived' : '']" @click="handleChange('sum')">总量</span>
	        <span class="btn-right" :class="[toggleName == 'average' ? 'actived' : '']" @click="handleChange('average')">日均</span>
	      </p>
	    </header>
      <Row style="margin-top:10px">
          <Col span="9" offset="1">
            <div>
              <span>时间:</span>
	          <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" v-model="param.start_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate"></DatePicker>
	          <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" v-model="param.end_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate"></DatePicker>
	          <span>活动1:</span>
	          <Select v-model="model2" size="small" style="width:100px">
			    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
	        </div>
	        <div class="holidayDetail">
	        	<div>活动名称:<span style="font-weight:bold">端午节</span></div>
	        	<div>活动时间:<span>2018.08.01</span><span>-</span><span>2018.09.01</span></div>
	        </div>
          </Col>
          <Col span="4" style="text-align:center">
            22
          </Col>
          <Col span="9">
            <div>
              <span>时间:</span>
	          <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" v-model="param.start_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate"></DatePicker>
	          <DatePicker type="date" :clearable="false"  format="yyyy.MM.dd" v-model="param.end_date" placeholder="请选择时间" class="filter-input filter-date-picker" @on-change="changeDate"></DatePicker>
	          <span>活动1:</span>
	          <Select v-model="model2" size="small" style="width:100px">
			    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
	        </div>
	        <div class="holidayDetail">
	        	<div>活动名称:<span style="font-weight:bold">端午节</span></div>
	        	<div>活动时间:<span>2018.08.01</span><span>-</span><span>2018.09.01</span></div>
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

export default {
  name: "ticketsTop",
  data() {
    return {
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
    columns1: [
          {
              title: 'WIFI客流',
              key: 'name'
          },
          {
              title: '视频客流量',
              key: 'age'
          },
          {
              title: '销售额',
              key: 'address'
          },
          {
              title: 'WIFI客流',
              key: 'name'
          },
          {
              title: '视频客流量',
              key: 'age'
          },
          {
              title: '销售额',
              key: 'address'
          },
          {
              title: 'WIFI客流',
              key: 'name'
          },
          {
              title: '视频客流量',
              key: 'age'
          },
          {
              title: '销售额',
              key: 'address'
          }
      ],
      data1: [
          {
              name: '端午活动',
              age: 20,
              address: '26%'
          },
          {
              name: '五一活动',
              age: 116,
              address: '35%'
          }
      ]
    };
  },
  methods: {
  	changeDate(val) {

  	},
    handleChange(e) {
      this.toggleName = e;
    }
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
	border:1px dotted $color-border;
	padding:10px;
}

</style>
