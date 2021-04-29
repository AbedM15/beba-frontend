import { v4 } from "uuid";
import { Vehicle } from "../Logic/Vehicle/Vehicle";
import { addPayment } from "./dummyPayments";
import { addTrips } from "./dummyTrips";

export function generateDummyVehicles(number) {
  let vehicles = [];
  for (let i = 0; i < number; i++) {
    vehicles.push(
      new Vehicle(v4().slice(0, 6), Math.floor(Math.random() * 25))
    );
  }
  return vehicles;
}

export function makeFullDummyVehicles(number) {
  let vehicles = generateDummyVehicles(number).map((vehicle) =>
    addTrips(vehicle, number)
  );
  vehicles = vehicles.map((vehicle) => {
    vehicle.trips = vehicle.trips.map((trip) => addPayment(trip, 3));
    return vehicle;
  });
  return vehicles;
}
