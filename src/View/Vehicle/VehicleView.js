import { useState } from "react";
import {
  StyledButton,
  StyledOverlay,
} from "../StyledComponents/StyledDashboard";
import { StyledVehicleView } from "../StyledComponents/StyledVehicle";
import AddTripView from "../TripView/AddTrip";
import TripView from "../TripView/TripView";

export default function VehicleView({ vehicle, vehicleIndex, user, setUser }) {
  const [openTrips, setOpenTrips] = useState(false);
  //this (below) controls if the modal to add a trip is open or closed
  const [showAddTrip, setShowAddTrip] = useState(false);
  return (
    <StyledVehicleView>
      <div>
        <div className="vehicle-header">
          <h3>Plate: {vehicle.numberPlate}</h3>
          <StyledButton onClick={() => setShowAddTrip(true)}>
            Add trip
          </StyledButton>
        </div>
        {openTrips ? (
          <span
            className={"dropdown open-trips"}
            onClick={() => setOpenTrips(false)}
          >
            Close trips
          </span>
        ) : (
          <span
            className={"dropdown close-trips"}
            onClick={() => setOpenTrips(true)}
          >
            Open trips
          </span>
        )}
      </div>
      {openTrips && (
        <div>
          <h4>Trips</h4>
          {vehicle.trips.map((trip, tripIndex) => {
            return (
              <TripView
                key={trip.id}
                trip={trip}
                {...{ tripIndex, user, setUser, vehicleIndex }}
              />
            );
          })}
        </div>
      )}
      {/* the modal that pops up and allows us to add trips  */}
      <StyledOverlay show={showAddTrip} onClick={() => setShowAddTrip(false)}>
        <AddTripView {...{ user, setUser, vehicleIndex }} />
      </StyledOverlay>
    </StyledVehicleView>
  );
}
