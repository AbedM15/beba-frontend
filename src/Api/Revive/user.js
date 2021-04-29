import { User } from "../../Logic/User/User";
import { reviveVehicle } from "./vehicle";

export function reviveUser(userJson) {
  userJson.vehicles = userJson.vehicles.map((vehicle) =>
    reviveVehicle(vehicle)
  );
  return Object.assign(new User(), userJson);
}
