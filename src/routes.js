const {
  addNoteHandler,
  getAllNoteHandler,
  getByIdNoteHandler,
  editNoteByIdHandler,
  deleteNoteByIdHendler,
} = require('./handler');

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
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHendler,
  },
];

module.exports = routes;
