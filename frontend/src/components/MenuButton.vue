<template>
    <button class="menu-btn btn" v-on:click="toggleMenu()"> <slot></slot> </button>
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
<style scoped>
.menu-btn{
    z-index: 9999999;
}
</style>