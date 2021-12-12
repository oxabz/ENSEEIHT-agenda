<template>
<div class="h-full p-5 form-control relative">
    <div class="grow-0 flex justify-between">
        <h2 class="text-lg font-bold">Agendas :</h2>
        <button class="btn btn-ghost btn-sm" @click="closeSidebar"><i class="fas fa-times text-sm"></i></button>
    </div>
    <span class="grow-0 divider opacity-30"></span>
    <NewAgenda title="Créer agenda:" label="Créer" private="true"/>
    <label class="label" for="start">
        <span class="label-text text-xs opacity-70">Agendas :</span>
    </label>
    <ul>
        <li class="flex items-center m-1 ml-4" v-for="agenda in this.agendas" :key="agenda.id">
            <input class="checkbox checkbox-xs checkbox-primary" type="checkbox" checked='true' name="visible" @change="(event)=>changeHandler(event,agenda.id)"/>
            <p class="ml-1">{{agenda.name}}</p>
        </li>
    </ul>
</div>
</template>
<script>
import NewAgenda from '../NewAgenda.vue';
export default {
    computed:{
        agendas(){
            return this.$store.state.agenda.myAgendas.map(agenda=>this.$store.state.agenda.agendas[agenda]);
        },
    },
    methods:{
        closeSidebar(){
            this.$store.commit('sidebar/close');
        },
        changeHandler(event, agenda){
            if(!this.$store.state.sidebar.menuProps?.setVisible)return;
            this.$store.state.sidebar.menuProps?.setVisible(agenda, event.target.checked);
        }
    },
    components:{
        NewAgenda
    }
}
</script>