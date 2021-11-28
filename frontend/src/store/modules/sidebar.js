const state = {
    selectedMenu: null
};

const mutations = {
    open(state, menu) {
        state.selectedMenu = menu;
        return state;
    },
    close(state) {
        state.selectedMenu = null;
        return state;
    }
};

const actions = {};

export default {namespaced: true ,state, mutations, actions};