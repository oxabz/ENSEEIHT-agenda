<template>
  <div class="home hero min-h-screen bg-base-200">
    <div class="text-center hero-content">
      <div class="max-w-md">
        <h1 class="mb-7 text-4xl font-bold">
          ENSEEIHT-Agenda
        </h1> 
        <p class="mb-5">
          Utilisez cette agenda révolutionaire dés aujourd'hui!  
        </p> 
        <NewAgenda title="Créez votre premier calendrier" label="Go !" :onCreate="handleCreate"/>
        <Login/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NewAgenda from '../components/NewAgenda.vue'
import Login from '../components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login,
    NewAgenda
  },
  methods:{
    handleCreate(agenda){
      this.$router.push(`/agenda/${agenda.id}`)
    }
  }
}
</script>
