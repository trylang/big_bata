<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" :active-name="activeMenu">
          <div class="layout-logo">
              <img src="../../assets/bbg-logo.png" alt="">
          </div>
          <div class="layout-nav">
            <router-link  v-for="menu in menus" :key="menu.id" :to="{ name: menu.name }">
              <Menu-Item :name="menu.id" >
                {{menu.label}}  
              </Menu-Item>
            </router-link>    
          </div>
          <Dropdown>
              <a href="javascript:void(0)">
                  管理员
                  <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem> 退出</DropdownItem>
              </DropdownMenu>
          </Dropdown>
          <div class="yayout_bbg">步步高梅溪新天地</div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <h1>{{openNames}}</h1>
          <h1>{{activeName}}</h1>
          <Menu :active-name="activeName" theme="light" width="auto" :open-names="openNames">

            <!-- <router-link v-if="!currentRoutes[0].children" :to="{ name: item.name }" v-for="item in currentRoutes" :key="item.name">
              <Menu-Item :name="item.meta.title">
                <Icon :custom="defaultIcon(item.meta.icon)" size="16" /> {{item.meta.title}}
              </Menu-Item>
            </router-link> -->

            <Submenu v-for="route in currentRoutes" :key="route.name" :name="route.meta.title">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    {{route.meta.title}}
                </template>
                <router-link :to="{ name: item.name }" v-for="item in route.children" :key="item.name">
                  <Menu-Item :name="item.meta.title">
                    <Icon :custom="defaultIcon(item.meta.icon)" size="16" /> {{item.meta.title}}
                  </Menu-Item>
                </router-link>
              </Submenu>
            
          </Menu>
        </Sider>
        <Layout>
          <!-- <Breadcrumb :style="{margin: '1rem 0'}">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb> -->
          <FilterBox v-if="$route.meta.hasFilterBox" :title="$route.meta.title" :filters="currentFilters" @searchParam="toggleSearchParam"></FilterBox>
          <Content :style="{padding: '32px 24px 64px 24px', minHeight: '280px', background: '#fff'}">
              <!-- <transition name="fade-transverse"> -->
                  <router-view :key="key"/>
              <!-- </transition> -->
          </Content>
        </Layout>
      
      </Layout>
    
    </Layout>
  </div>
</template>
<script>
import FilterBox from "../../components/FilterBox";
import filterList from "^/layout/filters.json";

export default {
  data() {
    return {
      market_id: this.$route.query.market_id || 12555,
      filterOptions: {},
      menus: [
        // {
        //     id: "0",
        //     label: "销售数据"
        // },
        {
          id: "1",
          label: "营销数据",
          name: "data-marketing-index",
          basePath: "data-marketing"
        },
        {
          id: 2,
          label: "客流数据",
          name: "data-crm-demo1-1",
          basePath: "data-crm"
        }
        // {
        //     id: 3,
        //     label: "会员数据"
        // },
        // {
        //     id: 4,
        //     label: "租金数据"
        // },
        // {
        //     id: 5,
        //     label: "品牌价值分析"
        // },
        // {
        //     id: 6,
        //     label: "BI驾驶舱"
        // }
      ]
    };
  },
  computed: {
    currentFilters() {
      let _this = this;
      if (!_this.$route.meta.hasFilterBox) return [];
      return filterList.list.find(item => {
        return item.id === _this.$route.meta.path;
      }).list;
    },
    activeMenu() {
      let _this = this;
      return this.menus.find(
        item => _this.$route.name.indexOf(item.basePath) >= 0
      ).id;
    },
    activeName() {
      return this.$route.meta.title || "数据概览";
    },
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
    openNames() {
      let route = this.$route;
      let curData = this.$router.options.routes.find(item => {
          return item.name && route.name.indexOf(item.name) >= 0;
        }).children;      
      let parent = curData.find(item => {
        return item.children && item.children.some(key => key.name === this.$route.name)
      });
      return [parent.meta.title];
    },
    currentRoutes() {
      let route = this.$route;
      let curData = this.$router.options.routes.find(item => {
          return item.name && route.name.indexOf(item.name) >= 0;
        }).children;      
      let parent = curData.find(item => {
        return item.children && item.children.some(key => key.name === this.$route.name)
      });
      console.log('route', route);
      console.log('curData', curData);
      console.log('parent', parent);
      return curData;
      // return {
      //   openNames: [parent.meta.title],
      //   list: curData
      // };
    }
  },
  methods: {
    defaultIcon(icon) {
      return `iconfont ${icon}`;
    },
    toggleSearchParam(param) {
      console.log(param);
    },
    async fetchDate() {
      let _this = this;
      await this.$store
        .dispatch("getLevels", { market_id: this.market_id })
        .then(() => {
          _this.levels = _this.$store.state.BI.levels;
          for (let key in _this.levels) {
            this.$store.commit(`update${key}`, _this.levels[key]);
          }
        });
    }
  },
  watch: {
    $route: function(from, to) {
      this.$store.commit("updateSearchOptions", this.currentFilters);
    }
  },
  components: {
    FilterBox
  },
  created() {
    this.fetchDate();
    this.$store.commit("updateSearchOptions", this.currentFilters);
  }
};
</script>

<style lang="scss">
@import "@/assets/style/views/layout.scss";
</style>
