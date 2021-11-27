import feathersClient from "../../feathers-client";

const service = feathersClient.service('entry');

const state = {
    entries:{},
    entriesOfAgenda:{}
}

const mutations = {
    addEntry(state, {agendaId, entry}){
        if (state.entriesOfAgenda[agendaId || entry.agendaId]==undefined)
            state.entriesOfAgenda[agendaId || entry.agendaId] = [];
        state.entrie[entry.id] = entry;
        state.entriesOfAgenda[agendaId || entry.agendaId].push(entry.id);
        return state;
    },
    remove(state, entryId){
        delete state.entries[entryId]
        return
    }
}

const actions = {
    createEntry(ignore,entry){
        return service.create(entry).then((result)=>{
            console.log('Created agenda : ' + result.id);
            return result;
        });
    },
    queryEntriesOfAgenda({commit}, agendaId){
        return service.find({
            agendaId
        }).then((result)=>{
            result.data.forEach((entry)=>{
                commit('addEntry', {agendaId,entry});
            })
        }).catch((err)=>{
            console.error(err);
        })
    }
}

export default {namespaced: true ,state, mutations, actions}