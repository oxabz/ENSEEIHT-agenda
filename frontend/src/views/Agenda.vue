<template>
<div class="flex flex-row w-screen overflow-auto">
    <div class="w-full relative h-screen flex flex-col">
        <TimelineNavigation :initial-date="startDate" :interval="interval" :changeDate="handleChange"/>
        <Agenda :start="startDate" :interval="interval" :entries="agendaEntries"/>
        <MenuButton class="absolute right-4 bottom-4 btn-circle" menu="createEntry"><i class="fas fa-plus text-xl"></i></MenuButton>
    </div>
    <Sidebar/>
</div>
</template>
<script>
import MenuButton from '../components/MenuButton.vue'
import Sidebar from '../components/Sidebar.vue'
import Agenda from '../components/Agenda/Agenda.vue';
import TimelineNavigation from '../components/Agenda/TimelineNavigation.vue';
export default {
    data(){
        let startDate = new Date();
        let interval = 7;
        return {
            startDate,
            interval
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
            let endDate = new Date(this.startDate)
            endDate.setDate(endDate.getDate()+this.interval)
            if (!this.$store.getters['entry/hasInfoOnAgenda']({agendaId:this.$route.params.id, start:this.startDate.getTime(), end:endDate.getTime()})){
                this.$store.dispatch('entry/queryEntriesOfAgenda',{agendaId:this.$route.params.id, start:this.startDate, end:endDate});
                return [];
            }
            return module.entriesOfAgenda[this.$route.params.id].entries.map(id => module.entries[id]);
        },
        handleChange(){
            return (date)=>{
                this.startDate = date;
            }
        }
    },
    components: {
    MenuButton,
    Sidebar,
    Agenda,
    TimelineNavigation
}
}
</script>