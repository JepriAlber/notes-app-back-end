const { addNoteHandler, getAllNoteHandler, getByIdNoteHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler, // masukan hendler yang telah kita buat tadi di hendler.js
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getByIdNoteHandler,
  },
];

module.exports = routes;
