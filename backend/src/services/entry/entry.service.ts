// Initializes the `entry` service on path `/entry`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Entry } from './entry.class';
import createModel from '../../models/entry.model';
import hooks from './entry.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'entry': Entry & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/entry', new Entry(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('entry');

  service.hooks(hooks);
}
