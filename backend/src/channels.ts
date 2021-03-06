import '@feathersjs/transport-commons';
import { Application } from './declarations';

export default function(app: Application): void {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection: any): void => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult: any, { connection }: any): void => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    
    if(connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;
      
      // The connection is no longer anonymous, remove it
      //app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      //app.channel('authenticated').join(connection);

      // Channels can be named anything and joined on any condition 
      
      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection));
      
      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(connection);
      app.channel(`userIds/${authResult.user.id}`).join(connection);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /*app.publish((data: any, hook: HookContext) => {
    console.log(`Publishing ${hook.method} of ${hook.path} on anonymous`);
    return app.channel('anonymous');
  });*/

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  app.service('entry').publish(async(data: any, ) => {
    const agenda = await app.service('agenda').get(data.agendaId);
    if(!agenda.userId) return app.channel('anonymous');
    return app.channel(`userIds/${agenda.userId}`);
  });

  app.service('agenda').publish((data: any, ) => {
    if(!data.userId) return app.channel('anonymous');
    return app.channel(`userIds/${data.userId}`);
  });
  
  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
}
