import { HookContext } from '../../app';
import hooks from '../../utils/hooks';

export default {
  before: {
    all: [
      hooks.optionalAuthenticate,
    ],
    find: [
      async (ctx: HookContext)=>{
        if(!ctx.params.query?.agendaId)throw Error('An agendaId is required');
        const agendaId = ctx.params.query.agendaId;
        const agenda = await ctx.app.service('agenda').get(agendaId);
        if(!agenda.userId)return;
        if(agenda.userId == ctx.params?.authentication?.payload.sub) throw new Error('Cant querry agendas that dont belong to you');
      },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
