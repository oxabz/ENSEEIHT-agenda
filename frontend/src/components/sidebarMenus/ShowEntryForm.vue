<template>
     <div class="create-entry-form h-full p-5 form-control relative">
        <div class="flex justify-between">
            <h2 class="text-lg font-bold"> {{entry.title}} : </h2>
            <button class="btn btn-ghost btn-sm" @click="closeSidebar"><i class="fas fa-times"></i></button>
        </div>
        <span class="divider opacity-30"></span>
        <div class="">
            <h3 class="label" for="description">
                <span class="label-text text-xs opacity-70">Description</span>
            </h3>
            <div class="pl-3 w-full pr-16 "> {{entry.description}}</div> 
        </div>
        <div class="">
            <h3 class="label" for="start">
                <span class="label-text text-xs opacity-70">Debut - Fin </span>
            </h3>
            <p class="pl-3"> {{entry.startDate.toLocaleString()}} - {{entry.endDate.toLocaleString()}} </p>
        </div>
        <div class="flex justify-end h-full items-end">
            <button class="btn btn-primary" v-on:click="editEntry"><i class="fas fa-edit"></i></button>
            <button class="btn ml-1 btn-primary" v-on:click="deleteEntry"><i class="fas fa-trash"></i></button>
        </div>
        
    </div>
</template>
<script lang="js">
export default {
    methods:{
        closeSidebar(){
            this.$store.commit('sidebar/close');
        },
        deleteEntry(){

            this.$store.dispatch('entry/deleteEntry',this.entry.id)
        },
    },
    computed:{
        entry(){
            const def = {
                id: 'lorem ipsum',
                title: 'Lorem Ipsum',
                description: 'Lorem Ipsum',
                startDate: new Date(),
                endDate: new Date(),
            };

            return this.$store.state.entry.entries[this.$store.state.sidebar.menuProps] || def;
        }
    }
}
</script>