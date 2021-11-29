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
    service.on('create', entry => {
        console.log(entry);
        if(store.state.entry.entriesOfAgenda[entry.agendaId]==undefined)return;
        store.commit('addEntry',entry);
    });

    service.on('update', entry => {
        store.commit('editEntry',entry);
    });

    service.on('patch', entry => {
        store.commit('editEntry',entry);
    });
    
    service.on('remove', entry => {
        store.commit('removeEntry',entry.id);
    });
}

export default {namespaced: true ,state, mutations, actions, plugins:[plugin]}