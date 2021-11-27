import feathersClient from "../../feathers-client";

const service = feathersClient.service('agenda');

const state = {
    agendas: {}
}

const mutations = {
    addAgenda(state, agenda) {
        state.agendas[agenda.id] = agenda;
        return state;
    },
    remove(state, agendaId) {
        delete state.agendas[agendaId];
    }
}

const actions = {
    createAgenda(ignore, agenda) {
        return service.create(agenda).then((result) => {
            console.log('Created agenda : ' + result.id);
            return result;
        });
    }
}

export default {namespaced: true, state, mutations, actions }