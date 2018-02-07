<template>
  <el-breadcrumb class="app-levelbar" separator="/">
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path"
                        :class="{switchLinkBreadcrumb:isLink}">
      <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">\{{item.name}}</span>
      <router-link v-else :to="item.redirect||item.path">\{{item.name}}</router-link>
    </el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item,index)  in linkRoutes" :key="item.path"
                        :class="{switchLinkBreadcrumb:!isLink}">
      <span v-if='item.redirect==="noredirect"||index==linkRoutes.length-1' class="no-redirect">\{{item.name}}</span>
      <a v-else >\{{item.name}}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    created() {
      this.getBreadcrumb();
    },
    data() {
      return {
        levelList: null
      };
    },
    computed: {
      ...mapGetters([
        'isLink',
        'linkRoutes'
      ])
    },
    methods: {
      getBreadcrumb() {
        if (!this.isLink) {
          let matched = this.$route.matched.filter(item => item.name);
          const first = matched[0];
          if (first && (first.name !== '首页' || first.path !== '')) {
            matched = [{ name: '首页', path: '/' }].concat(matched);
          }
          this.levelList = matched;
        }
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .switchLinkBreadcrumb {
    display: none;
  }

  .app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  }
</style>
