<template>
  <div class="ticketsTop">
    <header>
      <h4>券PV</h4>
      <Icon class="icon-ticket" type="logo-octocat" size="40"/>
      <p><span class="btn-left" :class="[toggleName == 'sum' ? 'actived' : '']" @click="handleChange('sum')">总量</span>
        <span class="btn-right" :class="[toggleName == 'average' ? 'actived' : '']" @click="handleChange('average')">日均</span></p>
    </header>
    <div class="content">
      <p v-for="(item, index) in calTicketList" :key="index">
        {{item.name}}
        <Progress v-if="index<3" :percent="item.percent" hide-info/>
        <Progress  v-else :percent="item.percent" status="wrong" hide-info/>{{item.value}}（{{item.percent}}%）
        <!-- <span></span> -->
      </p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ticketsTop',
    data() {
        return {
            toggleName: 'sum'
        }
    },
    props: {
        progressList: {
            type: Array,
            required: true
        }
    },
    computed: {
        calTicketList: function () {
            let sum = this.progressList.reduce((prev, cur) => cur.value + prev, 0);
            this.progressList.forEach(item => {
                item.percent = (item.value / sum).toFixed(1) * 100
            })
            return this.progressList
        }
    },
    methods: {
        handleChange(e) {
            this.toggleName = e
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/public.scss";

.ticketsTop {
  padding: 2rem 1.5rem;
  border: 1px solid $color-border;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
  header {
    display: flex;
    align-items: flex-end;
    h4 {
      flex: 1;
    }
    .icon-ticket {
      flex: 3;
      line-height: 30px;
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
        color: $color-actived;
        border: 1px solid $color-actived;
        border-top-left-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
      }
      .btn-right {
        color: $color-actived;
        border: 1px solid $color-actived;
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
      }
      .actived {
        background: $color-actived;
        color: #fff;
      }
    }
  }
}
</style>

