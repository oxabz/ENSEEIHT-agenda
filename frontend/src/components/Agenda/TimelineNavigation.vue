<template>
<div class="flex justify-between border-b" >
    <div class=" flex items-center ">
        <input class="input input-ghost input-xs w-36" v-model="dateInput" type="date" @change="handleChange"/>
        <i class="fas fa-arrow-right"></i>
        <p class="ml-4 text-xs">11/11/2000</p>
    </div>
    <div class="flex items-center ">
        <button class="btn btn-xs btn-ghost" @click="backOneInterval"><i class="fas fa-chevron-left"></i><i class="fas fa-chevron-left"></i></button>
        <button class="btn btn-xs btn-ghost" @click="backOneDay"><i class="fas fa-chevron-left"></i></button>
        <button class="btn btn-xs btn-ghost" @click="forwardOneDay"><i class="fas fa-chevron-right"></i></button>
        <button class="btn btn-xs btn-ghost" @click="forwardOneInterval"><i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i></button>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            dateInput: this.initialDate.toLocaleDateString('en-CA')
        }
    },
    props:{
        initialDate:{
            type:Date,
            default:()=>{
                const d = new Date();
                return new Date(d.getFullYear(), d.getMonth(), d.getDate());
            }
        },
        changeDate:{
            type:Function,
            default:()=>date=>{
                console.log('date changed : '+date);
            }
        },
        interval:{
            type:Number,
            default:()=>{
                return 7;
            }
        }
    },
    methods:{
        handleChange(event){
            this.changeDate(new Date(event.target.value))
        },
        backOneDay(){
            let d = new Date(this.initialDate);
            d.setDate(d.getDate()-1);
            this.changeDate(d);
        },
        forwardOneDay(){
            let d = new Date(this.initialDate);
            d.setDate(d.getDate()+1);
            this.changeDate(d);
        },
        backOneInterval(){
            let d = new Date(this.initialDate);
            d.setDate(d.getDate()-this.interval);
            this.changeDate(d);
        },
        forwardOneInterval(){
            let d = new Date(this.initialDate);
            d.setDate(d.getDate()+this.interval);
            this.changeDate(d);
        },
    }
}
</script>