import { createSlice } from "@reduxjs/toolkit";

const book = createSlice({
  name: "book",
  initialState: {
    books: [],
    readingListBook: [],
  },
  reducers: {
    getAllBooks(state, action) {
      state.books = action.payload;
    },
    //   payload array of readingList
    addReadingListBook(state, action) {
      state.readingListBook = action.payload;
    },
    // payload id of readingbook
    deleteBookReadingList(state, action) {
      state.readingListBook = state.readingListBook.filter((element) => {
        return element._id !== action.payload;
      });
    },
    getReader(state, action) {
      
      state.books.forEach((elementBook, index) => {
        let numReader = action.payload.result.filter((element) => {
          return elementBook._id === element.book;
        }).length;
        state.books[index].reader = numReader;
        
      });
    },
    deleteBook(state,action){
      state.books=state.books.filter((element)=>{
        return element._id!==action.payload
      })
    },
    addBook(state,action){
      state.books=[...state.books,action.payload]
    }
  },
});

export const {
  addReadingListBook,
  deleteBookReadingList,
  getAllBooks,
  getReader,deleteBook,addBook
} = book.actions;
export default book.reducer;
