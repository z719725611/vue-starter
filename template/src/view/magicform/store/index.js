import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/Auth';
import sidebarStatus from './modules/SidebarStatus';
import permission from './modules/Permission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    sidebarStatus,
    permission
  },
  getters
});

export default store;
