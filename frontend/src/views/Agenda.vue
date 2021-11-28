<template>
<div >
    <div class="w-full">
        <div>{{ $route.params.id }}</div>
        <p>{{agendaEntries}}</p>
        <button v-on:click="create()"></button>
        <MenuButton menu="createEntry"/>
    </div>
    <Sidebar/>
</div>
</template>
<script>
import MenuButton from '../components/MenuButton.vue'
import Sidebar from '../components/Sidebar.vue'
export default {
    methods:{
        create(){
            const agendaId = this.$route.params.id;
            this.$store.dispatch('entry/createEntry', {
                agendaId,
                titre:'test',
                description:'test'
            })
        }
    },
    computed:{
        agendaEntries(){
            const module = this.$store.state.entry;
            if (module.entriesOfAgenda[this.$route.params.id] == undefined){
                this.$store.dispatch('entry/queryEntriesOfAgenda',this.$route.params.id);
                return [];
            }
            return module.entriesOfAgenda[this.$route.params.id].map(id => module.entries[id]);
        }
    },
    components: {
        MenuButton,
        Sidebar
    }
}
</script>
<style scoped>
    body {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
    }
</style>