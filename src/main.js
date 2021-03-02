import Vue from 'vue';
import App from './App';
import { store } from './store/store';

new Vue({
  el: '#app',
  store: store,
  render: function(createElement) {
    return createElement(App);
  },
});
