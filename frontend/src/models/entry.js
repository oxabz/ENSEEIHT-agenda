import { computed, reactive } from "vue";
import feathersClient from "../feathers-client";

const entries = reactive({
    entries:{},
    intrestAgenda:{}
})
 
function getEntriesOfAgenda(agendaId){
    feathersClient.service("entry").find({
        agendaId
    }).then((result) => {
        entries.intrestAgenda[agendaId] = result.map((entry)=>entry.id);
        result.forEach(entry=>{
            entries.entries[entry.id] = entry;
        });
    }).catch((err) => {
        console.error(err);
    });
    return computed(()=>{
        if(entries.intrestAgenda[agendaId]==undefined)return [];
        return entries.intrestAgenda[agendaId].map(entry => entries[entry]);
    });
}

function createEntry(entry){
    return feathersClient.service('entry').create(entry).then((result)=>{
        console.log('Created entry : ' + result.id);
        return result;
    });
}

export {
    getEntriesOfAgenda,
    createEntry,
}