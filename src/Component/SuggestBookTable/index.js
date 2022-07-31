import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"


const SuggestBook = () => {
  const [suggestBook, setSuggestBook] = useState("");

  useEffect(() => {
    axios
      .get("https://t3-bookclub.herokuapp.com/suggestBooks")
      .then((result) => {
        console.log(result);
        setSuggestBook(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="adminPage">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Name</th>
            <th>UserName</th>
          </tr>
        </thead>
        <tbody>
          {suggestBook &&
            suggestBook.map((element, index) => {
              return (
                <tr key={index + "SuggestBook"}>
                  <td>{index}</td>
                  <td>{element.bookName}</td>
                  <td>{element.user.userName}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default SuggestBook;
