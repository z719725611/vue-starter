<template>
  <div>
    <transition :name="transitionName">
      <navigation>
        <router-view class="child-view"></router-view>
      </navigation>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        transitionName: 'slide-left'
      };
    },
    beforeRouteUpdate(to, from, next) {
      const routesStack = this.$store.state.navigation.routes;
      const backRoute = routesStack[routesStack.length - 2] || null;
      let targetRoute;
      if (to.name) {
        targetRoute = `${to.name}?${to.query.VNK}`;
      } else {
        targetRoute = `/?${to.query.VNK}`;
      }
      const isBack = backRoute === targetRoute;

      if (isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.isBack = false;
      next();
    }
  };
</script>

<style scoped>
  .child-view {
    position: absolute;
    width: 100%;
    transition: all .4s cubic-bezier(.55, 0, .1, 1);
    /*modified by caoyan 20171018 start */
    top: 0;
    bottom: 0;
    /*modified by caoyan 20171018 end */
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }

  .header {
    position: absolute;
    height: 44px;
    background: #0058f1;
    width: 100%
  }
</style>
