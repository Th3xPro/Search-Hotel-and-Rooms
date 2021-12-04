import React, { useState, useEffect } from "react";
import Room from "./Room";
import "./App.css";
//IMPORTANT TO IMPORT
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import SimpleImageSlider from "react-simple-image-slider";
const App = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  //States for selected number for adults and children
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);

  //States for StarRating
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  //Simple useEffect to fetch data by Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG"
        );
        setHotels(response);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  //Function to filter hotels by Stars
  function searchByStars(rows) {
    return rows.filter((row) => parseInt(row.starRating) >= rating);
  }
  return (
    <div>
      <div className="d-flex text-center justify-content-center">
        <Row className="w-25 shadow border border-2 border-dark ">
          <Col className="col-12 col-xl-4 ">
            <div className="star-rating mt-3">
              {/* DISPLAYING AND MANAGING STARS */}
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
          </Col>
          <Col className="col-12 col-xl-4">
            <i> Adults:</i>
            <div className="d-flex text-center justify-content-center">
              <button
                className="m-2 "
                value={adult}
                onClick={() => setAdult(adult + 1)}
              >
                +
              </button>
              <h5 className="text-center mt-2">{adult}</h5>
              <button
                className="m-2"
                value={adult}
                onClick={() => setAdult(adult === 0 ? adult : adult - 1)}
              >
                -
              </button>
            </div>
          </Col>
          <Col className="col-12 col-xl-4">
            Children :
            <div className="d-flex text-center justify-content-center">
              <button
                className="m-2"
                value={child}
                onClick={() => setChild(child + 1)}
              >
                +
              </button>
              <h5 className="text-center mt-2">{child}</h5>
              <button
                className="m-2"
                value={child}
                onClick={() => setChild(child === 0 ? child : child - 1)}
              >
                -
              </button>
            </div>
          </Col>
        </Row>
      </div>
      {loading ? (
        <div className="text-center">Loading ...</div>
      ) : (
        <Container className="col-12 w-50 mb-2 mt-5 text-center justify-content-center">
          {searchByStars(hotels).map((item, id) => (
            <div key={id}>
              {/* HOTEL INFO */}
              <Row className="p-3 border shadow border-2 border-dark bg-light">
                <Col className="col-3">
                  <SimpleImageSlider
                    width={150}
                    height={100}
                    images={item.images.filter((item) => {
                      return item.url;
                    })}
                    showBullets={true}
                  />
                </Col>
                <Col className="col-5 text-start">
                  <h4>{item.name}</h4>
                  <i>{item.address1}</i>
                  <br />
                  <i>{item.address2}</i>
                </Col>
                <Col className="col-4 text-end">
                  {[...Array(parseInt(item.starRating))].map((e, i) => (
                    <span
                      className="star text-wrap"
                      key={i}
                      style={{ fontSize: "40px", color: "#ffd700" }}
                    >
                      &#9733;
                    </span>
                  ))}
                </Col>
              </Row>
              <Row>
                {/* PASSING DATA TO CHILD TO DISPLAY ROOMS */}
                <Room id={item.id} adults={adult} children={child} />
              </Row>
            </div>
          ))}
        </Container>
      )}
    </div>
  );
};
export default App;
