const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: { // Cross-origin resource sharing (CORS)
      cors: {
        origin: ['*'],
      },
    },
  });

  // setting route server dengan route yang sudah dibuat
  server.route(routes);

  await server.start();

  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
