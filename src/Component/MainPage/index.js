import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/";

const MainPage = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      books: state.book.books,
      token: state.login.token,
    };
  });

  const addToReadingListClick = (bookId) => {
    axios
      .post(
        `https://t3-bookclub.herokuapp.com/user/readinglist/${bookId}`,
        {},
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mainPage">
      {state.books &&
        state.books.map((element, index) => {
          return (
            <Card style={{ width: "18rem" }} key={index + "book"} className="cardBook">
               <Link to={`/${element._id}`}><Card.Img variant="top" src={`${element.img}`} alt={`img of ${element.bookName} book`}/></Link>
              <Card.Body>
                <Card.Title>{element.bookName}</Card.Title>
                <Card.Text>
                  {element.description.split(" ").slice(0, 20).join(" ")}...
                  <Link to={`/${element._id}`}>see more</Link>
                </Card.Text>
                {state.isLoggedIn ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      addToReadingListClick(element._id);
                    }}
                  >
                    Add to readingList
                  </Button>
                ) : (
                  <></>
                )}
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};
export default MainPage;
