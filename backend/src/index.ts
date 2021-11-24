import logger from './logger';
import app from './app';
import {Application} from './declarations';


app.then((app:Application)=>{
  const port = app.get('port');
  const server = app.listen(port);
  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  );
});


