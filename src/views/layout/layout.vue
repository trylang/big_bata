<template>
  <div class="layout">
      <Layout>
          <Header>
              <Menu mode="horizontal" theme="dark" active-name="1">
                  <div class="layout-logo"></div>
                  <div class="layout-nav">
                      <MenuItem :name="menu.id" v-for="menu in menus" :key="menu.id"> 
                        {{menu.label}}
                      </MenuItem>
                  </div>
              </Menu>
          </Header>
          <Layout>
              <Sider hide-trigger :style="{background: '#fff'}">
                  <Menu active-name="index" theme="light" width="auto" @on-select="toggle()">
                    <router-link :to="{ name: item.name }" v-for="item in $router.options.routes[1].children" :key="item.path">
                      <MenuItem :name="item.path">
                        {{item.meta.title}}
                      </MenuItem>
                    </router-link>
                  </Menu>
              </Sider>
              <Layout :style="{padding: '0 1rem'}">
                  <Breadcrumb :style="{margin: '1rem 0'}">
                      <BreadcrumbItem>Home</BreadcrumbItem>
                      <BreadcrumbItem>Components</BreadcrumbItem>
                      <BreadcrumbItem>Layout</BreadcrumbItem>
                  </Breadcrumb>
                  <FilterBox></FilterBox>
                  <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                      <router-view/>
                  </Content>
              </Layout>
          </Layout>
      </Layout>
  </div>
</template>
<script>
import FilterBox from '../../components/FilterBox'
export default {
  data() {
    return {
      menus: [{
        id: "0",
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
  methods: {
    toggle (item) {
      console.log(item)
    }
  },
  components: {
    FilterBox
  },
  created() {
    console.log(this.$router.options.routes[1].children);
  }
};
</script>

<style lang="scss">
@import '~@/assets/style/views/layout.scss';
</style>

