import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Flight } from "../types/Flight";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { passengerDetails } from "../../store/bookingSlice";
import { Passenger } from "../types/Passenger";

const FlightSearch: React.FC = () => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [travelDate, setTravelDate] = useState<Date>(new Date());
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [matchFlights, setMatchingFlights] = useState<Flight[]>([]);
  const [fromError, setFromError] = useState<string>("");
  const [toError, setToError] = useState<string>("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const passengers = useSelector((state: RootState) => state.passengers);
  const dispatch = useDispatch();

  useEffect(() => {
    setFrom(searchParams.get("from") ?? "");
    setTo(searchParams.get("to") ?? "");
    setTravelDate(new Date(searchParams.get("travelDate") ?? ""));
    const initialPassengers = parseInt(searchParams.get("passengers") ?? "1");
    setPassengerCount(isNaN(initialPassengers) ? 1 : initialPassengers);
  }, [searchParams]);


  useEffect(() => {
    fetch("/flights.json")
      .then((res) => res.json())
      .then((data) => {
        const parsedFlights: Flight[] = data.map((flight: any) => ({
          ...flight,
          departureTime: new Date(flight.departureTime),
          arrivalTime: new Date(flight.arrivalTime),
        }));
        setAllFlights(parsedFlights);
      });
  }, []);


  useEffect(() => {
    const filteredFlights = allFlights.filter(
      (flight) =>
        flight.from.toLowerCase() === from.toLowerCase() &&
        flight.to.toLowerCase() === to.toLowerCase() &&
        flight.seats >= passengerCount
    );
    setMatchingFlights(filteredFlights);
  }, [from, to, passengerCount, allFlights, navigate]);

  const updatePassengers = (passenger: Passenger[]) => {
    dispatch(passengerDetails(passenger));
  }

  return (
    <div className="container mt-4">
      {/* <div className="mb-3">
        <label htmlFor="from" className="form-label"></label>
        <input
          type="text"
          id="from"
          className="form-control"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        {fromError && <div className="text-danger mt-1">{fromError}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="to" className="form-label">To:</label>
        <input
          type="text"
          id="to"
          className="form-control"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        {toError && <div className="text-danger mt-1">{toError}</div>}
      </div> */}

      <p><strong>Travel Date:</strong> {travelDate.toDateString()}</p>
      <p><strong>Passengers:</strong> {passengerCount}</p>

      <div className="mt-4">
        {matchFlights.length > 0 ? (
          matchFlights.map((flight) => (
            <div key={flight.flightNumber} className="card mb-3 shadow-sm border-0">
              <div className="card-body">
                <h6 className="fw-bold text-primary mb-3">✈️ {flight.flightNumber}</h6>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="text-center" style={{ width: "40%" }}>
                    <h4 className="fw-bold mb-0">
                      {flight.departureTime.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h4>
                    <p className="mb-0 fw-semibold">
                      {flight.from}</p>
                  </div>
                  <div className="text-center" style={{ width: "20%" }}>
                    <span className="text-muted">──────── ✈ ────────</span>
                  </div>


                  <div className="text-center" style={{ width: "40%" }}>
                    <h4 className="fw-bold mb-0">
                      {flight.arrivalTime.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h4>
                    <p className="mb-0 fw-semibold">
                      {flight.to}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <p className="mb-0"><strong>Duration:</strong> {flight.duration}</p>
                  <p className="mb-0"><strong>Fare:</strong>₹{flight.price}</p>

                  <div className="text-end mt-3">
                    <button 
                       className="btn btn-outline-primary"
                       onClick={() =>{
                        
                       }}
                       >
                        Select Flight
                       </button>
                       </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-danger">No flights available for your search.</p>
        )}
      </div>
    </div >
  );
};

export default FlightSearch;
