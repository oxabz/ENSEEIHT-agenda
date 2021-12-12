                                                                                <template>
<div class="sidebar" v-bind:class="classObject">
    <div class="sidebar-placeholder relative h-full "></div>
    <div class="sidebar-container h-screen  border-l-2 fixed right-0 top-0"> 
        <CreateEntryForm v-if="this.$store.state.sidebar.selectedMenu == 'createEntry'"/>
        <ShowEntryForm v-else-if="this.$store.state.sidebar.selectedMenu == 'showEntry'"/>
        <Agendas v-else-if="this.$store.state.sidebar.selectedMenu == 'agendas'"/>
    </div>
</div>
</template>
<script>
import CreateEntryForm from '@/components/sidebarMenus/CreateEntryForm.vue'
import ShowEntryForm from '@/components/sidebarMenus/ShowEntryForm.vue'
import Agendas from './sidebarMenus/Agendas.vue'
export default {
    computed:{
        classObject(){
            return {
                'open':this.$store.state.sidebar.selectedMenu != null
            }
        }
    },
    components:{
    CreateEntryForm,
    ShowEntryForm,
    Agendas
}
}
</script>
<style scoped>

.sidebar{
    --sidebar-width: 24rem;
    z-index: 999999999999999;
}

@media (max-width: 640px) {
    .sidebar{
        --sidebar-width: 100%
    }
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

@media (max-width: 768px) {
    .open div.sidebar-placeholder{
        width: 0;
    }
}

div.sidebar-container{
    background-color: white;
    right: calc(var(--sidebar-width) * -1);
    width: var(--sidebar-width);
    transition: .75s right ease-in-out;
    overflow: hidden;
    overflow-y: scroll;
}


.open div.sidebar-container{
    right: 0;
}
</style>