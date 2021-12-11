import feathersClient from "../../feathers-client";

const service = feathersClient.service('agenda');

const state = {
    agendas: {},
    recentagenda :[],
    myAgendas: []
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
    },
    addMyAgenda(state, agendaId){
        state.myAgendas.push(agendaId);
        return state;
    },
    removeMyAgenda(state, agendaId){
         state.myAgendas= state.myAgendas.filter(agenda => agenda != agendaId);
        return state;
    },
    setMyAgendas(state,myAgendas){

        state.myAgendas=myAgendas;
        return state;
    }

}
const plugin = store => {
    // Initializing Recent Agenda
    let recentagendaid = localStorage.getItem('recentAgenda');
    if(recentagendaid == 'undefined' || recentagendaid == null){
        recentagendaid=[]
    }
    else {
        recentagendaid = JSON.parse(recentagendaid)
    }
    Promise.all(recentagendaid.map(element => {
        return service.get(element).then((result)=>{
            store.commit("agenda/addAgenda", result);
            store.commit("agenda/addRecentAgenda", result.id);
        }).catch((err)=>{
            console.error(err);
        })
    })).then(()=>{
        localStorage.setItem('recentAgenda', JSON.stringify(store.state.agenda.recentagenda));
    });

    // Initializing My Agendas on login
    feathersClient.on('login',()=>{
        store.dispatch('agenda/queryMyAgenda');
    })

    // Event reactivity
    service.on('created', (agenda)=>{
        if(agenda.userId == store.login.self){
            store.commit("agenda/addAgenda", agenda);
            store.commit('agenda/addMyAgenda', agenda.id);
        }
    }) 
    service.on('removed', (agenda)=>{
        store.commit("agenda/remove", agenda.id);
        store.commit('agenda/removeMyAgenda', agenda.id);
        store.commit('agenda/removeRecentAgenda', agenda.id);
        localStorage.setItem('recentAgenda', JSON.stringify(store.state.agenda.recentagenda));
    }) 
}

const actions = {
    createAgenda(store, agenda) {
        return service.create(agenda).then((result) => {
            console.log('Created agenda : ' + result.id);
            store.commit("addRecentAgenda", result.id);
            store.commit("addAgenda", result);
            localStorage.setItem('recentAgenda', JSON.stringify(store.state.recentagenda));
            return result;
        });
    },
    queryMyAgenda(store) {
        const query = {
            userId:'self'
        }
        return service.find({
            query
        }).then(res=>{
            res.data.forEach(agenda => {
                store.commit("agenda/addAgenda", agenda);
                store.commit('agenda/addMyAgenda', agenda.id);
            });
        }).catch(()=>[]);
    },
}

export default {namespaced: true, state, mutations, actions, plugin }