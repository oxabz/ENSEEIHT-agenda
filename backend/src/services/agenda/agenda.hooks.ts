import { Forbidden, NotAuthenticated } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import hooks from '../../utils/hooks';

export default {
  before: {
    all: [hooks.optionalAuthenticate],
    find: [
      async (context:HookContext)=>{
        if(context.params.query?.userId != 'self')return;
        if(!context.params.authenticated) throw new NotAuthenticated('Cant use "self" when you are not authenticated');
        context.params.query.userId = context.params.authentication?.payload.sub;
        return context;
      }],
    get: [],
    create: [
      async (context:HookContext)=>{
        if(!context.data.userId)return;
        if(context.data.userId != 'self') throw new Forbidden('Cant create an agenda for an other user');
        if(!context.params.authenticated) throw new NotAuthenticated('Cant use "self" when you are not authenticated');
        context.data.userId = context.params.authentication?.payload.sub;
        return context;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      async (context:HookContext)=>{
        context.result.data = context.result.data.filter((agenda:any)=>!agenda.userId ||agenda.userId==context.params.authentication?.payload.sub);
        return context;
      }
    ],
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
