const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  // membuat validation untuk penambahan note
  try {
    const { title, tag, body } = request.payload;

    // validation title, tag, body tidak boleh kosong salah satunya
    if (!title || !tag || !body) {
      throw new Error();
    }

    // membuat id unix dengan pihak ketika
    const id = nanoid(16);
    const createdAT = new Date().toISOString();
    const updatedAT = createdAT;

    // buat variabel untuk menampung data terlebih dahulu.
    const newNote = {
      title, tag, body, id, createdAT, updatedAT,
    };

    // masukan data baru ke array notes.
    notes.push(newNote);

    // lakukan pengecekan apakah data sudah masuk atau belum, kita bisa mengeceknya dengan filter.
    const isSucces = notes.filter((note) => note.id === id).length > 0;

    // validation apakah berhasil atau tidak
    if (!isSucces) {
      throw new Error();
    }

    // lakukan respon terhadap data masuk apakah berhasil atau tidak
    if (isSucces) {
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId: id,
        },
      });
      response.code(201);
      return response;
    }
  } catch (error) {
    // buat respon jika data catatan gagal ditambahkan
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};

// Tidak diperlukan parameter karna perlu mengembalikan semua data yang ada.
const getAllNoteHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getByIdNoteHandler = (request, h) => {
  const { id } = request.params; // mengambil data id yang di request

  // buat variabel baru untuk filter apakah ada data dengan id yang diminta.
  const note = notes.filter((n) => n.id === id)[0];

  // jika ada data id yang diminta maka beri respon dengan membawa data yang diminta
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  // jika data tidak ditemukan maka beri respon sebagai berikut.
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak dapat ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  // ambil id note terlebih dahulu
  const { id } = request.params;

  // ambil data title, tags, body yang sudah ada
  const { title, tag, body } = request.payload;

  const updatedAT = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
  // jika index tidak ditemukan maka berindex -1 maka kita cek apakah index tidak -1
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tag,
      body,
      updatedAT,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui!',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbaharui catatan, Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteNoteByIdHendler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    // untuk menghapus array berdasarkan index bisa menggunakan method splice
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Notes gagal untuk dihapus, Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler, getAllNoteHandler, getByIdNoteHandler, editNoteByIdHandler, deleteNoteByIdHendler,
};
