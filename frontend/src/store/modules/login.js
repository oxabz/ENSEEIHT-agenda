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
        return feathersClient.reAuthenticate()
            .catch(()=>feathersClient.authenticate({
                'strategy': 'jwt',
                'accessToken': accessToken
            })).then(() => {
                commit('login')
            });
    }
    
};

const plugin = (store)=>{
    feathersClient.reAuthenticate()
        .then(()=>{
            store.commit('login/login');
        }).catch(()=> {
            store.commit('login/logout');
        })
}

export default {namespaced: true ,state, mutations, actions, plugin};