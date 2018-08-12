import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const { msalconfig: { clientID, redirectUri } } = window;

// Make sure to call Vue.use(Vuex) first if using a module system
function loginCallback(errorDesc, token, error, tokenType) {
    if (errorDesc) {
        console.log('error de auth', errorDesc);
    } else {
        callGraphApi();
    }
}


export default new Vuex.Store({
    state: {
        userAgentApplication: new Msal.UserAgentApplication(clientID, null, loginCallback, { redirectUri })
    },
    getters: {
        isAuthenticated () {
            console.log('getter', userAgentApplication.getUser());
            return userAgentApplication.getUser() !== null;
        }
    },
    mutations: {
    },
    actions: {
        callGraphApi() {
            var user = userAgentApplication.getUser();
            if (!user) {
                // If user is not signed in, then prompt user to sign in via loginRedirect.
                // This will redirect user to the Azure Active Directory v2 Endpoint
                userAgentApplication.loginRedirect(graphAPIScopes);
                // The call to loginRedirect above frontloads the consent to query Graph API during the sign-in.
                // If you want to use dynamic consent, just remove the graphAPIScopes from loginRedirect call.
                // As such, user will be prompted to give consent when requested access to a resource that 
                // he/she hasn't consented before. In the case of this application - 
                // the first time the Graph API call to obtain user's profile is executed.
            } else {
                // If user is already signed in, display the user info

                // In order to call the Graph API, an access token needs to be acquired.
                // Try to acquire the token used to query Graph API silently first:
                userAgentApplication.acquireTokenSilent(graphAPIScopes)
                    .then(function (token) 
                    {
                        //After the access token is acquired, call the Web API, sending the acquired token
                        callWebApiWithToken(graphApiEndpoint, token, graphCallResponseElement, document.getElementById("accessToken"));

                    }, function (error) 
                    {
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
    }
})