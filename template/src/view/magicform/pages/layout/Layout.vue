<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import AppMain from './AppMain.vue';

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },

  mounted() {
    const path = this.$route.path;
    const index = path.lastIndexOf('/');
    const aTag = document.getElementById(path.substring(index + 1));
    if (aTag) {
      aTag.click();
    }
  },

  computed: {
    sidebar() {
      return this.$store.state.sidebarStatus.sidebar;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "../../styles/mixin.scss";
	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
		&.hideSidebar {
			.sidebar-container{
				width:36px;
				overflow: inherit;
			}
			.main-container {
				margin-left: 36px;
			}
		}
		.sidebar-container {
			transition: width 0.28s ease-out;
			width: 180px;
			height: 100%;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 1001;
			overflow-y: auto;
 			&::-webkit-scrollbar {display:none}
		}
		.main-container {
			min-height: 100%;
			transition: margin-left 0.28s ease-out;
			margin-left: 180px;
		}
	}
</style>
