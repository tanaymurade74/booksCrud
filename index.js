const mongoose = require("mongoose")
const express = require("express")
const app = express();

const Book = require("./models/books.models");
const {initializeDatabase} = require("./db/db.connect");

initializeDatabase();

app.use(express.json());


async function createBook(book){
    try{
        const newBook = new Book(book);
        const saveBook = await newBook.save();
        return saveBook;
    }catch(error){
        throw error;
    }
}

async function getAllBooks(){
    try{
        const books = await Book.find();
        return books;
    }catch(error){
        throw error
    }
}

async function getByTitle(title){
    try{
        const book = await Book.find({title: title});
        return book;
    }catch(error){
        throw error;
    }
}

async function getByAuthor(author){
    try{
        const books = await Book.find({author: author})
        return books
    }catch(error){
        throw error;
    }
}

async function getByGenre(genre){
    try{
        const books = await Book.find({genre: genre});
        return books
    }catch(error){
        throw error;
    }
}

async function getByPublishedYear(year){
    try{
        const books = await Book.find({publishedYear: year})
        return books;
    }catch(error){
        throw error;
    }
}


async function updateById(id, dataToUpdate){
    try{
        const updatedBook = await Book.findByIdAndUpdate(id, dataToUpdate, {new: true});
        return updatedBook;
    }catch(error){
        throw error;
    }
}
async function updateByTitle(title, dataToUpdate){
    try{
        const updatedBook = await Book.findOneAndUpdate({title: title}, dataToUpdate, {new: true});
        return updatedBook;
    }catch(error){
        throw error;
    }
}


async function deleteById(id){
    try{
        const deletedBook = await Book.findByIdAndDelete(id);
        return deletedBook;
    }catch(error){
        throw error;
    }
}


app.get("/books", async (req, res)=>{
    try{
        const books = await getAllBooks();
        if(!books){
            res.status(404).json({error: "Books not found"})
        }else{
            res.status(200).json(books);
        }
    }catch{
        res.status(500).json({error: "Error while fetching the data"})
    }
})


app.post("/books", async (req, res)=>{
    try{
        const newBook = req.body;
        if(!newBook.title || !newBook.author || !newBook.publishedYear || !newBook.genre || !newBook.language 
            || !newBook.country || !newBook.rating || !newBook.summary || !newBook.coverImageUrl){

                res.status(400).json({error: "All fields are mandatory"});
            }
        const book = await createBook(req.body);

        res.status(201).json({message: "Book has been created", book: newBook})
    }catch{
        res.status(500).json({error: "Error while creating book"})
    }
})

app.get("/books/title/:title", async (req, res)=>{
    try{
        const book = await getByTitle(req.params.title);
        if(!book){
            res.status(404).json({error : "Book not found"})
        }else{
            res.status(200).json(book);
        }
    }catch{
        res.status(500).json({error : "Error while fetching the data"})
    }
})

app.get("/books/author/:author", async (req, res)=>{
    try{
        const books = await getByAuthor(req.params.author)
        if(!books){
            res.status(404).json({error :"Books not found"})
        }else{
            res.status(200).json(books);
        }
    }catch{
        res.status(500).json({error : " Error while fetching the data"})
    }
})


app.get("/books/genre/:genre", async (req, res)=>{
    try{
        const books = await getByGenre(req.params.genre)
        if(!books){
            res.status(404).json({error: "Books not found"})
        }else{
            res.status(200).json(books);
        }
    }catch{
        res.status(500).json({error : " Error while fetching the data"})
    }
})

app.get("/books/publishedYear/:publishedYear", async (req, res)=>{
    try{
        const books = await getByPublishedYear(req.params.publishedYear)
        if(!books){
            res.status(404).json({error: "Books not found"})
        }else{
            res.status(200).json(books);
        }
    }catch{
        res.status(500).json({error : " Error while fetching the data"})
    }
})

app.post("/books/:bookId", async (req, res)=>{
    try{
        const newBook = req.body;
        
        
            const updatedBook = await updateById(req.params.bookId, newBook);
            if(!updatedBook){
                res.status(404).json("Book not found")
            }else{
            res.status(200).json({message: "Book has been updated", book: updatedBook});
            }
    }catch{
        res.status(500).json({error : "Failed to update"})
    }
})


app.post("/books/title/:title", async (req, res)=>{
    try{
        const newBook = req.body;

       
        const updatedBook = await updateByTitle(req.params.title, newBook);
        if(!updatedBook){
            res.status(404).json({error: "Book not found"})
        }else{
            res.status(200).json({message: "Book has been updated", book: updatedBook})
        }    
    }catch{
        // res.status(500).json({error: "Failed to update Book"})
    }
})

app.delete("/books/:bookId", async (req, res)=>{
    try{
        const deletedBook = await deleteById(req.params.bookId);
        if(!deletedBook){
            res.status(404).json({error : "Book not found"})
        }else{
            res.status(200).json({message : "Book deleted.", book: deletedBook})
        }
    }catch{
        res.status(500).json({error : "Failed to delete."})
    }
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("Server is running on port 3000")
})

