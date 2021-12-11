import { BadRequest, Forbidden } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import hooks from '../../utils/hooks';


export default {
  before: {
    all: [
      hooks.optionalAuthenticate,
    ],
    find: [
      async (ctx: HookContext)=>{
        if(!ctx.params.query?.agendaId)throw new BadRequest('An agendaId is required');
        const agendaId = ctx.params.query.agendaId;
        const agenda = await ctx.app.service('agenda').get(agendaId);
        if(!agenda.userId)return;
        if(agenda.userId == ctx.params?.authentication?.payload.sub) throw new Forbidden('Cant querry agendas that dont belong to you');
        return ctx;
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
