<template>
<div class="flex flex-row w-screen">
    <div class="w-full">
        <Agenda :start="startTime" :interval="rangeDays" :entries="agendaEntries"/>
        <MenuButton class="fixed top-0 right-0" menu="createEntry"/>
    </div>
    <Sidebar/>
</div>
</template>
<script>
import MenuButton from '../components/MenuButton.vue'
import Sidebar from '../components/Sidebar.vue'
import Agenda from '../components/Agenda/Agenda.vue';
export default {
    data(){
        let startTime = new Date();
        let rangeDays = 7;
        return {
            startTime,
            rangeDays
        }
    },
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
            let endDate = new Date(this.startTime)
            endDate.setDate(endDate.getDate()+this.rangeDays)
            if (!this.$store.getters['entry/hasInfoOnAgenda']({agendaId:this.$route.params.id, start:this.startTime.getTime(), end:endDate.getTime()})){
                this.$store.dispatch('entry/queryEntriesOfAgenda',{agendaId:this.$route.params.id, start:this.startTime, end:endDate});
                return [];
            }
            console.log(module.entriesOfAgenda[this.$route.params.id].entries.map(id => module.entries[id]));
            return module.entriesOfAgenda[this.$route.params.id].entries.map(id => module.entries[id]);
        }
    },
    components: {
    MenuButton,
    Sidebar,
    Agenda
}
}
</script>
<style scoped>

</style>