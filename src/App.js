import "./App.css";
import React, {  useEffect } from "react";
import MainPage from "./Component/MainPage";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Component/NavBar/NavBar";
import BookPage from "./Component/BookPage";
import Room from "./Component/Room/index";
import ReadingListPage from "./Component/ReadingListPage/index";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./Component/Redux/Reducers/logIn/index";
import { getAllBooks,getReader } from "./Component/Redux/Reducers/book/index";
import AdminPage from "./Component/AdminPage/index"
import {getAllRooms} from "./Component/Redux/Reducers/room/index"
import RoomTable from "./Component/RoomTable";
import axios from "axios";
import SuggestBook from "./Component/SuggestBookTable";
import RoomPage from "./Component/RoomPage";


function App() {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.login.token,
      role:state.login.role
    };
  });
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      dispatch(loginAction(JSON.parse(localStorage.getItem("token"))));
    }
    axios
      .get("https://t3-bookclub.herokuapp.com/book")
      .then((result) => {
        dispatch(getAllBooks(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
      
    axios
      .get("https://t3-bookclub.herokuapp.com/book/readers/", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
       
       dispatch(getReader(result.data))
      })
      .catch((err) => {
        console.log(err);
      });
      axios
      .get("https://t3-bookclub.herokuapp.com/room")
      .then((result) => {
       dispatch(getAllRooms(result.data))
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div className="App">
      
        <NavBar />
        <Routes>
          
          {state.role==="admin"?<>
          <Route path="/"  element={<AdminPage/>}/>
          <Route path="/admin/room"  element={<RoomTable/>}/>
          <Route path="/admin/suggestbook"  element={<SuggestBook/>}/>
          </>:<>
          <Route path="/" element={<MainPage />} />
          <Route path="/:bookId" element={<BookPage />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/readinglist" element={<ReadingListPage />} />
          <Route path="/room/:bookId"  element={<RoomPage/>}/>
          </>}
          


        </Routes>
      
    </div>
  );
}

export default App;
