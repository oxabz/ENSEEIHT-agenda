import { Application } from '../declarations';
import agenda from './agenda/agenda.service';
import entry from './entry/entry.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(agenda);
  app.configure(entry);
}
