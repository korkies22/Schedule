<template>
  <div data-collapse="medium" data-animation="default" data-duration="400" class="navigation w-nav bannerContainer">
        <div class="container-4 w-container">
            <a href="index.html" class="brand-link w-nav-brand">
            <div class="logo-text">Owly-horarios</div>
            </a>
            <nav role="navigation" class="nav-menu w-nav-menu"><a href="#Features" id="btn-features" class="nav-link w-nav-link">Features</a><a href="#Pricing" class="nav-link w-nav-link">Pricing</a><a href="#Universities" class="nav-link w-nav-link">Contact us!</a>
            <a class="nav-link w-nav-link" style="cursor:pointer" v-if="isAuthenticated" @click="cerrarSesion">Log out</a>
            <a href="#Universities" class="nav-link w-nav-link" v-else>Log in</a></nav>
            <div class="nav-link menu w-nav-button">
                <div class="w-icon-nav-menu"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods:{
    cerrarSesion(){
      this.$store.dispatch('closeSesion');
      }
    },
    computed:{
        isAuthenticated()
        {
          console.log(this.$store);
           return this.$store.getters.isAuthenticated;
        }
    },
    watch: {
      isAuthenticated(val) {
        console.log('regreso a login');
         if(!val) this.$router.replace({ path: '/' });
      }
  }  
}
</script>

<style scoped>

.bannerContainer{
  box-shadow: 0px 1px 9px #3f3e3e;

  
}

</style>
