<template>
    <div>
        <h2 class=" text-left text-xs opacity-80"  > Consultez vos agendas récents : </h2>
        <ul>
            <li v-for="recent in recentAgendas" :key="recent"> 
                <button class=" btn btn-ghost w-full" v-on:click="submit(recent)">{{ recent.name }}</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    computed:{ 
        recentAgendas(){
           let agenda = this.$store.state.agenda;
           return agenda.recentagenda.map(agendaid => agenda.agendas[agendaid]).filter(agenda => !!agenda);
        }
    },
 
   methods:{
       submit(agenda){
           this.$router.push(`/agenda/${agenda.id}`)
       }
   }
 
    
}
</script>

