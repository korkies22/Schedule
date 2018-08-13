<template>
  <div class="bannerContainer">
    <h1>Academical</h1>
    <h4>- lite</h4>

    <button @click="cerrarSesion">Cerrar sesión</button>
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
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 80px;
  width: 100vw;
  background-color: rgb(52, 147, 231);
  color: white;
  box-shadow: 0px 1px 9px #3f3e3e;
  position:relative;
  z-index: 100;
  
}

</style>
