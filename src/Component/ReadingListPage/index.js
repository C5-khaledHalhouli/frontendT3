import axios from "axios";
import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux/";
import { addReadingListBook,deleteBookReadingList } from "../Redux/Reducers/book";
import Button from 'react-bootstrap/Button';
import "./style.css";

const ReadingListPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      userName: state.login.userName,
      isLoggedIn: state.login.isLoggedIn,
      token: state.login.token,
      readingListBook: state.book.readingListBook,
    };
  });

  useEffect(() => {
    axios
      .get("https://t3-bookclub.herokuapp.com/user/readinglist", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
      
        dispatch(addReadingListBook(result.data.result));
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.token]);

  const deleteClick=(readingListId)=>{
    axios.delete(`https://t3-bookclub.herokuapp.com/user/readinglist/${readingListId}`,{
      headers: { Authorization: `Bearer ${state.token}` }}).then((result) => {
      
      dispatch(deleteBookReadingList(readingListId))
      
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="readingListPage">
      {state.readingListBook.length &&
        state.readingListBook.map((element, index) => {
          
          return (
            <div className="cardbook" key={index + "readingBook"}>
              <img src={`${element.book.img}`} className="imgReadingList" />
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>{element.book.bookName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {element.book.author}
                  </Card.Subtitle>
                  <Card.Text>{element.book.description}</Card.Text>
                  <Button variant="primary" onClick={()=>{
                    
                    deleteClick(element._id)
                  }}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </div>
  );
};
export default ReadingListPage;
