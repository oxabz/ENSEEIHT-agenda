import express from '@feathersjs/express';
import { Application } from './declarations';

export default function(app:Application) : void{  
  app.use('/', express.static(app.get('public')+'/index.html'));
  app.use('/agenda/*', express.static(app.get('public')+'/index.html'));
  app.use('/auth', express.static(app.get('public')+'/index.html'));
  app.use('/about', express.static(app.get('public')+'/index.html'));
  app.use('/myAgendas', express.static(app.get('public')+'/index.html'));
  app.use('/login', express.static(app.get('public')+'/index.html'));
}