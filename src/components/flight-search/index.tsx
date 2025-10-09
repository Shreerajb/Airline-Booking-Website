import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Flight } from "../types/Flight";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { flightDetails, passengerDetails } from "../../store/bookingSlice";
import { Passenger } from "../types/Passenger";
import FlightItem from "./flight-item";

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

  const selectedFlightInfo = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("selectedFlightInfo was updated", selectedFlightInfo);
  }, [selectedFlightInfo]);

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

  const updateFlight = (flight: Flight) => {
    dispatch(flightDetails(flight));
  };

  return (
    <div className="container mt-4">
      <p>
        <strong>Travel Date:</strong> {travelDate.toDateString()}
      </p>
      <p>
        <strong>Passengers:</strong> {passengerCount}
      </p>

      <div className="mt-4">
        {matchFlights.length > 0 ? (
          matchFlights.map((flight: Flight) => (
            <FlightItem {...flight} updateFlightCallback={updateFlight} />
          ))
        ) : (
          <p className="text-danger">No flights available for your search.</p>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
