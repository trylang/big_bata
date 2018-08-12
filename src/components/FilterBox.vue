<template>
  <div class="filterBox">
    <h3>{{title}}</h3>
    <div class="inline-content">
      <p class="inline-item" v-for="(filter, index) in filters" :key="index">
        <span>{{filter.title}}</span>
        <DatePicker v-show="filter.type==='daterange'" format="yyyy.MM.dd" class="filter-input filter-date-picker" type="daterange"
          :options="options2" v-model="param[filter.name]" placement="bottom-end">
        </DatePicker>
        {{filter.options}}
        <Select v-show="filter.type==='select'" class="filter-input filter-select" v-model="param[filter.name]">
          <Option v-for="(item, index) in filter.options" :value="item[filter.filterValue]" :key="index">
            {{ item[filter.filterName]}}
          </Option>
        </Select>
      </p>
      <Button v-show="filters.length>0" @click="handle">确定</Button>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/filter'

export default {
  name: 'FilterBox',
  data () {
    return {
      param: {},
      options2: {
        shortcuts: [
          {
            text: '最近7天',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '最近30天',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          }
        ],
        // disabledDate (date) { 
        //   return date && date.valueOf() < Date.now() - 86400000; }
      },
      cityList: [
        {
          floor_name: '4343',
          id: 234,
          value: 'New York',
          label: 'New York'
        },
        {
          floor_name: '43423',
          id: 2344,
          value: 'London',
          label: 'London'
        },
        {
          floor_name: '431143',
          id: 24434,
          value: 'Sydney',
          label: 'Sydney'
        }
      ]
    }
  },
  props: {
    title: String,
    filters: {
      type: Array,
      required: true
    }
  },
  methods: {
    handle () {
      for (let key in this.param) {
        let data = this.param[key]
        if (data.length > 0 && data[0] instanceof Date) {
          data[0] = formatDate(data[0], 'yyyy-MM-dd')
          data[1] = formatDate(data[1], 'yyyy-MM-dd')
        }
      }
      this.$store.commit('updateSearchParam', this.param)
      console.log(this.$store.state.BI.searchParam)
    }
  },
  created() {
    console.log(this.filters)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/style/components/filterBox.scss";
</style>
