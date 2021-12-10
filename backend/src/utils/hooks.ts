import { authenticate } from '@feathersjs/authentication/lib/hooks';
import { HookContext } from '@feathersjs/feathers';


const hooks={
  async optionalAuthenticate(ctx: HookContext){
    try {
      return await authenticate('jwt')(ctx);
    } catch (error) {
      console.log(`Not authentified ${ctx.type}`);
      return ctx;
    }
  }
};

export default hooks;