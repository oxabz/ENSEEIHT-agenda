<template>
    <div class="form-control">
        <label class="label" for="title">
            <span class="label-text text-xs opacity-80">{{this.title}}</span>
        </label>
        <div class="relative">
            <input class="w-full pr-16 input input-primary input-bordered" v-model="newAgendaName" type="text" placeholder="Titre" name="title"/> 
            <button class="absolute top-0 right-0 rounded-l-none btn btn-primary" v-on:click="submit">{{this.label}}</button>
        </div>
    </div>
</template>
<script>
export default {
    props:['label','title'],
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
            this.$store.dispatch('agenda/createAgenda',{
                name: this.newAgendaName
            })
        }
    }
}
</script>
<style scoped>

</style>