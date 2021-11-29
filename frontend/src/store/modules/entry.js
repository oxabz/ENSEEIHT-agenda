import feathersClient from "../../feathers-client";

const service = feathersClient.service('entry');

const state = {
    entries:{},
    entriesOfAgenda:{}
}

const mutations = {
    addEntry(state, {agendaId, entry}){
        if(state.entries[entry.id]!=undefined)return;
        if (state.entriesOfAgenda[agendaId || entry.agendaId]==undefined)
            state.entriesOfAgenda[agendaId || entry.agendaId] = [];
        state.entries[entry.id] = entry;
        state.entriesOfAgenda[agendaId || entry.agendaId].push(entry.id);
        return state;
    },
    editEntry(state, entry){
        if(state.entries[entry.id]==undefined)return;
        state.entries[entry.id] = entry;
    },
    remove(state, entryId){
        if(state.entries[entryId]==undefined)return;
        delete state.entries[entryId];
        return state;
    }
}

const actions = {
    createEntry(ignore,entry){
        return service.create(entry).then((result)=>{
            console.log('Created entry : ' + result.id);
            return result;
        });
    },
    queryEntriesOfAgenda({commit}, agendaId){
        return service.find({
            query:{agendaId}
        }).then((result)=>{
            result.data.forEach((entry)=>{
                commit('addEntry', {agendaId, entry});
            })
        }).catch((err)=>{
            console.error(err);
        })
    }
}

const plugin = store => {
    console.log('entry listening');
    service.on('created', entry => {
        if(store.state.entry.entriesOfAgenda[entry.agendaId]==undefined)return;
        store.commit('entry/addEntry',{entry});
    });

    service.on('updated', entry => {
        store.commit('entry/editEntry',entry);
    });

    service.on('patched', entry => {
        store.commit('entry/editEntry',entry);
    });
    
    service.on('removed', entry => {
        store.commit('entry/removeEntry',entry.id);
    });
}

export default {namespaced: true ,state, mutations, actions, plugin}