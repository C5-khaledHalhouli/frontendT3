import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const SignUp = ({ showSignUp, setShowSignUp }) => {
  const handleClose = () => setShowSignUp(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [massage, setMassage] = useState("");
  const [role, setRole] = useState("")

  const signUpClick = () => {
    axios
      .post("https://t3-bookclub.herokuapp.com/user", {
        userName,
        password,
        email,
        role: role,
      })
      .then((result) => {
        console.log(result);

        setMassage("create account successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      handleClose();
    }, 2000);
  };
  return (
    <Modal show={showSignUp} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>userName </Form.Label>
            <Form.Control
              type="text"
              placeholder="user123"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Role</Form.Label>
            <div>
              <input type={"radio"} id="admin"  value={"62e30ce21c58074092b10225"} onClick={(e)=>{setRole(e.target.value)}} name="role"/>
              <label for="admin">Admin</label>
              <input type={"radio"} id="user"  name="role" value={"62dee1336f963dac570dbe6d"} onClick={(e)=>{setRole(e.target.value)}}/>
              <label for="user">User</label>
            </div>
          </Form.Group>
        </Form>
        {massage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={signUpClick}>
          SignUp
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUp;
