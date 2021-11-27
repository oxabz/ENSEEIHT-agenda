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