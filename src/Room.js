import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

export default function Room(props) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  //Simple useEffect to fetch data by Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${props.id}`
        );
        setRooms(response.rooms);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [props.id]);
  //Function to filter rooms by adults and children
  function searchByPeople(rows) {
    if (props.adults !== 0 || props.children !== 0) {
      return rows.filter(
        (row) =>
          row.occupancy.maxAdults >= props.adults &&
          row.occupancy.maxChildren >= props.children
      );
    }
    return rows;
  }
  return (
    <div>
      {loading ? (
        <div className="text-center">Loading ...</div>
      ) : (
        <div className="mb-4">
          {/* DISPLAYING ROOMS based on filter -> selected number of adults and children */}
          {searchByPeople(rooms).map((item) => (
            <Row key={item.id} className="p-2 border  border-dark">
              <Col className="col-3 text-start">
                <h4>{item.name}</h4>
                <p>Adults: {item.occupancy.maxAdults}</p>
                <p>Children: {item.occupancy.maxChildren}</p>
              </Col>
              <Col className="col-9 text-start">
                <p>{item.longDescription}</p>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
}
