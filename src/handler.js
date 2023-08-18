const {nanoid} = require('nanoid');
const books = require('./books');

const saveHandler = (request,h) => {
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    const id = nanoid(16);

    const finished = (pageCount === readPage);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,name,year,author,summary,publisher,pageCount,readPage,finished,reading,insertedAt,updatedAt
    };

    if (name==undefined){
        const response = h.response({
            status : "fail",
            message : "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }else if(readPage>pageCount){
        const response = h.response({
            status : "fail",
            message : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }else{
        books.push(newBook)
        const response = h.response({
            status : "success",
            message : "Buku berhasil ditambahkan",
            data : {
                bookId : id,
                finished : (readPage==pageCount),
            },
        });
        response.code(201);
        return response;
    }
}

const showAllBooksHandler = (request,h) => {
    const reading = request.query.reading;
    const finished = request.query.finished;
    const name = request.query.name;
    if (reading==1){
        const beek = books.filter(book => (book.reading == 1 )).map(book => ({id : book.id, name : book.name, publisher : book.publisher})); 
        const response = h.response({ 
            status: 'success',
            data: {
                books : beek,
            },
          })
          return response;
    }else if(reading==0){
        const beek = books.filter(book => (book.reading == 0 )).map(book => ({id : book.id, name : book.name, publisher : book.publisher}));
        const response = h.response({ 
            status: 'success',
            data: {
                books : beek,
            },
          })
          return response;
    }
    if (finished==1){
        const beek = books.filter(book => (book.finished == 1 )).map(book => ({id : book.id, name : book.name, publisher : book.publisher}));
        const response = h.response({ 
            status: 'success',
            data: {
                books : beek,
            },
          })
          return response;
    }else if(finished==0){
        const beek = books.filter(book => (book.finished == 0 )).map(book => ({id : book.id, name : book.name, publisher : book.publisher}));
        const response = h.response({ 
            status: 'success',
            data: {
                books : beek,
            },
          })
          return response;
    }
    if (name!=undefined){
        const beek = books.filter(book => (book.name.toLowerCase().includes(name.toLowerCase()))).map(book => ({id : book.id, name : book.name, publisher : book.publisher}));
        const response = h.response({ 
            status: 'success',
            data: {
                books : beek,
            },
          })
          return response;
    }
    const beek = books.map(book => ({id : book.id, name : book.name, publisher : book.publisher}));
    const response = h.response({ 
    status: 'success',
    data: {
        books : beek,
        },
    })
    return response;    
    
}

const getBookDetailByID = (request,h) => {
    const {id} = request.params;
    const book = books.filter((n)=>n.id===id)[0];

    if(book != undefined){
        const response = h.response({
            status : 'success',
            data : {
                book,
            }
            
        });
        response.code(200);
        return response;    
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}

const editBookByIdHandler = (request,h) => {
    const {id} = request.params;

    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    
    const index = books.findIndex((book) => book.id ===id );
    // const insertedAt = books[index].insertedAt;
    if (name==undefined){
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }else if (readPage>pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });

        response.code(400);
        return response;
    }else if(index===-1){
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }else if (index!==-1){
        const updatedAt = new Date();
        const insertedAt = books[index].insertedAt;
        // if (id!=books[index][id]){
            //     response.source.id = id;
            
            // }
            // if (name!=books[index][name]){
        //     response.source.name=name;
            
        // }
        // if (year!=books[index][year]){
        //     response.source.year=year;
        // }
        // if (author!=books[index][author]){
        //     response.source.author=author;
        // }
        // if (summary!=books[index][summary]){
        //     response.source.summary=summary;
        // }
        // if (publisher!=books[index][publisher]){
        //     response.source.publisher=publisher;
        // }
        // if (pageCount!=books[index][pageCount]){
            //     response.source.pageCount=pageCount;
            // }
            // if (readPage!=books[index][readPage]){
                //     response.source.readPage=readPage;
                // }
                // if (reading!=books[index][reading]){
                    //     response.source.reading=reading;
                    // }
        books[index] = {
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished : (readPage==pageCount),
            reading,
            updatedAt,
            insertedAt,
        }
        const response = h.response({
            "status": "success",
            "message": "Buku berhasil diperbarui",
        })
        response.code(200);
        return response;
    }
}

const deleteBookByIdHandler = (request,h) => {
    const {id} = request.params;

    const index = books.findIndex((book) => book.id ===id);

    if (index!==-1){
        books.splice(index,1);

        const response = h.response({
            status : 'success',
            message : 'Buku berhasil dihapus'
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {saveHandler,showAllBooksHandler,getBookDetailByID,editBookByIdHandler,deleteBookByIdHandler};