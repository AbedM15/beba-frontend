import { Vehicle } from "../../Logic/Vehicle/Vehicle";
import { reviveTrip } from "./trip";

export function reviveVehicle(vehicleJson) {
  vehicleJson.trips = vehicleJson.trips.map((trip) => reviveTrip(trip));
  return Object.assign(new Vehicle(), vehicleJson);
}
