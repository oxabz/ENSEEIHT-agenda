<template>
<div class="flex flex-row w-full">

       <div class="flex w-full">

        <div>{{ $route.params.id }}</div>
        <p>{{agendaEntries}}</p>
        <p> 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fringilla bibendum euismod. Sed vestibulum nisi sed ipsum vestibulum dictum. Sed a facilisis leo, sit amet eleifend orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a urna dui. Etiam in ex ac est gravida pharetra nec eget tellus. Duis aliquet porta eros ut condimentum.

Etiam dolor nulla, maximus non lobortis porta, consequat id felis. Donec nulla ipsum, dictum in urna at, posuere auctor lorem. Mauris urna justo, egestas hendrerit libero ac, elementum rhoncus arcu. Suspendisse fringilla, quam placerat bibendum aliquet, purus neque suscipit urna, sed elementum nisi nulla sed eros. Donec at velit nec tellus aliquet venenatis non sed nunc. Morbi in posuere augue. In vitae ultrices eros. Ut non interdum erat. Etiam a dui eu justo elementum eleifend. Vivamus ac erat eros. Pellentesque pretium erat sit amet sagittis efficitur. Suspendisse mollis nulla sit amet lorem euismod tristique. Aliquam erat volutpat. In nec augue diam. Donec placerat ultricies neque, vitae suscipit libero pharetra id.

Mauris at diam vitae arcu commodo efficitur. Vivamus id lacus sed elit feugiat maximus in a magna. Nunc convallis semper mauris a sollicitudin. Duis aliquam lorem tellus, nec ultrices dolor consequat et. Vestibulum turpis dolor, pretium a pulvinar nec, luctus nec leo. Duis est magna, feugiat ac tincidunt eget, pellentesque sit amet magna. Nulla facilisi. Sed et sem cursus, ornare quam id, suscipit purus.

Sed eu nisi turpis. Nulla quis nisl non ipsum feugiat aliquam. Nullam in imperdiet libero. Vestibulum mattis maximus metus. Ut at dui efficitur, aliquam nibh sed, mollis ex. Aliquam mollis ligula a elit viverra, in tristique mi sodales. Praesent ultrices neque sed augue sagittis rhoncus. Integer molestie quis sapien a ornare. Nunc euismod vitae dolor vel interdum. Morbi feugiat urna metus.

Cras lectus tortor, bibendum quis metus quis, porta malesuada nunc. Pellentesque sed orci quis velit dictum mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc ut dapibus mi, non facilisis lorem. Quisque accumsan velit ac urna euismod eleifend. Mauris egestas bibendum ullamcorper. Nunc quis turpis sit amet quam eleifend dapibus sed sed nisl. Vestibulum fermentum elit vitae viverra tempor.
 </p>
        <button v-on:click="create()"></button>
        <MenuButton menu="createEntry"/>
       
    </div>

    <Sidebar/>
   
</div>
</template>
<script>
import MenuButton from '../components/MenuButton.vue'
import Sidebar from '../components/Sidebar.vue'
export default {
    methods:{
        create(){
            const agendaId = this.$route.params.id;
            this.$store.dispatch('entry/createEntry', {
                agendaId,
                titre:'test',
                description:'test'
            })
        }
    },
    computed:{
        agendaEntries(){
            const module = this.$store.state.entry;
            if (module.entriesOfAgenda[this.$route.params.id] == undefined){
                this.$store.dispatch('entry/queryEntriesOfAgenda',this.$route.params.id);
                return [];
            }
            return module.entriesOfAgenda[this.$route.params.id].map(id => module.entries[id]);
        }
    },
    components: {
        MenuButton,
        Sidebar
    }
}
</script>
<style scoped>

</style>