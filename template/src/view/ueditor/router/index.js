window.UEDITOR_HOME_URL= UEDITOR_HOME_URL;
window.UEDITOR_INIT_URL= UEDITOR_INIT_URL;
import ueditor from '../pages/editor';
let routes = [
  {
    path: '/',
    component: ueditor,
    children: [
      {path: '/editor', component: ueditor, name: 'editor', class: 'fa-plug'}
    ]
  }
];
export default routes;
