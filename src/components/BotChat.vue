<template>
<div id="bot-window" class="wc-narrow">
    <div id="bot" class="wc-narrow"/>
</div>
</template>

<script>
export default { 
    name: 'botChat',
    computed:{
        userId(){
            return this.$store.getters.myToken;
        }
    },
    mounted(){
        console.log('elbot', this)
        BotChat.App({
        directLine: { secret: "yDHaP6BPqSY.cwA.zp8.bzLkkPwwSPrPK7E07Tno3_pb7t19QVXng7VyLKKy9jM" },
        user: { id: this.userId },
        bot: { id: 'botid' },
        resize: 'detect'
      }, document.getElementById("bot"));
    }
}
</script>

<style lang="scss">
@import "../botscss/botchat";

#bot{
    display:none;
}
</style>

