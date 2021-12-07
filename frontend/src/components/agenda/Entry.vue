<template>
    <div class="entry absolute" :class="computedClass" :style="cssVars" @click="show()">
        {{title}}
    </div>
</template>
<script>
import colors from '@/utils/colors'
export default {
    props:{
        id:{
            type:String
        },
        title:{
            type:String,
            default:'lorem ipsum'
        },
        column:{
            type: Date,
            default:()=>{
                let def = new Date();
                def.setHours(0);
                def.setMinutes(0);
                def.setSeconds(0);
                def.setMilliseconds(0);
                return def;
            }
        },
        columnIdx:{
            type: Number,
            default: 0
        },
        startDate:{
            type: Date,
            default:new Date()
        },
        endDate:{
            type: Date,
            default:()=>{
                let def = new Date()
                def.setHours(new Date().getHours() + 1)
                return def
            }
        },
        level:{
            type:Number,
            default: 0
        },
        color:{
            type: String,
            default: '#006ee6'
        }
    },
    computed:{
        startInColumn(){
            return this.startDate.getDate()==this.column.getDate() &&
                this.startDate.getMonth()==this.column.getMonth() &&
                this.startDate.getYear() ==this.column.getYear()
        },
        endInColumn(){
            return this.endDate.getDate()==this.column.getDate() &&
                this.endDate.getMonth()==this.column.getMonth() &&
                this.endDate.getYear() ==this.column.getYear()
        },
        contrastingColor(){
            let {r,g,b} = colors.hexToRgb(this.color);
            return (r+g+b>384 ? '#000000': '#ffffff')
        },
        borderColor(){
            let {r,g,b} = colors.hexToRgb(this.contrastingColor);
            let {r:rb,g:gb,b:bb} = colors.hexToRgb(this.color);
            return colors.rgbToHex(Math.round(r*0.5+rb*0.5),Math.round(g*0.5+gb*0.5),Math.round(b*0.5+bb*0.5));
        },
        cssVars(){
            let diff = Math.max((this.startDate.getTime()-this.column.getTime())/1000/60/60, 0);
            return{
                '--entry-duration': Math.min((this.endDate.getTime()-Math.max(this.startDate.getTime(), this.column))/1000/60/60, 24-diff),
                '--entry-level': this.level,
                '--entry-start': diff,
                '--column-index': this.columnIdx,
                '--entry-background-color': this.color,
                '--entry-color': this.contrastingColor,
                '--entry-border-color': this.borderColor
            }
        },
        computedClass(){
            return{
                'rounded-t-xl': this.startInColumn,
                'rounded-b-xl': this.endInColumn
            }
        },
    },
    methods:{
        show(){
            this.$store.commit('sidebar/openWithProps', {menu:'showEntry', props:this.id});
        }
    }
}
</script>
<style scoped>
    div.entry {
        padding: 0.25em;
        width: calc(100% / var(--agenda-interval) - 0.25em * var(--entry-level));
        min-width: 4rem;
        z-index: calc(2 + var(--entry-level));
        height: calc(100% / 24 * var(--entry-duration) + 0.25em * var(--entry-level));
        top: calc(100% / 24 * var(--entry-start));
        left: calc(100% / var(--agenda-interval) * var(--column-index));
        color: var(--entry-color);
        background-color: var(--entry-background-color);
        border: 2px solid;
        border-color: var(--entry-border-color);
    }
    div.entry:hover{
        z-index: 999;
        cursor: pointer;
    }
</style>