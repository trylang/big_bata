<template>
  <div class="ticketsTop">
    <header>
      <h4>{{title}}</h4>
      <div class="icon-ticket">
        <img v-if="_index<3" src="@/assets/TOP10.png" alt="">
        <img v-else src="@/assets/TAIL10.png" alt="">
      </div>
      <p>
        <span class="btn-left" :class="[toggleName == 'sum' ? 'actived' : '']" @click="handleChange('sum')">总量</span>
        <span class="btn-right" :class="[toggleName == 'average' ? 'actived' : '']" @click="handleChange('average')">日均</span>
      </p>
    </header>
    <div class="content">
      <div v-if="toggleName == 'sum'">
        <p v-for="(item, index) in list" :key="index">
          <span class="shopping">{{item.shop_name}}
            <span class="progress_control">{{item.main_info}}</span>
          </span>
          <Progress v-if="index=3" :percent="item.r_sum | percent" hide-info/>
          <Progress v-else :percent="item.r_sum | percent" status="wrong" hide-info/>
          <i v-if="_index == 0 || _index == 3">{{item.v_sum}}</i>
          <i v-else>{{item.v_sum}}&nbsp;({{item.r_sum | percent}}%)</i>
        </p>
      </div>
      <div v-if="toggleName == 'average'">
        <p v-for="(item, index) in list" :key="index">
          <span class="shopping">{{item.shop_name}}
            <span class="progress_control">{{item.main_info}}</span>
          </span>
          <Progress v-if="index<3" :percent="item.r_avg | percent" hide-info/>
          <Progress v-else :percent="item.r_avg | percent" status="wrong" hide-info/>
          <i v-if="_index == 0 || _index == 3">{{item.v_avg.toFixed(0)}}</i>
          <i v-else>{{item.v_avg.toFixed(0)}}&nbsp;({{item.r_avg | percent}}%)</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { sort } from "@/utils/filter.js";

export default {
  name: "ticketsTop",
  data() {
    return {
      toggleName: "sum"
    };
  },
  props: {
    _index: {
      type: Number
    },
    title: {
      type: String
    },
    progress: {
      type: Array,
      required: true
    }
  },
  computed: {
    list() {
      return sort(this.progress, "seq", "asc");
    }
  },
  filters: {
    percent: function (value) {
      if (value == 0) return 0;
      return Number((value * 100).toFixed(2));
    }
  },
  methods: {
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
  padding: 2rem 1rem;
  border: 1px solid $color-border;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
  header {
    width: 100%;
    display: flex;
    align-items: flex-end;
    margin-bottom: 34px;
    h4 {
      flex: 1;
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(42, 57, 98, 1);
      line-height: 19px;
      padding-right: 5px;
      position: relative;
      top: 2px;
    }
    .icon-ticket {
      line-height: 10px;
      flex: 3;
    }

    p {
      flex: 2;
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

.content p {
  width: 100%;
  padding-right: 5px;
  box-sizing: border-box;
}
.content .shopping {
  display: block;
  font-weight: bold;

  .progress_control {
    display: inline-block;
    vertical-align: middle;
    font-weight: normal;
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: -2px;
  }
}
.content i {
  font-style: normal;
  float: right;
  margin-right: 20px;
}
</style>

