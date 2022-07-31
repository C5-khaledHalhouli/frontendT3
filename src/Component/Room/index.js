import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom"
import "./style.css"

const Room = () => {
  const [room, setRoom] = useState("");
  useEffect(() => {
    axios
      .get("https://t3-bookclub.herokuapp.com/room")
      .then((result) => {
        setRoom(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="roomPage">
    {room&&room.map((element,index)=>{
        return <Card className="roomsCard">
        <Card.Header>Room {index}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <Link to={`/room/${element._id}`}>
              {element.book.bookName}
             
            </Link >
            
          </blockquote>
        </Card.Body>
      </Card>
    })}
  </div>
};
export default Room
