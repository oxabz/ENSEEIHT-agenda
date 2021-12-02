import feathersClient from "../../feathers-client";

const state = {
    login: false,
}

const mutations = {
    login(state) {
        state.login = true;
    },
    logout(state) {
        state.login = false;
    }

}

const actions = {
    login({commit}, accessToken){
        return feathersClient.authenticate({
            'strategy': 'jwt',
            'accessToken': accessToken
        }).then(() => {
            commit('login')
        })
    }
    
};

export default {namespaced: true ,state, mutations, actions};