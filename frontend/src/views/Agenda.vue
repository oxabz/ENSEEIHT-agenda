<template>
<div>
    <div>{{ $route.params.id }}</div>
    <p>{{agendaEntries}}</p>
    <button v-on:click="create()"></button>
</div>
</template>
<script>
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
    }
}
</script>
<style scoped>

</style>