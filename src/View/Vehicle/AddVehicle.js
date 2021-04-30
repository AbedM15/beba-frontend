import produce from "immer";
import { useState } from "react";
import { Vehicle } from "../../Logic/Vehicle/Vehicle";
import { StyledAddVehicle } from "../StyledComponents/StyledVehicle";
import { addVehicle } from "./vehicleCommands";

export default function AddVehicle({ setUser, user, setShow }) {
  const [vehicle, setVehicle] = useState(new Vehicle("", ""));
  const [error, setError] = useState("");
  return (
    <StyledAddVehicle onClick={(e) => e.stopPropagation()}>
      <h1>Add vehicle</h1>
      {error === "" ? null : <p>{error}</p>}
      <input
        type="text"
        placeholder="Enter number plate..."
        value={vehicle.numberPlate}
        onChange={(e) => {
          setVehicle(
            produce(vehicle, (draft) => {
              draft.numberPlate = e.target.value;
            })
          );
        }}
      />
      <input
        type="number"
        placeholder="Enter number of seats..."
        value={vehicle.numberOfSeats}
        onChange={(e) => {
          setVehicle(
            produce(vehicle, (draft) => {
              draft.numberOfSeats = e.target.value;
            })
          );
        }}
      />
      <button
        onClick={async () => {
          try {
            //validation
            const kenyanNumberPlate = /^k[a-z]{2}[-]{0,1}\d{3}[a-z]{1}/i;
            //we check if the given number plate is a kenyan number plate
            if (!vehicle.numberPlate.match(kenyanNumberPlate)) {
              throw new Error(
                "Incorrect number plate. Enter kenyan number plate with format kxx-dddx. where x->letter and d->digit"
              );
            }

            //the number of seats in a vehicle cannot be less than 0
            if (vehicle.numberOfSeats < 0) {
              throw new Error("Number of seats must be more than 0");
            }

            setUser(
              produce(user, (draft) => {
                draft.vehicles.push(vehicle);
              })
            );
            //we send a request to the server to add a vehicle
            const { data: response } = await addVehicle(vehicle);
            if (response.success) {
              setShow(false);
            } else {
              throw new Error(response.message);
            }
          } catch (error) {
            //we print errors, if any, to the user
            setError(error.message);
          }
        }}
      >
        Add Vehicle
      </button>
    </StyledAddVehicle>
  );
}
