<template>
    <el-menu default-active="s" mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :routes='permissionRouters'></sidebar-item>
    </el-menu>
</template>


<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem.vue';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permissionRouters',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
