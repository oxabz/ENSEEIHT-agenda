<template>
    <div class="create-entry-form h-full p-5 form-control relative">
        <h2 class="text-lg font-bold">Creer un evenement : </h2>
        <span class="divider opacity-30"></span>
        <div class="form-control">
            <label class="label" for="title">
                <span class="label-text text-xs opacity-70">Titre</span>
            </label>
            <input class="w-full pr-16 input input-primary input-bordered" v-model="title" v-on:keyup.enter="submit" type="text" placeholder="Titre" name="title"/> 
        </div>
        <div class="form-control">
            <label class="label" for="description">
                <span class="label-text text-xs opacity-70">Description</span>
            </label>
            <textarea class="textarea w-full h-36 pr-16 textarea-bordered" v-model="description" v-on:keyup.enter="submit" type="text" placeholder="Description" name="description"/> 
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
            <button class="btn btn-primary" v-on:click="createEntry">Créer !</button>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            title: null,
            description: null,
            startDate:null,
            endDate:null
        };
    },
    methods:{
        createEntry(){
            let agendaId = this.$route?.params?.id;
            if (!agendaId || !this.title || !this.startDate || !this.endDate) return;
            this.$store.dispatch('entry/createEntry', {
                agendaId,
                title:this.title,
                description:this.description||'',
                startDate:this.startDate,
                endDate:this.endDate
            })  
        }
    }
}
</script>
<style scoped>
.create-entry-form{
    width: 100%;
}
</style>