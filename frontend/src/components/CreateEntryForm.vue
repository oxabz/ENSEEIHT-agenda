<template>
    <div class="h-full max-w-sm p-5 form-control relative">
        <h2>Create Event</h2>
        <span class="divider opacity-30"></span>
        <div class="form-control">
            <label class="label" for="title">
                <span class="label-text text-xs opacity-70">Title</span>
            </label>
            <input class="w-full pr-16 input input-primary input-bordered" v-model="title" v-on:keyup.enter="submit" type="text" placeholder="Title" name="title"/> 
        </div>
        <div class="form-control">
            <label class="label" for="description">
                <span class="label-text text-xs opacity-70">Description</span>
            </label>
            <textarea class="textarea w-full h-36 pr-16 textarea-bordered" v-model="description" v-on:keyup.enter="submit" type="text" placeholder="Description" name="description"/> 
        </div>

        <div class="form-control">
            <label class="label" for="start">
                <span class="label-text text-xs opacity-70">Start</span>
            </label>
            <input type="datetime-local" class="input input-bordered" v-model="startDate" placeholder="Start" name="start">
        </div>
        <div class="form-control">
            <label class="label" for="end">
                <span class="label-text text-xs opacity-70">End</span>
            </label>
            <input type="datetime-local" class="input input-bordered" v-model="endDate" placeholder="Start" name="end">
        </div>
        <div class="flex justify-end h-full items-end">
            <button class="btn btn-primary" v-on:click="createEntry">Create !</button>
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
            console.log(agendaId);
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