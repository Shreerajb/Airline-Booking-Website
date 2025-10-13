import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { passengerDetails } from "../store/bookingSlice";
import { createListOfEmptyPassengers, Passenger } from "./types/Passenger";

const PassengerDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const flight = useSelector((state: RootState) => state.booking.flightDetails);
  const passengerCount = useSelector((state: RootState) => state.booking.passengerCount);

  const [passengerForms, setPassengerForms] = useState<Passenger[]>(
    createListOfEmptyPassengers(passengerCount)
  );

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updatedForms = [...passengerForms];
    updatedForms[index] = {
      ...updatedForms[index],
      [e.target.name]: e.target.value,
    };
    setPassengerForms(updatedForms);
  };

  const handleSubmit = () => {
    const enrichedPassengers = passengerForms.map((p, i) => ({
      ...p,
      id: Date.now().toString() + i,
      seatNumber: `A${i + 1}`,
    }));

    dispatch(passengerDetails(enrichedPassengers));
    console.log("Passenger Info:", enrichedPassengers);
    console.log("Selected Flight:", flight);
    navigate("/add-ons");
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Passenger Information</h4>

      {passengerForms.map((form, index) => (
        <div key={index} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Passenger {index + 1}</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="col-md-3 mb-3">
                <select
                  name="gender"
                  className="form-select"
                  value={form.gender}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="text-end">
        <button className="btn btn-warning" onClick={handleSubmit}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default PassengerDetailsPage;
