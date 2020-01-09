'use strict';

const hapi = require('@hapi/hapi');
const util = require('util');
const fs = require('fs');
const path = require('path');

const readFile = util.promisify(fs.readFile);

const init = async () => {
  const server = hapi.server({
    port: 3100,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => readFile(path.resolve(__dirname, 'host-app-data.json'), 'utf8')
  });

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
