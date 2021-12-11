<template>
    <div class="create-entry-form h-full p-5 form-control relative">
    <div class="flex justify-between">
        <h2 class="text-lg font-bold">Agendas :</h2>
        <button class="btn btn-ghost btn-sm" @click="closeSidebar"><i class="fas fa-times"></i></button>
    </div>
    <span class="divider opacity-30"></span>
    <ul>
        <li v-for="agenda in agendas">
            <input type="checkbox" name="visible" @change=""/>
            {{agenda.name}}
        </li>
    </ul>
</template>
<script>
export default {
    computed:{
        agendas(){
            if(this.$store.state.sidebar.menuProps?.agendas)return agendas;
            return [];
        },
        setVisible(){
            if(this.$store.state.sidebar.menuProps?.setVisible)return setVisible;
            return (id, visible)=>{
                console.log('hello ' + id + visible);
            }
        },
    },
    methods:{
        handleChange(event){
            setVisible(agenda.id, event.target)
        }
    }
}
</script>