<template>
<div id="bot-window">
    <div id="bot"/>
</div>
</template>

<script>
export default { 
    name: 'botChat',
    computed:{
        userId(){
            console.log('llamado', this.$store.getters.myToken)
            return this.$store.getters.myToken;
        }
    },
    mounted(){
        console.log('elbot', this)
        BotChat.App({
        directLine: { secret: "V1606ipkob4.cwA.uJU.kXPUw2TeoN73mLBKuyBixDLO8kMdqjpElyhB0tdGoA8" },
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

