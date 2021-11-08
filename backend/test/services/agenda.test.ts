import assert from 'assert';
import app from '../../src/app';

describe('\'agenda\' service', () => {
  it('registered the service', () => {
    const service = app.service('agenda');

    assert.ok(service, 'Registered the service');
  });
});
