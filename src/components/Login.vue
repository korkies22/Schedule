<template>
<div>
    <div data-collapse="medium" data-animation="default" data-duration="400" class="navigation w-nav">
        <div class="container-4 w-container">
            <a href="index.html" class="brand-link w-nav-brand">
            <div class="logo-text">Owly-horarios</div>
            </a>
            <nav role="navigation" class="nav-menu w-nav-menu"><a href="#Features" id="btn-features" class="nav-link w-nav-link">Features</a><a href="#Pricing" class="nav-link w-nav-link">Pricing</a><a href="#Universities" class="nav-link w-nav-link">Contact us!</a><a href="#Universities" class="nav-link w-nav-link">Log in</a></nav>
            <div class="nav-link menu w-nav-button">
                <div class="w-icon-nav-menu"></div>
            </div>
        </div>
    </div>
  <div class="utility-page-wrap">
    <div id="Owly" class="html-embed html-embed-2 w-hidden-small w-hidden-tiny w-embed w-iframe"><iframe src="https://theowo.xyz/" frameborder="0" width="400px" height="300px"></iframe></div>
    <div class="utility-page-content w-password-page w-form">
      <form method="post" action="/.wf_auth" class="utility-page-form w-password-page">
        <h2 class="heading-5">Hello human!</h2>
        <div style="display:none" class="w-password-page w-embed w-script"><input type="hidden" name="path" value="<%WF_FORM_VALUE_PATH%>"><input type="hidden" name="page" value="<%WF_FORM_VALUE_PAGE%>"></div><input type="password" class="text-field w-password-page w-input" maxlength="256" autofocus="true" name="pass" placeholder="Enter your password" id="password"><input type="submit" value="Submit" data-wait="Please wait..." class="submit-button w-password-page w-button">
        <div class="layer-helper w-hidden-medium w-hidden-small w-hidden-tiny w-clearfix"><a href="#" class="link blue_button w-button" @click="loginMS"><strong>Start with your Microsoft Account</strong></a><a href="#" class="link red_button w-button"><strong>Start with your Google Account</strong></a></div>
      </form>
      <div class="w-password-page w-form-fail">
        <div>Incorrect password. Please try again.</div>
      </div>
      <div style="display:none" class="w-password-page w-embed w-script">
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="row-2 w-row">
      <div class="spc w-col w-col-4">
        <h5 class="heading-2 w-hidden-small w-hidden-tiny">About Owly</h5>
        <p class="paragraph-5 w-hidden-small w-hidden-tiny"><br>Owly is the personal assistant that can help you with everything you dram.<br><br>Owly is the creation of a group of students of 3 top-universities in Bogotá, Colombia.<br><br><a href="https://webflow.com/design/juliana-prietos-cool-project#" class="link-3">Meet the team!</a><br><br><br><br></p>
      </div>
      <div class="spc w-col w-col-4">
        <h5 class="heading-3">Usefull links</h5><a href="#" class="footer-link">Downloads</a><a href="#" class="footer-link">Personalization</a><a href="#" class="footer-link">Universities and contact</a><a href="#" class="footer-link">Etiam sollicitudin ipsum</a></div>
      <div class="w-hidden-small w-col w-col-4">
        <h5 class="heading-4">Social</h5>
        <div class="footer-link-wrapper w-clearfix"><img src="https://uploads-ssl.webflow.com/5b5f449baaff481234685801/5b5f449baaff488f3868583d_social-18.svg" width="20" class="info-icon"><a href="#" class="footer-link with-icon">Twitter</a></div>
        <div class="footer-link-wrapper w-clearfix"><img src="https://uploads-ssl.webflow.com/5b5f449baaff481234685801/5b5f449baaff481aed685813_social-03.svg" width="20" class="info-icon"><a href="#" class="footer-link with-icon">Facebook</a></div>
        <h5 class="heading-4">Press</h5>
        <div class="footer-link-wrapper w-clearfix"><img src="images/start-here.svg" width="20" class="info-icon"><a href="#" class="footer-link with-icon">Press kit</a></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'Hello',
    methods:{
        loginMS(){
            console.log('me llamaron')
            this.$store.dispatch('loginMS');
        },
    },
    computed:{
        isAuthenticated()
        {
           return this.$store.getters.isAuthenticated;
        },
    },
    watch: {
      isAuthenticated(val) {
         if(val) this.$router.replace({ path: 'schedule' });
       }
    }  
}
</script>

<style lang="scss">
@import "./../styles/normalize.css";
@import "./../styles/webflow.css";
@import "./../styles/login.css";
</style>




  