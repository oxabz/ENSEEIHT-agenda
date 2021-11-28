<template>
<div class="sidebar h-screen" v-bind:class="classObject">
</div>
</template>
<script>
export default {
    computed:{
        classObject(){
            console.log("toogled"+this.$store.state.sidebar.selectedMenu);
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
}
.open{
    width: 20%;
}
</style>