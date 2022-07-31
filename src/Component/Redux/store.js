import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Reducers/logIn/index"
import bookReducer from "./Reducers/book";
import roomReducer from "./Reducers/room";
import commentReducer from "./Reducers/comment/index"
export default configureStore({
reducer:{
login:loginReducer,
book:bookReducer,
room:roomReducer,
comment:commentReducer
}
})