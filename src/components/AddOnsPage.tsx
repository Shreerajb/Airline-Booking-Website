import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddOn } from "../store/bookingSlice";
import { Modal, Button, Form } from "react-bootstrap";
import { RootState } from "../store/store";

const addOns = [
  { title: "Excess Baggage", description: "Add extra baggage allowance.",price: 750},
  { title: "Seat & Meal Deal", description: "Choose your seat and meal combo.",price:900},
  { title: "Akasa Priority", description: "Priority check-in and boarding.",price: 1050 },
  { title: "Lounge", description: "Access airport lounges for comfort.",price:1500 },
  { title: "Trip Cover", description: "Travel insurance for your trip.",price:600 },
  { title: "Delayed & Lost Baggage", description: "Protection against baggage issues.",price:700},
];
const AddOnsPage: React.FC = () => {
    const dispatch = useDispatch();
    const flight = useSelector((state: RootState) =>state.booking.flightDetails);
    const passengers =useSelector((state: RootState) => state.booking.passengers);

    const [showModal, setShowModal] = useState(false);
    const [selectedAddOn, setSelectedAddOn] = useState<string|null >(null);
    const [isChecked, setIsChecked] = useState(false);


  const handleAddClick = (title: string) => {
    setSelectedAddOn(title);
    setShowModal(true);
     };
  
  const handleConfirm = () => {
    if (selectedAddOn && isChecked) {
      dispatch(addAddOn(selectedAddOn));
    }
    setShowModal(false);
    setIsChecked(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setIsChecked(false);
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Select Add-ons</h4>
      <div className="row">
        {addOns.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
                <button
                  className="btn btn-outline-warning mt-5 mx-auto d-block" style={{padding: '12px 24px', fontSize: '18px', width: '100px'}}
                  onClick={() => handleAddClick(item.title)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))} 
      </div>

      <Modal show={showModal} onHide={handleClose} centered backdrop="static" animation={true}>
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <Modal.Title>{selectedAddOn}</Modal.Title>
          <Button type="button" className="btn-close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="px-4 py-3">
           <div className="mb-3">
            <p className="mb-1">
            <strong>{flight.from}</strong> to <strong>{flight.to}</strong> •{" "}
            {passengers.length} Passenger{passengers.length > 1 ? "s" : ""} 
            </p>
            <p className="text-muted"> 
            {flight.departureTime} • ₹{flight.price}
          </p>
          <p className="text-muted">
            Add-on Price: ₹{addOns.find(a => a.title === selectedAddOn)?.price}
          </p>
          </div>
          <Form.Check
            type="checkbox"
            label="Select this add-on"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleConfirm} disabled={!isChecked}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddOnsPage;
