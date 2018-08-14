<template>
<div>
   <h1>Holiwi</h1>
</div>
</template>

<script>
export default {
    name: 'LoginMS',
    mounted(){
        console.log('ahora sì ptos');
    },
    methods:{
        loginMS(){
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



  