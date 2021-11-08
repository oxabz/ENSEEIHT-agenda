import assert from 'assert';
import app from '../../src/app';

describe('\'entry\' service', () => {
  it('registered the service', () => {
    const service = app.service('entry');

    assert.ok(service, 'Registered the service');
  });
});
