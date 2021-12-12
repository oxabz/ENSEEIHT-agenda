<template>
  <div class="home hero min-h-screen bg-base-200">
    <div class="text-center hero-content">
      <div class="max-w-lg">
        <h1 class="mb-7 text-4xl font-bold">
          ENSEEIHT-Agenda
        </h1> 
        <p class="mb-5">
          Utilisez cette agenda révolutionaire dés aujourd'hui!  
        </p> 
        <div class="flex">
          <NewAgenda class='start-option' title="Créez votre premier calendrier anonymement" label="Go !" :onCreate="handleCreate"/>
          <span class="divider divider-vertical opacity-30"></span>
          <div v-if="!this.$store.state.login.login" class="start-option">
            <p class="text-left text-xs opacity-80">Connectez vous pour acceder à tout vos calendriers privés</p>
            <router-link class="w-full mt-2 btn btn-primary" to="/login">Me Connecter</router-link>
          </div>
          <div v-else class="start-option">
            <p class="text-left text-xs opacity-80">Accedez à tout vos calendriers privés</p>
            <router-link class="w-full mt-2 btn btn-primary" to="/myAgendas">Mes Agendas</router-link>
          </div>
        </div>
        <span class="divider opacity-30"></span>
        <RecentAgenda class="my-8"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NewAgenda from '../components/NewAgenda.vue'
import RecentAgenda from '../components/RecentAgenda.vue'

export default {
  name: 'Home',
  components: {
    NewAgenda,
    RecentAgenda,
},
  methods:{
    handleCreate(agenda){
      this.$router.push(`/agenda/${agenda.id}`)
    }
  }
}
</script>
<style scoped>
.start-option{
  width: calc(50% - 10px);
}
</style>