import { HookContext } from '../../app';

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
      (ctx:HookContext)=>{
        ctx.result.data = ctx.result.data.map((agenda:any)=>!agenda.userId ||agenda.userId==ctx.params.authentication?.payload.sid);
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
