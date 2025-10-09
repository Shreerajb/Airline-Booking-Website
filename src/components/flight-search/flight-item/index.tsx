import { Flight } from "../../types/Flight";

type UpdateFlight = {
  updateFlightCallback: (flight: Flight) => void;
};

const FlightItem = ({
  flightNumber,
  from,
  to,
  departureTime,
  arrivalTime,
  duration,
  price,
  seats,
  updateFlightCallback,
}: Flight & UpdateFlight) => {
  return (
    <div key={flightNumber} className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <h6 className="fw-bold text-primary mb-3">✈️ {flightNumber}</h6>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="text-center" style={{ width: "40%" }}>
            <h4 className="fw-bold mb-0">
              {departureTime.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h4>
            <p className="mb-0 fw-semibold">{from}</p>
          </div>
          <div className="text-center" style={{ width: "20%" }}>
            <span className="text-muted">──────── ✈ ────────</span>
          </div>

          <div className="text-center" style={{ width: "40%" }}>
            <h4 className="fw-bold mb-0">
              {arrivalTime.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h4>
            <p className="mb-0 fw-semibold">{to}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <p className="mb-0">
            <strong>Duration:</strong> {duration}
          </p>
          <p className="mb-0">
            <strong>Fare:</strong>₹{price}
          </p>

          <div className="text-end mt-3">
            <button
              className="btn btn-outline-primary"
              onClick={() =>
                updateFlightCallback({
                  flightNumber,
                  arrivalTime,
                  departureTime,
                  duration,
                  from,
                  price,
                  seats,
                  to,
                })
              }
            >
              Select Flight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightItem;
