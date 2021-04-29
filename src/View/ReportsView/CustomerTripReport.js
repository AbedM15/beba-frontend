import produce from "immer";
import { useState } from "react";
import { reviveTrip } from "../../Api/Revive/trip";
import { StyledButton } from "../StyledComponents/StyledDashboard";
import { getCustomerTrips } from "./reportCommands";
import { StyledReportContainer } from "./StyledReports";

export default function CustomerTripReport() {
  const [trips, setTrips] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  return (
    <StyledReportContainer>
      <div>
        <h1>Customer report</h1>
        {error === "" ? null : <p>{error}</p>}
        <input
          type="number"
          value={phoneNumber}
          placeholder="Enter customer phone number..."
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <StyledButton
          onClick={async () => {
            try {
              const { data: response } = await getCustomerTrips(phoneNumber);
              if (!response.success) {
                throw new Error(response.message);
              }

              const trips = response.trips.map((tripJson) =>
                reviveTrip(tripJson)
              );
              setTrips(trips);
            } catch (error) {
              setError(error.message);
            }
          }}
        >
          Get trips
        </StyledButton>

        <h1>User trips</h1>
        {trips.map((trip) => {
          return (
            <div className="trip-destination-summary">
              <p>{trip.destination}</p>
              <p>{trip.fare}KSH</p>
            </div>
          );
        })}
        {trips.length === 0 && <p>No trips. Enter phone number</p>}
      </div>
    </StyledReportContainer>
  );
}
