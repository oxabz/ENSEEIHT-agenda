<template>
   <div class=""><p>Authentification</p></div>
</template>
<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
   setup() {
      const router = useRouter();
      const accessToken = window.location.hash.split("=")[1];
      useStore().dispatch('login/login', accessToken).then(() => {
         router.push({name: 'Home'})
      });
   }

}
</script>