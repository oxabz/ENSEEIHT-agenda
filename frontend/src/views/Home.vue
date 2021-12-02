<template>
  <div class="home">
    <hgroup>
      <h1>ENSEEIHT Agenda</h1>
      <h2>Get started now wit</h2>
    </hgroup>
    <NewAgenda/>
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewAgenda from '../components/NewAgenda.vue'
import Login from '../components/Login.vue'

export default {
  name: 'Home',
  components: {
    NewAgenda,
    Login
  }
}
</script>
