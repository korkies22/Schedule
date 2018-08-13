import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Graph API endpoint to show user profile
var graphApiEndpoint = "https://graph.microsoft.com/v1.0/me";

// Graph API scope used to obtain the access token to read user profile
var graphAPIScopes = ["https://graph.microsoft.com/user.read"];

// Initialize application
var userAgentApplication = new Msal.UserAgentApplication(msalconfig.clientID, null, authCallback, { navigateToLoginRequestUrl:false });
function authCallback(errorDesc, token, error, tokenType) {
           console.log('plsss',userAgentApplication) //this will print undefined, use this instead
           console.log('pls2',userAgentApplication.getUser()) //this will print undefined, use this instead
            var self  = this// self is instance of userAgentApplication
   }

//Previous version of msal uses redirect url via a property
if (userAgentApplication.redirectUri) {
    userAgentApplication.redirectUri = msalconfig.redirectUri;
}

/**
 * Call the Microsoft Graph API and display the results on the page. Sign the user in if necessary
 */
function callGraphApi() {
    var user = userAgentApplication.getUser();
    console.log('llega us',user);
    if (!user) {
        // If user is not signed in, then prompt user to sign in via loginRedirect.
        // This will redirect user to the Azure Active Directory v2 Endpoint
        userAgentApplication.loginPopup(graphAPIScopes);
        // The call to loginRedirect above frontloads the consent to query Graph API during the sign-in.
        // If you want to use dynamic consent, just remove the graphAPIScopes from loginRedirect call.
        // As such, user will be prompted to give consent when requested access to a resource that 
        // he/she hasn't consented before. In the case of this application - 
        // the first time the Graph API call to obtain user's profile is executed.
    } else {

        // In order to call the Graph API, an access token needs to be acquired.
        // Try to acquire the token used to query Graph API silently first:
        userAgentApplication.acquireTokenSilent(graphAPIScopes)
            .then(function (token) {
                //After the access token is acquired, call the Web API, sending the acquired token
                console.log('no mames', store);
                store.dispatch('userAuthenticated',{user:userAgentApplication})
            }, function (error) {
                // If the acquireTokenSilent() method fails, then acquire the token interactively via acquireTokenRedirect().
                // In this case, the browser will redirect user back to the Azure Active Directory v2 Endpoint so the user 
                // can reenter the current username/ password and/ or give consent to new permissions your application is requesting.
                // After authentication/ authorization completes, this page will be reloaded again and callGraphApi() will be executed on page load.
                // Then, acquireTokenSilent will then get the token silently, the Graph API call results will be made and results will be displayed in the page.
                if (error) {
                    userAgentApplication.acquireTokenRedirect(graphAPIScopes);
                }
            });
    }
}

/**
 * Callback method from sign-in: if no errors, call callGraphApi() to show results.
 * @param {string} errorDesc - If error occur, the error message
 * @param {object} token - The token received from sign-in
 * @param {object} error - The error string
 * @param {string} tokenType - The token type: For loginRedirect, tokenType = "id_token". For acquireTokenRedirect, tokenType:"access_token".
 */
function loginCallback(errorDesc, token, error, tokenType) {
    console.log('llegaCallback');
    if (errorDesc) {
        showError(msal.authority, error, errorDesc);
    } else {
        console.log('doble llamado');
        callGraphApi();
    }
}

/**
 * Show an error message in the page
 * @param {string} endpoint - the endpoint used for the error message
 * @param {string} error - Error string
 * @param {string} errorDesc - Error description
 */
function showError(endpoint, error, errorDesc) {
    var formattedError = JSON.stringify(error, null, 4);
    if (formattedError.length < 3) {
        formattedError = error;
    }
    document.getElementById("errorMessage").innerHTML = "An error has occurred:<br/>Endpoint: " + endpoint + "<br/>Error: " + formattedError + "<br/>" + errorDesc;
    console.error(error);
}

function signOut() {
    userAgentApplication.logout();
}


const store = new Vuex.Store({
    state: {
        isAuthenticated:false,
        userAgent:null,
        typeAuth:''
    },
    getters: {
        isAuthenticated: state => {
            return state.isAuthenticated ===true;
        }
    },
    mutations: {
        userLogged(state,payload) {
            // mutate state
            console.log('payload',payload.user);
            state.userAgent=payload.user;
            state.isAuthenticated= true;
            state.typeAuth="Microsoft"

            var x=0;
            for (let index = 0; index < 10000; index++) {
                x++;
            }
            console.log('pre termine');
          },
          closeSesion(state){
            console.log('really?')
            signOut();
            state.userAgent=null;
            state.isAuthenticated= false;
            state.typeAuth=""
          }
    },
    actions: {
        loginMS() {
            console.log('desde loginMS');
            callGraphApi();
        },
        userAuthenticated({commit}, payload) {
            console.log('payload',payload);
            commit('userLogged',payload);
        },
        closeSesion({commit}){
            commit('closeSesion');
        },
        verifyLogged({commit}){
            console.log('usss',userAgentApplication.getUser())
            if(userAgentApplication.getUser()){
                commit('userLogged',{user:userAgentApplication});
            }
        }
    }
})

export default store;