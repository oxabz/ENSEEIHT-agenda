import { HookContext } from '@feathersjs/feathers';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      async (context:HookContext)=>{
        context.result.data = context.result.data.filter((agenda:any)=>!agenda.userId ||agenda.userId==context.params.authentication?.payload.sid);
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
