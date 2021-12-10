<template>
<div class="w-full agenda h-full flex flex-col" :style="cssVars">
    <table class="table agenda-head border-b-2 filter shadow-lg">
        <tr>
            <th class="p-0 text-sm opacity-50" v-for="[month, size] in Object.entries(months)" v-bind:key="month" :colspan="size">
                {{month}}
            </th>
        </tr>
        <tr>
            <th v-for="j in dates" v-bind:key="j">
                <p class="opacity-50 text-xs">{{j.dayName}}</p>
                <p class="text-center">{{j.dayNum}}</p>
            </th>
        </tr>
    </table>
    <div class="w-full h-full overflow-y-auto agenda-body">
        <table class="table w-full relative">
            <Entry v-for="entry in entriesProps" v-bind:key="entry" v-bind:id="entry.id" :title="entry.title" :column="entry.column" :columnIdx="entry.columnIdx" :startDate="entry.startDate" :endDate="entry.endDate" :color="entry.color" :level="entry.level"/>
            <tbody class="">
                <tr v-for="time in timeArray" v-bind:key="time">
                    <td  v-for="(ignored, i) in dates" v-bind:key="i" class="opacity-50 text-xs h-12">{{time}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<script>
import Entry from "./Entry.vue";
import times from "@/utils/times"
import colors from "../../utils/colors";
const DAYS_OF_THE_WEEK = [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];
const MONTHS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

export default {
    props: {
        start: {
            type: Date,
            default: new Date()
        },
        interval: {
            type: Number,
            default: 7
        },
        entries: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({}),
    computed: {
        dates() {
            let start = this.start.getDate();
            return [...Array(this.interval).keys()].map(x => {
                let t = new Date(this.start);
                t.setDate(start + x);
                t.setHours(0);
                t.setMinutes(0);
                t.setSeconds(0);
                t.setMilliseconds(0);
                return {
                    time:t,
                    dayName: DAYS_OF_THE_WEEK[t.getDay()],
                    month: MONTHS[t.getMonth()],
                    dayNum: t.getDate()
                };
            });
        },
        months() {
            let months = {};
            this.dates.forEach(date => {
                if (!months[date.month])
                    months[date.month] = 0;
                months[date.month]++;
            });
            return months;
        },
        timeArray() { return [...Array(24).keys()].map(x => [x + ":00", x + ":30"]).flat(); },
        cssVars() {
            return {
                "--agenda-interval": this.interval
            };
        },
        entriesProps(){
            let entries = [...this.entries];
            entries.sort((a,b)=> a.startDate.getTime()-b.startDate.getTime());
            let levels = times.getSuperpositions(entries.map(entry => [entry.startDate.getTime(), entry.endDate.getTime()]));
            return this.dates.map((c,columnIdx)=>{
                let column = c.time;
                let columnEnd = new Date(column);
                columnEnd.setHours(23);
                columnEnd.setMinutes(59);
                columnEnd.setSeconds(59);
                columnEnd.setMilliseconds(999);
                return entries.filter((entry) => times.included([column.getTime(),columnEnd.getTime()], [entry.startDate.getTime(),entry.endDate.getTime()])||
                    times.included([entry.startDate.getTime(),entry.endDate.getTime()], [column.getTime(),columnEnd.getTime()])||
                    times.between([column.getTime(),columnEnd.getTime()], entry.startDate.getTime())||
                    times.between([column.getTime(),columnEnd.getTime()], entry.endDate.getTime()))
                    .map((entry, entryIdx) => {
                        const color = colors.stringToColors(entry.title) 
                        return{
                            ...entry,
                            color,
                            column,
                            columnIdx,
                            level: levels[entryIdx]
                        }
                    })
            }).flat();
        }
    },
    components: { Entry }
}
</script>
<style scoped>

div.agenda{
    flex: 1;
    min-height: 0;
}

div.agenda td,th{
    padding: 0.4em !important;
    width: calc(100% / var(--agenda-interval));
}

/* Hide scrollbar for Chrome, Safari and Opera */
.agenda-body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.agenda-body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>