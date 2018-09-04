import Vue, { CreateElement } from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import "material-design-icons-iconfont/dist/material-design-icons.css"
import "vue-material-design-icons/styles.css"
import App from "./App.vue"
 
Vue.use(Vuetify);

new Vue({
    el: '#app',
    render: (h: CreateElement) => h(App)
});

