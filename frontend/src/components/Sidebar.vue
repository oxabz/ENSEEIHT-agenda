<template>
<div class="sidebar h-full  " v-bind:class="classObject">
  <div class="fixed h-screen w-1/5"> tetxtzgsdghd vdhsd </div>
</div>
</template>
<script>
export default {
    computed:{
        classObject(){
            return {
                open:this.$store.state.sidebar.selectedMenu != null
            }
        }
    }
}
</script>
<style scoped>
.sidebar{
    width: 0;
    background-color: tomato;
    height: 100vh;
    transition-property: width;
    transition-duration: 2s;
}
.open{
    width: 20%;
}
</style>