import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../Styles/searchbox.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const SearchBoxDrop: React.FC = () => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [travelDate, setTravelDate] = useState<Date>(new Date());
  const [passengers, setPassengers] = useState<number>(1);
  const [errors, setErrors] = useState({
    from: "",
    to: "",
    travelDate: "",
    passengers: "",
  });

  let navigate = useNavigate();

  const validate = () => {
    const validCities = ["mumbai", "delhi", "bangalore", "chennai", "kolkata","hyderabad", "ahmedabad", "pune", "jaipur","goa"];
    // TODO: Add validation logic for all the states
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(travelDate);

    const newErrors = {
      from: "",
      to: "",
      travelDate: "",
      passengers: "",
    };
    const fromCity = from.trim().toLowerCase();
    const toCity = to.trim().toLowerCase();

   if (fromCity.length === 0) {
    newErrors.from = "Please enter a departure city";
  } else if (!validCities.includes(fromCity)) {
    newErrors.from = "Enter a valid departure city";
  }
  if (toCity.length === 0) {
    newErrors.to = "Please enter a destination city";
  } else if (!validCities.includes(toCity)) {
    newErrors.to = "Enter a valid destination city";
  }
  if (selectedDate < today) {
    newErrors.travelDate = "Travel date cannot be in the past";
  }

  if (!passengers || isNaN(passengers) || passengers <= 0) {
    newErrors.passengers = "Enter a valid number of passengers";
  }
  
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (!hasErrors) navigateToFlightBooking();
  };

  const navigateToFlightBooking = () => {
    navigate(
      `/flight-booking?from=${from}&to=${to}&travelDate=${travelDate.toDateString()}&passengers=${passengers}`
    );
  };

  return (
    <Container fluid className="flight-search-container">
      <Row className="justify-content-center">
        <Col lg={10} md={11} sm={12}>
          <div className="p-3 bg-white rounded shadow search-box">
            <Row className="text-center mb-3">
              <Col md={4} xs={12}>
                <h6>Book a Flight</h6>
              </Col>
              <Col md={4} xs={12}>
                <h6>Check-in</h6>
              </Col>
              <Col md={4} xs={12}>
                <h6>My Booking</h6>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md={3} xs={12}>
                <Form.Control
                  placeholder="From*"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  isInvalid={!!errors.from}
                />
                <Form.Text className="text-danger">{errors.from}</Form.Text>

              </Col>

              <Col md="auto" xs={12} className="d-flex justify-content-center">
                <Button
                  variant="outline-secondary"
                  className={
                    isSwapping ? "swap-button rotating" : "swap-button"
                  }
                  onClick={() => {
                    const tempFrom = from;
                    setFrom(to);
                    setTo(tempFrom);

                    setIsSwapping(true);
                    setTimeout(() => setIsSwapping(false), 500);
                  }}
                >
                  <i className="bi bi-arrow-left-right"></i>
                </Button>
              </Col>

              <Col md={3} xs={12}>
                <Form.Control
                  placeholder="To*"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  isInvalid={!!errors.to}
                />
                <Form.Text className="text-danger">{errors.to}</Form.Text>
              </Col>

              <Col md={3} xs={12}>
                <Form.Control
                  type="date"
                  placeholder="travel date"
                  value={travelDate.toISOString().split("T")[0]}
                  onChange={(e) => setTravelDate(new Date(e.target.value))}
                  isInvalid={!!errors.travelDate}
                />
                <Form.Text className="text-danger">
                  {errors.travelDate}
                </Form.Text>
              </Col>

              <Col md={2} xs={12}>
                <Form.Control
                  placeholder="passengers"
                  type="number"
                  min={1}
                  max={9}
                  value={passengers}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      setPassengers(Math.max(1, Math.min(value, 9)));
                    } else {
                      setPassengers(1);
                    }
                  }}
                />
                <Form.Text className="text-danger">
                  {errors.passengers}
                </Form.Text>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button onClick={validate} className="btn-orange shadow">
                  Search Flight
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBoxDrop;
