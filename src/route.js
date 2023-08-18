const {saveHandler,showAllBooksHandler,getBookDetailByID,editBookByIdHandler,deleteBookByIdHandler} = require('./handler');

const routes = [
    {
        method : 'POST',
        path : '/books',
        handler : saveHandler,
    },
    {
        method : 'GET',
        path : '/books',
        handler : showAllBooksHandler,
    },
    {
        method : 'GET',
        path : '/books/{id}',
        handler : getBookDetailByID,
    },
    {
        method : 'PUT',
        path : '/books/{id}',
        handler : editBookByIdHandler,
    },
    {
        method : 'DELETE',
        path : '/books/{id}',
        handler : deleteBookByIdHandler,
    }
];

module.exports = routes;
