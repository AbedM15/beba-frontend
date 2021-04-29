import produce from "immer";
import { useState } from "react";
import { Trip } from "../../Logic/Trip/Trip";
import { StyledAddTrip } from "../StyledComponents/StyledTrip";
import { addTrip } from "./tripCommands";

export default function AddTripView({ setUser, user, vehicleIndex }) {
  const [trip, setTrip] = useState(new Trip("", ""));
  //the error variable will hold our error messages so we can show them to the user
  const [error, setError] = useState("");
  return (
    <StyledAddTrip onClick={(e) => e.stopPropagation()}>
      <h1>Add trip</h1>
      {/* here is where we show errors to the user  */}
      {error === "" ? null : <p>{error}</p>}
      <input
        type="text"
        placeholder="Enter destination..."
        value={trip.destination}
        onChange={(e) => {
          setTrip(
            produce(trip, (draft) => {
              draft.destination = e.target.value;
            })
          );
        }}
      />
      <input
        type="number"
        placeholder="Enter fare charge..."
        value={trip.fare}
        onChange={(e) => {
          setTrip(
            produce(trip, (draft) => {
              draft.fare = e.target.value;
            })
          );
        }}
      />
      <button
        onClick={async () => {
          try {
            //some validation here
            //we don't want to add a trip with no destination, do we?
            if (trip.destination.length <= 0)
              throw new Error("Invalid destination...");

            //we are in business here, we make money by charging customers to get them to their destinations
            //we can't charge them anything less than zero. We'd be losing money!
            if (trip.fare < 0 || trip.fare === undefined)
              throw new Error("Enter a valid fare amount...");
            //first we update the frontend with the new data. For responsiveness. If for some reason the
            //trip is not added in the backend we remove it on the frontend (later)
            setUser(
              //we use produce here for immutability. React detects a change by looking at object references. If we
              //just change an object property the object reference will not change and react won't update the ui to reflect the changes!
              produce(user, (draft) => {
                draft.vehicles[vehicleIndex].trips.push(trip);
              })
            );
            const vehicleId = user.vehicles[vehicleIndex].id;
            //we wait for the server to respond to our add trip request
            const { data: response } = await addTrip(trip, vehicleId);
            //if the server says that adding the trip was not successfull we throw an error
            if (!response.success) {
              throw new Error(response.message);
            }
          } catch (error) {
            //we catch all the errors here and display them to the user. Remember the error variable at the start of the file?
            //we set that variable's value to the error message
            setError(error.message);
          }
        }}
      >
        Add trip
      </button>
    </StyledAddTrip>
  );
}
