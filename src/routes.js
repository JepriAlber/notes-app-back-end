const { addNoteHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler, // masukan hendler yang telah kita buat tadi di hendler.js
  },
];

module.exports = routes;
