import { Trip } from "../Logic/Trip/Trip";

export function generateDummyTrips(number) {
  let trips = [];
  for (let i = 0; i < number; i++) {
    trips.push(new Trip("anywhere", Math.floor(Math.random() * 500)));
  }
  return trips;
}

export function addTrips(vehicle, number) {
  vehicle.trips = generateDummyTrips(number);
  return vehicle;
}
