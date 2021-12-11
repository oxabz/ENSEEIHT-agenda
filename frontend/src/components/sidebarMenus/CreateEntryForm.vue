<template>
    <div class="create-entry-form h-full p-5 form-control relative">
        <div class="flex justify-between">
            <h2 class="text-lg font-bold">{{this.id?'Editer un evenement : ':'Créer un evenement : '}}</h2>
            <button class="btn btn-ghost btn-sm" @click="closeSidebar"><i class="fas fa-times"></i></button>
        </div>
        <span class="divider opacity-30"></span>
        <div v-if="alert!=null" class="alert alert-error">
            <div class="flex-1">
                <i class="fas fa-exclamation-triangle"></i>
                <label>{{alert}}</label>
            </div>
        </div>
        <div v-if="$route?.params?.id||agendaId == undefined">
            <label class="label" for="agenda">
                <span class="label-text text-xs opacity-70">Agenda</span>
            </label>
            <select class="w-full pr-16 input input-primary input-bordered" v-model="agenda" type="text" name="agenda"> 
                <option v-for="agenda in this.$store.state.agenda.myAgendas" :key={agenda} :value="agenda">{{this.$store.state.agenda.agendas[agenda].name}}</option>
            </select>
        </div>
        <div class="form-control">
            <label class="label" for="title">
                <span class="label-text text-xs opacity-70">Titre</span>
            </label>
            <input class="w-full pr-16 input input-primary input-bordered" v-model="title" type="text" placeholder="Titre" name="title"/> 
        </div>
        <div class="form-control">
            <label class="label" for="description">
                <span class="label-text text-xs opacity-70">Description</span>
            </label>
            <textarea class="textarea w-full h-36 pr-16 textarea-bordered" v-model="description"  type="text" placeholder="Description" name="description"/> 
        </div>

        <div class="form-control">
            <label class="label" for="start">
                <span class="label-text text-xs opacity-70">Debut</span>
            </label>
            <input type="datetime-local" class="input input-bordered" v-model="startDate" placeholder="Debut" name="start">
        </div>
        <div class="form-control">
            <label class="label" for="end">
                <span class="label-text text-xs opacity-70">Fin</span>
            </label>
            <input type="datetime-local" class="input input-bordered" v-model="endDate" placeholder="Fin" name="end">
        </div>
        <div class="flex justify-end h-full items-end">
            <button class="btn btn-primary" v-on:click="createEntry"><i class="fas fa-save mr-1"></i>{{this.id?'Save':'Créer !'}}</button>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        const state = {...this.$store.state.sidebar.menuProps};
        const entry = this.$store.state.entry.entries[this.$store.state.sidebar.menuProps.id];
        if(entry){
            return {
                ...state,
                ...entry,
                startDate:entry.startDate.toISOString().slice(0, -8),
                endDate:entry.endDate.toISOString().slice(0, -8),
            }
        }else{
            if( state.startDate) state.startDate = state.startDate.toISOString().slice(0, -8);
            if( state.endDate) state.endDate = state.endDate.toISOString().slice(0, -8);
            return state;
        }
    },
    methods:{
        createEntry(){
            let agendaId = this.$route?.params?.id || this.agenda;
            if (new Date(this.startDate).getTime()>new Date(this.endDate).getTime()){
                this.alert = 'La date de fin doit être superieure à la date de debut';
                return;
            }
            if (!agendaId || !this.title || !this.startDate || !this.endDate){
                this.alert = 'Tout les champs doivent être rempli';
                return;
            }
            if(this.id){
                this.$store.dispatch('entry/updateEntry',  {
                    agendaId:this.agendaId,
                    id: this.id,
                    title:this.title,
                    description:this.description||'',
                    startDate:this.startDate,
                    endDate:this.endDate
                });
            }else{
                this.$store.dispatch('entry/createEntry', {
                    agendaId,
                    title:this.title,
                    description:this.description||'',
                    startDate:this.startDate,
                    endDate:this.endDate
                });
            }
        },
        closeSidebar(){
            this.$store.commit('sidebar/close')
        },
    }
}
</script>
<style scoped>
.create-entry-form{
    width: 100%;
}
</style>