import feathersClient from "../../feathers-client";

const state = {
    login: false,
    user: undefined
}

const mutations = {
    login(state, user) {
        state.login = true;
        state.user = user;
    },
    logout(state) {
        state.login = false;
        state.user = undefined;
    }

}

const actions = {
    login({commit}, accessToken){
        return feathersClient.authenticate({
            'strategy': 'jwt',
            'accessToken': accessToken
        }).then((authInfo) => {
            commit('login', authInfo.user)
        })
    }
    
};

export default {namespaced: true ,state, mutations, actions};