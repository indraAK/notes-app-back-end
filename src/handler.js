const { nanoid } = require('nanoid');
const notes = require('./notes');

// Hanlder untuk menambahkan data note
const addNoteHanlder = (request, h) => {
   const { title = 'untitled', tags, body } = request.payload;

   const id = nanoid(16); // generate id secara uniq
   const createdAt = new Date().toISOString();
   const updatedAt = createdAt;

   const newNote = {
      id, title, tags, body, createdAt, updatedAt
   }

   notes.push(newNote);

   const isSuccess = notes.filter(note => note.id === id).length > 0;

   // response jika newNote berhasil ditambahkan
   if (isSuccess) {
      const response = h.response({
         status: 'success',
         message: 'Catatan berhasil ditambahkan',
         data: {
            noteId: id
         }
      });

      response.code(200);
      return response;
   }

   // response jika newNote gagal ditambahkan
   const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
   });
   response.code(500);
   return response;
}

// Hanlder untuk mengambil data notes
const getAllNotesHanlder = () => ({
   status: 'success',
   data: { notes }
})

// Handler untuk mendapatkan data note berdasarkan id
const getNoteByIdHandler = (request, h) => {
   const { id } = request.params;

   const note = notes.filter(note => note.id === id)[0];

   if (note !== undefined) {
      return {
         status: 'success',
         data: { note }
      }
   }

   const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan!'
   });
   response.code(404);
   return response;
}

// Handler untuk mengedit data note berdasarkan id
const editNoteByIdHandler = (request, h) => {
   const { id } = request.params;
   const { title, body, tags } = request.payload;
   const updatedAt = new Date().toISOString();

   const index = notes.findIndex(note => note.id === id);

   if (index !== -1) {
      notes[index] = {
         ...notes[index],
         title,
         body,
         tags,
         updatedAt
      }

      const response = h.response({
         status: 'success',
         message: 'Catatan berhasil diperbarui'
      });
      response.code(200);
      return response;
   }

   const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
   });
   response.code(404);
   return response;
}

// Hanlder untuk menghapus data note berdasarkan id
const deleteNoteByIdHandler = (request, h) => {
   const { id } = request.params;

   const index = notes.findIndex((note) => note.id === id);

   if (index !== -1) {
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
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
   });
   response.code(404);
   return response;
}

module.exports = {
   addNoteHanlder,
   getAllNotesHanlder,
   getNoteByIdHandler,
   editNoteByIdHandler,
   deleteNoteByIdHandler
};