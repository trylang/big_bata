<template>
  <div class="layout">
      <Layout>
          <Header>
              <Menu mode="horizontal" theme="dark" active-name="1">
                  <div class="layout-logo"></div>
                  <div class="layout-nav">
                      <Menu-Item :name="menu.id" v-for="menu in menus" :key="menu.id">
                        {{menu.label}}
                      </Menu-Item>
                  </div>
              </Menu>
          </Header>
          <Layout>
              <Sider hide-trigger :style="{background: '#fff'}">
                  <Menu active-name="数据概览" theme="light" width="auto">
                    <router-link :to="{ name: item.name }" v-for="item in $router.options.routes[1].children" :key="item.name">
                      <Menu-Item :name="item.meta.title">
                        <Icon :custom="defaultIcon(item.meta.icon)" size="16"/>
                        {{item.meta.title}}
                      </Menu-Item>
                    </router-link>
                  </Menu>
              </Sider>
              <Layout :style="{padding: '0 1rem'}">
                  <!-- <Breadcrumb :style="{margin: '1rem 0'}">
                      <BreadcrumbItem>Home</BreadcrumbItem>
                      <BreadcrumbItem>Components</BreadcrumbItem>
                      <BreadcrumbItem>Layout</BreadcrumbItem>
                  </Breadcrumb> -->
                  <FilterBox :title="$route.meta.title"
                    :filters="currentFilters"
                    @searchParam="toggleSearchParam"></FilterBox>
                  <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <transition name="fade-transverse">
                      <router-view/>
                    </transition>
                  </Content>
              </Layout>
          </Layout>
      </Layout>
  </div>
</template>
<script>
import FilterBox from '../../components/FilterBox'
import filterList from '^/layout/filters.json'

export default {
  data () {
    return {
      menus: [{
        id: '0',
        label: '销售数据'
      }, {
        id: '1',
        label: '营销数据'
      }, {
        id: 2,
        label: '客流数据'
      }, {
        id: 3,
        label: '会员数据'
      }, {
        id: 4,
        label: '租金数据'
      }, {
        id: 5,
        label: '品牌价值分析'
      }, {
        id: 6,
        label: 'BI驾驶舱'
      }]
    }
  },
  computed: {
    currentFilters () {
      let _this = this
      return filterList.data.find(item => {
        return item.id === _this.$route.meta.path
      }).list
    }
  },
  methods: {
    defaultIcon (icon) {
      return `iconfont ${icon}`
    },
    toggleSearchParam (param) {
      console.log(param)
    },
    fetchDate () {
    }
  },
  components: {
    FilterBox
  },
  watch: {
    '$route': 'fetchDate'
  },
  created () {

  }
}
</script>

<style lang="scss">
@import '@/assets/style/views/layout.scss';
</style>
