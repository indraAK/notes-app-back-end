const {
   addNoteHanlder,
   getAllNotesHanlder,
   getNoteByIdHandler,
   editNoteByIdHandler,
   deleteNoteByIdHandler
} = require('./handler');

const routes = [
   {
      path: '/notes',
      method: 'POST',
      handler: addNoteHanlder
   },
   {
      path: '/notes',
      method: 'GET',
      handler: getAllNotesHanlder
   },
   {
      path: '/notes/{id}',
      method: 'GET',
      handler: getNoteByIdHandler
   },
   {
      path: '/notes/{id}',
      method: 'PUT',
      handler: editNoteByIdHandler
   },
   {
      path: '/notes/{id}',
      method: 'DELETE',
      handler: deleteNoteByIdHandler
   }
];

module.exports = routes;