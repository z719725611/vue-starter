<template>
  <section>
    <section class="app-main" style="min-height: 100%" :class="{switchAppMain:isLink}">
      <transition name="fade" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
    </section>

    <!--该iframe用于加载URL，如：子系统的入口URL或外部系统的URL， 与本地路由的视图互斥-->
    <iframe width="100%" height="1290" name="appMainIframe" frameborder="0" :src="iframeUrl"
            :class="{switchAppMain:!isLink}"></iframe>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'AppMain',
    computed: {
      ...mapGetters([
        'isLink',
        'iframeUrl'
      ]),
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .switchAppMain {
    display: none;
  }
</style>
