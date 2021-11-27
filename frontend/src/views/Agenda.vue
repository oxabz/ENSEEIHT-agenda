<template>
<div>
    <div>{{ $route.params.id }}</div>
    <p>{{agendaEntries}}</p>
</div>
</template>
<script>
export default {
    computed:{
        agendaEntries(){
            const module = this.$store.state.entryModule;
            if (module.entriesOfAgenda[this.$route.params.id] == undefined){
                this.$store.dispatch('entryModule/queryEntriesOfAgenda',this.$route.params.id);
                return [];
            }
            return module.entriesOfAgenda[this.$route.params.id].map(id => module.entries[id]);
        }
    }
}
</script>
<style scoped>

</style>