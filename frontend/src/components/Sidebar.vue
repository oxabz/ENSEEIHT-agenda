<template>
<div class="sidebar" v-bind:class="classObject">
    <div class="sidebar-placeholder relative h-full ">
        
    </div>
    <div class="sidebar-container h-screen border-l-2 fixed right-0 top-0"> 
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
    --sidebar-width: 24rem
}
div.sidebar-placeholder{
    position: relative;
    width: 0;
    transition: .75s width ease-in-out;
    overflow: hidden;
}

.open div.sidebar-placeholder{
    width: var(--sidebar-width);
}
div.sidebar-container{
    background-color: white;
    right: calc(var(--sidebar-width) * -1);
    width: var(--sidebar-width);
    transition: .75s right ease-in-out;
    overflow: hidden;
}

.open div.sidebar-container{
    right: 0;
}
</style>