import {
  getAllComment,
  addCommentAction,
} from "../Redux/Reducers/comment/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const RoomPage = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const [comment, setComment] = useState("");
  const [book, setBook] = useState("");

  const state = useSelector((state) => {
    return {
      rooms: state.room.rooms,
      comments: state.comment.comments,
      token: state.login.token,
      userName: state.login.userName,
    };
  });
  useEffect(() => {
    axios
      .get(`https://t3-bookclub.herokuapp.com/room/${bookId}`)
      .then((result) => {
        setBook(result.data[0].book.bookName);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://t3-bookclub.herokuapp.com/comment/${bookId}`)
      .then((result) => {
        dispatch(getAllComment(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const addcommentClick = () => {
    axios
      .post(
        `https://t3-bookclub.herokuapp.com/comment`,
        {
          book: bookId,
          comment: comment,
        },
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch(
          addCommentAction({ comment, user: { userName: state.userName } })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="roomBookPage">
      <div className="commentDiv">
        {book && <h3 className="roomTitle">{book} room</h3>}
        {state.comments.length === 0 ? (
          <h3>No Comments</h3>
        ) : (
          state.comments.map((element, index) => {
            return (
              <Card className="commitDiv" key={index + "comment"}>
                <Card.Header className="headerCommint">
                  {element.user.userName}
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>{element.comment}</p>
                  </blockquote>
                </Card.Body>
              </Card>
            );
          })
        )}
        <Card className="cardAddDiv">
          <Card.Header className="headerAdd">Add comment</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <input
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                type="text"
                className="inputAddComment"
              />
            </blockquote>
            <Button
              variant="outline-success"
              onClick={addcommentClick}
              className="addButton"
            >
              Add comment
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default RoomPage;
