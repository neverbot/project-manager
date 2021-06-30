import * as Logger from '../src/log.js';
import app from '../src/main.js';

before(async () => {
  Logger.log('Starting tests...');
  await app.init();
});

after(async () => {
  // await something.shutdown();
  Logger.log('Tests ended');
});
