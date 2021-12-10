const state = {
    selectedMenu: null,
    menuProps:{}
};

const mutations = {
    open(state, menu) {
        state.menuProps = {};
        state.selectedMenu = menu;
        return state;
    },
    openWithProps(state, {menu,props}) {
        state.menuProps = props;
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