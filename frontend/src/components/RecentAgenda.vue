<template>
    <div>
       
            <h2 class="font-black space-y-5 mx-4"  > Agenda récent </h2>
             <ul>
            <li v-for="recent in recentAgendas" :key="recent"> 
                <button class=" btn btn-ghost w-full" v-on:click="submit">{{ recent.name }}</button>
            </li>
                
            
        </ul>
       
    </div>
</template>

<script>
export default {
    computed:{ 

        recentAgendas(){
           let agenda = this.$store.state.agenda;
           console.log(agenda.recentagenda.map(agendaid => agenda.agendas[agendaid]));
           return agenda.recentagenda.map(agendaid => agenda.agendas[agendaid]);
               
        }
    },
 
   methods:{

       submit(agenda){

           this.$router.push(`/agenda/${agenda.id}`)

       }
   }
 
    
}
</script>

