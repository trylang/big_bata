<template>
  <div class="filterBox">
    <h2>{{title}}</h2>
    <div class="inline-content">
      <p class="inline-item">
        <span>item.title</span>
        <DatePicker class="filter-input filter-date-picker" type="daterange" 
          :options="options2" placement="bottom-end" 
          placeholder="Select date" >
        </DatePicker>
      </p>
      <p class="inline-item">
        <span>item.title</span>
        <Select class="filter-input filter-select" v-model="model11" filterable>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </p>
    </div>
    <div class="inline-content"></div>
  </div>
</template>

<script>
export default {
  name: "FilterBox",
  data() {
    return {
      value1: 25,
      options2: {
        shortcuts: [
          {
            text: "1 week",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "1 month",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "3 months",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model11: ""
    };
  },
  props: {
    title: String,
    filters: {
      type: Array
      // required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/assets/style/components/filterBox.scss';
</style>
