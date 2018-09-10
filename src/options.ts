import Vue, { CreateElement, VNode } from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import "@mdi/font/css/materialdesignicons.css"
import "material-design-icons-iconfont/dist/material-design-icons.css"
import App from "./App.vue"
 
Vue.use(Vuetify);

new Vue({
    el: '#app',
    render: (h: CreateElement): VNode => h(App)
});

