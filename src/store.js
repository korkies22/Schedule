
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
            console.log('llega auth', state)
            return state.isAuthenticated ===true;
        },
        myToken: state => {
            return state.token;
        }
    },
    mutations: {
        userLogged(state,payload) {
            console.log('no me digan que se mutó')
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
            state.typeAuth="";
            state.token=null;
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
            console.log('sera por aqui?')
            if(userAgentApplication.getUser()){
                userAgentApplication.acquireTokenSilent(graphAPIScopes)
            .then(function (idToken) {
                //After the access token is acquired, call the Web API, sending the acquired token
                
                commit('userLogged',{user:userAgentApplication, typeAuth: "Microsoft", token:idToken});
            }, function (error) {
                // If the acquireTokenSilent() method fails, then acquire the token interactively via acquireTokenRedirect().
                // In this case, the browser will redirect user back to the Azure Active Directory v2 Endpoint so the user 
                // can reenter the current username/ password and/ or give consent to new permissions your application is requesting.
                // After authentication/ authorization completes, this page will be reloaded again and callGraphApi() will be executed on page load.
                // Then, acquireTokenSilent will then get the token silently, the Graph API call results will be made and results will be displayed in the page.
                if (error) {
                    console.log('error with token');
                }
            });
            }
        }
    }
})

export default store;