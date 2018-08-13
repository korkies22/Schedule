import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Schedule from './components/Schedule'
import LoginMS from './components/LoginMS'

Vue.use(Router)
import store from './store.js'
 
export default new Router({
    hashbang: false,
   //abstract: true,
  history: true,
    mode: 'history',
  linkActiveClass: 'active',
  transitionOnLoad: true,
  root: '/',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            beforeEnter: (to, from, next) => {
                store.dispatch('verifyLogged');
                console.log('debe mostrarse despues');
                if(store.getters.isAuthenticated){
                    next({ path: '/schedule' })
                }
                next()
            }
        },
        {
            path: '/schedule',
            name: 'Schedule',
            component: Schedule,
            beforeEnter: (to, from, next) => {
                if(!store.getters.isAuthenticated){
                    next({ path: '/' })
                }
                next()
            }
        }
    ]
})