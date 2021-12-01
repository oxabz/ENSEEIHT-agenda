<template>
    <div>{{recentAgendas}}</div>
</template>

<script>
export default {
    computed:{ 

        recentAgendas(){
           let agenda = this.$store.state.agenda;
           return agenda.recentagenda.map(agendaid => agenda.agendas[agendaid]);
               
        }
    } 
}
</script>