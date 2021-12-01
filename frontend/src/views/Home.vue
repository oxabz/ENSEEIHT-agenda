<template>
  <div class="home">
    <hgroup>
      <h1>ENSEEIHT Agenda</h1>
      <h2>Get started now wit</h2>
    </hgroup>
    <NewAgenda/>
    <RecentAgenda/>
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
    RecentAgenda
  }
}
</script>
