<template>
    <div class="entry absolute h-24" :class="computedClass" :style="cssVars">
        {{title}}
    </div>
</template>
<script>
import colors from '@/utils/colors'
export default {
    props:{
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
        cssVars(){
            return{
                '--entry-duration': Math.min((this.endDate.getTime()-this.startDate.getTime())/1000/60/60, 24),
                '--entry-level': this.level,
                '--entry-start': Math.max(0, (this.startDate.getTime()-this.column.getTime())/1000/60/60),
                '--column-index': this.columnIdx,
                'background-color': this.color,
                'color': this.contrastingColor
            }
        },
        computedClass(){
            return{
                'rounded-t-md': this.startInColumn,
                'rounded-b-md': this.endInColumn
            }
        },
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
    }
    div.entry:hover{
        z-index: 999;
    }
</style>