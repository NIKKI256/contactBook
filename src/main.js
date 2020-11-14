import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import PageContact from './components/PageContact'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [//создание массивов роутов
    {path:'/contact/:id',name:'contact',component:PageContact,props:true},//роут для страницы определенного контакта
    {path:'/addContact',name:'addContact',component:AddContact},//роут для страницы добавления контакта
    {path:'/',name:'ContactList',component:ContactList}//роут для страницы со всеми контактами
]

const router = new VueRouter({//создание роутинга
    routes,
    mode:'history'
})

new Vue({
  router,//подключение роутинга
  render: function (h) { return h(App) },
}).$mount('#app')
