import { useSelector, useDispatch } from "react-redux/";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { deleteBook, addBook } from "../Redux/Reducers/book/index";
import axios from "axios";
import { deleteBookReadingList } from "../Redux/Reducers/book/index";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import UploadImg from "../UploadImg/index";
import "./style.css"

const AdminPage = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [bookName, setBookName] = useState("");
  const [author, setauthor] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const state = useSelector((state) => {
    return {
      books: state.book.books,
      token: state.login.token,
    };
  });
  const deleteClick = (bookId) => {
    dispatch(deleteBook(bookId));
    axios
      .delete(`https://t3-bookclub.herokuapp.com/book/${bookId}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
    axios
      .delete(`https://t3-bookclub.herokuapp.com/user/readinglist/${bookId}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        dispatch(deleteBookReadingList(bookId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addBookClick = () => {
    axios
      .post(
        `https://t3-bookclub.herokuapp.com/book`,
        { bookName:bookName, description:description, img: url, author:author },
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch(addBook(result.data))
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  return (
    <div className="adminPage">
      <Button variant="primary" onClick={handleShow}>
        Add book
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => {
                  setBookName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setauthor(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <UploadImg setUrl={setUrl} />
          {url&&<img src={url} className="img"/>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addBookClick}>
            Add Book
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book Image</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Description</th>
            <th>Reader</th>
            <th>Operater</th>
          </tr>
        </thead>
        <tbody>
          {state.books &&
            state.books.map((element, index) => {
              return (
                <tr key={index + "td"}>
                  <td>
                    <img
                      src={`${element.img}`}
                      alt={`img of ${element.bookName} book`}
                      className="img"
                    />
                  </td>
                  <td>{element.bookName}</td>
                  <td>{element.author}</td>
                  <td>{element.description}</td>
                  <td>{element.reader}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteClick(element._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
