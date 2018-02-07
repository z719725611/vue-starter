<template>
  <div class='menu-wrapper'>
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0&&!item.isLink"
                   :to="item.path+'/'+item.children[0].path" @click.native="changeRouterWay(item, item.children[0])">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <svg-icon v-if='item.icon' :icon-class="item.icon"></svg-icon>
          <span>\{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <a :id="item.resourceCode" v-if="!item.hidden&&item.noDropdown&&item.children.length>=0&&item.isLink"
         target="appMainIframe" @click="changeRouterWay(item, item.children[0])">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <svg-icon v-if='item.icon' :icon-class="item.icon"></svg-icon>
          <span>\{{item.children[0].name}}</span>
        </el-menu-item>
      </a>

      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <svg-icon v-if='item.icon' :icon-class="item.icon"></svg-icon>
          <span>\{{item.name}}</span>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>

          <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0'
                        :routes='[child]'>3333-1</sidebar-item>

          <router-link v-else-if="!child.isLink" :to="item.path+'/'+child.path" @click.native="changeRouterWay(child)">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if='child.icon' :icon-class="child.icon"></svg-icon>
              <span>\{{child.name}}</span>
            </el-menu-item>
          </router-link>

          <el-menu-item v-else :index="item.path+'/'+child.path" @click="handleClick(child)">
            <svg-icon v-if='child.icon' :icon-class="child.icon"></svg-icon>
            <span>\{{child.name}}</span>
          </el-menu-item>
          <a :id="child.resourceCode" target="appMainIframe" @click="changeRouterWay(item, child)"/>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  import 'nprogress/nprogress.css';
  import NProgress from 'nprogress';
  import { mapGetters } from 'vuex';
  import { hasClass } from '../../../../utils/ToolsUtils';

  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      },
      menuCollapse: {
        type: Boolean
      }
    },
    computed: {
      ...mapGetters([
        'iframeUrl',
        'sidebar'
      ]),
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
      }
    },
    data() {
      return {
        isFresh: true /** 是否为刷新页面 */
      };
    },
    methods: {
      changeRouterWay(item, child) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        if (child) {
          const hash = `#${item.path}/${child.path}`;
          if (hash !== window.location.hash || this.isFresh) {
            NProgress.start();
            this.isFresh = false;
          }

          window.location.hash = hash;
          this.$store.dispatch('ChangeRouterWay', { child });
        } else {
          this.$store.dispatch('ChangeRouterWay', { item });
        }
        setTimeout(function () {
          NProgress.done();
        }, 1000);
      },
      handleClick(child) {
        const aTag = document.getElementById(child.resourceCode);
        if (aTag) {
          document.getElementById(child.resourceCode).click();
        }
      },
      /**
       * 菜单收起状态变成展开状态
       * **/
      triggerCollapse() {
        return !this.sidebar.opened;
      },
      /**
       * 打开折叠菜单
       * **/
      openMenu() {
        const allSubmenus = document.querySelectorAll('.el-menu');
        allSubmenus.forEach((value) => {
          if (hasClass(value.parentNode, 'el-submenu')) {
            value.parentNode.addEventListener('click', () => {
              this.triggerCollapse();
              this.$store.commit('TOGGLE_SIDEBAR');
            });
          }
        });
      }
    },
    mounted() {
      if (this.menuCollapse) {
        this.openMenu();
      }
    }
  };
</script>
