const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tag, body } = request.payload;

  // membuat id unix dengan pihak ketika
  const id = nanoid(16);
  const createdAT = new Date().toISOString();
  const updatedAT = createdAT;

  const newNote = {
    title, tag, body, id, createdAT, updatedAT,
  };

  // masukan data baru ke array notes.
  notes.push(newNote);

  // lakukan pengecekan apakah data sudah masuk atau belum, kita bisa mengeceknya dengan filter.
  const isSucces = notes.filter((note) => note.id === id).length > 0;

  // lakukan respon terhadap data masuk apakah berhasil atau tidak
  if (isSucces) {
    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil ditambahakan!',
      data: {
        noteID: id,
      },
    });
    response.code = 201;
    return response;
  }

  // buat respon jika data catatan gagal ditambahkan
  const response = h.response({
    status: 'Fail',
    message: 'Catatan gagal ditambahkan!',
  });
  response.code = 500;
  return response;
};

module.exports = { addNoteHandler };
