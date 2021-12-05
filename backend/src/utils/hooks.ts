import { authenticate } from '@feathersjs/authentication/lib/hooks';
import { HookContext } from '../app';

const hooks={
  optionalAuthenticate(ctx: HookContext){
    try {
      authenticate('jwt')(ctx);
    } catch (error) {
      console.log(`Not authentified ${ctx.type}`);
    }
  }
};

export default hooks;