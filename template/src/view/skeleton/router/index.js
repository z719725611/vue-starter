import HelloWorld from '../pages/HelloWorld.vue';
import List from '../pages/List.vue';
import Detail from '../pages/Detail.vue';
import PageTransition from '../../../components/PageTransition/index.vue';

const routes =
  [
    {
      path: '/',
      component: PageTransition,
      children: [{
        name: 'List',
        path: '',
        component: List
      }, {
        name: 'Detail',
        path: '/detail',
        component: Detail
      }]
    }
  ];
export default routes;
