import feathersClient from "../../feathers-client";

const service = feathersClient.service('agenda');

const state = {
    agendas: {},
    recentagenda :[]
}

const mutations = {
    addAgenda(state, agenda) {
        state.agendas[agenda.id] = agenda;
        return state;
    },
    remove(state, agendaId) {
        delete state.agendas[agendaId];
        return state;
    },
    addRecentAgenda(state, agendaId){
        state.recentagenda.push(agendaId);
        return state;
    },

    removeRecentAgenda(state, agendaId){
         state.recentagenda= state.recentagenda.filter(agenda => agenda != agendaId);
        return state;
    },
    setRecentAgendas(state,recentAgenda){

        state.recentagenda=recentAgenda;
        return state;
    }

}
const plugin = store => {
    
    let recentagendaid = localStorage.getItem('recentAgenda');
    store.commit("agenda/setRecentAgendas",recentagendaid);
    recentagendaid.array.forEach(element => {
        console.log(element);
        service.get(element).then((result)=>{
        
            store.commit("agenda/addAgenda", result);
                
            
        }).catch((err)=>{
            console.error(err);
        })
        
    });
    
    
}

const actions = {
    createAgenda(store, agenda) {
        return service.create(agenda).then((result) => {
            console.log('Created agenda : ' + result.id);
            store.commit("agenda/addRecentAgenda", result.id);
            store.commit("agenda/addAgenda", result);
            localStorage.setItem('recentAgenda', agenda.recentagenda);
            return result;
        });
    }
}

export default {namespaced: true, state, mutations, actions, plugins:[plugin] }