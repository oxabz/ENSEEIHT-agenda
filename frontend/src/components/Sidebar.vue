<template>
<div class="sidebar h-full" v-bind:class="classObject">
    <div class="h-screen"> 
        <CreateEntryForm/>
    </div>
</div>
</template>
<script>
import CreateEntryForm from '@/components/CreateEntryForm.vue'
export default {
    computed:{
        classObject(){
            return {
                'open':this.$store.state.sidebar.selectedMenu != null
            }
        }
    },
    components:{
        CreateEntryForm
    }
}
</script>
<style scoped>
.sidebar{
    position: relative;
    border-color: grey;
    width: 0;
    transition-property: width;
    transition-duration: 2s;
    overflow: hidden;
}

.sidebar>div{
    top: 0;
    left: 0;
    width: 24rem;
    height: 100vh;
}

.open{
    width: 24rem;
}
</style>