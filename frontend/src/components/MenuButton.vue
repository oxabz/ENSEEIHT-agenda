<template>
    <div><button class="btn" v-on:click="toggleMenu()"> {{menu}} </button></div>
</template>
<script>
export default {
    props: ['menu'],
    methods:{
        toggleMenu(){
            if(this.$store.state.sidebar.selectedMenu != this.menu){
               this.$store.commit("sidebar/open",this.menu); 
            }
            else{
               this.$store.commit("sidebar/close");
            }
        }
    
    }
}
</script>
