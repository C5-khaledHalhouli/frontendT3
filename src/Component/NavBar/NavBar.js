import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../Login/index";
import React, { useState, useEffect } from "react";
import SignUp from "../SignUp/index";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutAction } from "../Redux/Reducers/logIn/index";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./style.css"

const NavBar = () => {
  const [showMod, setShowMod] = useState(false);
  const [show, setShow] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [suggestBook, setSuggestBook] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      userName: state.login.userName,
      isLoggedIn: state.login.isLoggedIn,
      token: state.login.token,
      role: state.login.role,
    };
  });

  const handleClose = () => setShowMod(false);
  const handleShow = () => setShowMod(true);

  const signOut = () => {
    dispatch(signOutAction());

    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("token");
    navigate("/")
    window.location.reload()
  };

  const suggestClick = () => {
    axios
      .post(
        `https://t3-bookclub.herokuapp.com/suggestBooks`,
        {
          bookName: suggestBook,
        },
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  return (
    <>
      <Modal show={showMod} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Suggest Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => {
                  setSuggestBook(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={suggestClick}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar key={"sm"}  expand={"sm"} className="mb-3">
        <Container fluid>
          <Navbar.Brand>Club-Book</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"sm"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"sm"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              {state.role !== "admin" ?<>
              <Nav.Link
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/rooms");
                  }}
                >
                  Room
                </Nav.Link>
              </>:<>
              </>}
              {state.role === "admin" ?<>
              <NavDropdown
                  title={`Tables`}
                  id={`offcanvasNavbarDropdown-expand-${"sm"}`}
                >
                  <NavDropdown.Item
                            onClick={() => {
                              navigate("/");
                            }}
                          >
                            Books Table
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => {
                              navigate("/admin/room");
                            }}
                          >
                            Rooms Table
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => {
                              navigate("/admin/suggestbook");
                            }}
                          >
                            Suggest Book Table
                          </NavDropdown.Item>
                </NavDropdown>
              </>:<>
              </>}
                
                <NavDropdown
                  title={`${state.userName}`}
                  id={`offcanvasNavbarDropdown-expand-${"sm"}`}
                >
                  {state.isLoggedIn ? (
                    <>
                      {state.role === "user" ? (
                        <>
                          <NavDropdown.Item
                            onClick={() => {
                              navigate("/readinglist");
                            }}
                          >
                            Reading list
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            onClick={() => {
                              handleShow();
                            }}
                          >
                            Suggest Book
                          </NavDropdown.Item>
                        </>
                      ) : (
                        <></>
                      )}

                      <NavDropdown.Item
                        onClick={() => {
                          signOut();
                        }}
                      >
                        SignOut
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        SignIn
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          setShowSignUp(true);
                        }}
                      >
                        SignUp
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Nav>
             
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Login show={show} setShow={setShow} />
      <SignUp showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
    </>
  );
};

export default NavBar;
