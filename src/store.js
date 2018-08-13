
// Graph API endpoint to show user profile
var graphApiEndpoint = "https://graph.microsoft.com/v1.0/me";

// Graph API scope used to obtain the access token to read user profile
var graphAPIScopes = ["https://graph.microsoft.com/user.read"];

// Initialize application
var userAgentApplication = new Msal.UserAgentApplication(msalconfig.clientID, null, null, {
    redirectUri: msalconfig.redirectUri
});

//Previous version of msal uses redirect url via a property
if (userAgentApplication.redirectUri) {
    userAgentApplication.redirectUri = msalconfig.redirectUri;
}

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        isAuthenticated:false,
        userAgent:null,
        typeAuth:'',
        token:null
    },
    getters: {
        isAuthenticated: state => {
            return state.isAuthenticated ===true;
        }
    },
    mutations: {
        userLogged(state,payload) {
            // mutate state
            state.userAgent=payload.user;
            state.isAuthenticated= true;
            state.typeAuth=payload.typeAuth;
            state.token= payload.token;
          },
          closeSesion(state){
            userAgentApplication = new Msal.UserAgentApplication(msalconfig.clientID, null, null, {
                redirectUri: msalconfig.redirectUri
            });
            state.userAgent=null;
            state.isAuthenticated= false;
            state.typeAuth=""
            userAgentApplication.logout();
          }
    },
    actions: {
        loginMS() {
            userAgentApplication.loginPopup(graphAPIScopes).then(
                idToken => {
                 store.dispatch('userAuthenticated', {user:userAgentApplication, typeAuth: "Microsoft", token:idToken})
                },
                () => {
                  return null;
                }
            );
        },
        userAuthenticated({commit}, payload) {
            commit('userLogged',payload);
        },
        closeSesion({commit}){
            commit('closeSesion');
        },
        verifyLogged({commit}){
            if(userAgentApplication.getUser()){
                commit('userLogged',{user:userAgentApplication});
            }
        }
    }
})

export default store;