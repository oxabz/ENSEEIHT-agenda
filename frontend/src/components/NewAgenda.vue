<template>
    <div><input v-model="newAgendaName" type="text"/> <button v-on:click="submit">create Agenda</button></div>
</template>
<script>
export default {
    name:'NewAgendaVue',
    data(){
        return{
            newAgendaName:''
        }
    },
    methods:{
        submit(){
            if(this.newAgendaName.length == 0)return;
            console.log(this.$store)
            this.$store.dispatch('agendaModule/createAgenda',{
                name: this.newAgendaName
            })
        }
    }
}
</script>
<style scoped>

</style>