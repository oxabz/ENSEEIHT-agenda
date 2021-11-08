// Initializes the `agenda` service on path `/agenda`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Agenda } from './agenda.class';
import createModel from '../../models/agenda.model';
import hooks from './agenda.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'agenda': Agenda & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/agenda', new Agenda(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('agenda');

  service.hooks(hooks);
}
