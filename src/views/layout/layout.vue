<template>
  <div class="layout">
    <Layout>
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
                <div class="layout-logo">
                    <img src="../../assets/bbg-logo.png" alt="">
                </div>
                <div class="layout-nav">
                    <Menu-Item :name="menu.id" v-for="menu in menus" :key="menu.id">
                        {{menu.label}}
                    </Menu-Item>
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
      <Menu :active-name="activeName" theme="light" width="auto">
        <router-link :to="{ name: item.name }" v-for="item in $router.options.routes[1].children" :key="item.name">
          <Menu-Item :name="item.meta.title">
            <Icon :custom="defaultIcon(item.meta.icon)" size="16" /> {{item.meta.title}}
          </Menu-Item>
        </router-link>
      </Menu>
    </Sider>
    <Layout>
      <!-- <Breadcrumb :style="{margin: '1rem 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb> -->
      <FilterBox :title="$route.meta.title" :filters="currentFilters" @searchParam="toggleSearchParam"></FilterBox>
      <Content :style="{padding: '32px 24px 64px 24px', minHeight: '280px', background: '#fff'}">
                    <transition name="fade-transverse">
                        <router-view :key="key"/>
                    </transition>
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
          label: "营销数据"
        }
        // {
        //     id: 2,
        //     label: "客流数据"
        // },
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
      return filterList.list.find(item => {
        return item.id === _this.$route.meta.path;
      }).list;
    },
    activeName() {
      return this.$route.meta.title  || '数据概览';
    },
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
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
      await this.$store.dispatch("getLevels", {market_id: this.market_id}).then(() => {
        _this.levels = _this.$store.state.BI.levels;
        for(let key in _this.levels) {
          this.$store.commit(`update${key}`, _this.levels[key]);
        }
      });
    }
  },
  watch: {
		'$route': function(from, to) {
			this.$store.commit("updateSearchOptions", this.currentFilters);
    },
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
