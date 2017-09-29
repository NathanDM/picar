import Vue from 'vue';
import Router from 'vue-router';
import Car from '@/components/Car';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Car',
      component: Car,
    },
  ],
});
