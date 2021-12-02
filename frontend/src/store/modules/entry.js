import feathersClient from "../../feathers-client";
import time from "../../utils/times";
import {} from "vue"

const service = feathersClient.service('entry');


const state = {
    entries:{
      //'uuid':{nom,uuid...}
      // ...
    },
    entriesOfAgenda:{
      //'uuidAgenda':{
      //    entries:['uuid'...],
      //    intrestingIntervals:[[int,int]...]
      //}
      // ...
    },
    indicator:0//hack que j'ai trouvé
}

const mutations = {
    setAgendaOfIntrest(state, {agendaId, interval= [0, Infinity]}){
        if(state.entriesOfAgenda[agendaId]==undefined) {
            state.entriesOfAgenda[agendaId] = {intrestTimes:[],entries:[]};
        }
        state.entriesOfAgenda[agendaId].intrestTimes = time.merge(state.entriesOfAgenda[agendaId].intrestTimes, interval);
        state.indicator++; //vuex black magic to force it to update
    },
    addEntry(state, {agendaId, entry}){
        if(state.entries[entry.id]!=undefined)return;
        if (state.entriesOfAgenda[agendaId || entry.agendaId] == undefined){
            state.entriesOfAgenda[agendaId || entry.agendaId] = {intrestTimes:[],entries:[]};
        }
        state.entries[entry.id] = entry;
        state.entriesOfAgenda[agendaId || entry.agendaId].entries.push(entry.id);
        state.indicator++; //vuex black magic to force it to update
    },
    editEntry(state, entry){
        if(state.entries[entry.id]==undefined)return state;
        state.entries[entry.id] = entry;
        return state
    },
    remove(state, entryId){
        if(state.entries[entryId]==undefined)return state;
        delete state.entries[entryId];
        return state;
    }
}

const getters = {
    hasInfoOnAgenda: state => ({agendaId, start, end}) => {
        let updateNeeded = false;
        if(state.entriesOfAgenda[agendaId]==undefined)return false;
        for (const interval of state.entriesOfAgenda[agendaId].intrestTimes) {
            updateNeeded = updateNeeded || time.included(interval, [start,end]);
        }
        return updateNeeded;
    },
    isOfIntrest: state => ({agendaId, date}) => {
        let updateNeeded = false;
        if(!state.entriesOfAgenda[agendaId])return false;
        for (const interval of state.entriesOfAgenda[agendaId].intrestTimes) {
            updateNeeded = updateNeeded || time.between(interval, date);
        }
        return updateNeeded;
    }
}

const actions = {
    createEntry(ignore,entry){
        return service.create(entry).then((result)=>{
            console.log('Created entry : ' + result.id);
            return result;
        });
    },
    queryEntriesOfAgenda({commit}, {agendaId, start, end}){
        // Indicated that the agenda was querried on that periode
        commit('setAgendaOfIntrest',{agendaId, start, end});
        const  query = {
            agendaId,
            $or:[
                {startDate: {
                    $lte : end,
                    $gte : start
                }},
                {endDate: {
                    $lte : end,
                    $gte : start
                }}
            ]
            
        }
        // Making the querry
        return service.find({$skip:0,query}).then(async (result)=>{
            result.data.forEach((entry)=>{
                commit('addEntry', {agendaId, entry});
            })
            //reiterating querry offseted
            const limit = result.limit;
            query.$skip = limit;
            while(query.$skip<result.total) {
                await service.find({query}).then(async (result)=>{
                    result.data.forEach((entry)=>{
                        commit('addEntry', {agendaId, entry});
                    })
                }).catch((err)=>{
                    console.error(err);
                });
                query.$skip+=limit;
            }
        }).catch((err)=>{
            console.error(err);
        })
    }
}

const plugin = store => {
    console.log('Listening For New Entries');
    service.on('created', entry => {
        if(!store.getters['entry/isOfIntrest']({agendaId:entry.agendaId, date:new Date(entry.startDate).getTime()})
            && !store.getters['entry/isOfIntrest']({agendaId:entry.agendaId, date:new Date(entry.endDate).getTime()})) return;
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

export default {namespaced: true ,state, getters, mutations, actions, plugin}