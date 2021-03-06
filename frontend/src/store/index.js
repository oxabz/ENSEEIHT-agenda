import { createStore } from 'vuex'
import agendaModule from './modules/agenda'
import entryModule from './modules/entry'
import sidebarModule from './modules/sidebar'
import loginModule from './modules/login'


export default createStore({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        agenda:agendaModule,
        entry:entryModule,
        sidebar:sidebarModule,
        login:loginModule
    },
    plugins:[
        loginModule.plugin,
        entryModule.plugin,
        agendaModule.plugin,
    ]
})
