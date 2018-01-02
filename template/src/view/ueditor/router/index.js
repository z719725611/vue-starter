window.UEDITOR_HOME_URL= UEDITOR_HOME_URL;
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
