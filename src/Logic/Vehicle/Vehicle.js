import { immerable } from "immer";
import { v4 } from "uuid";

export class Vehicle {
  [immerable] = true;
  constructor(numberPlate, numberOfSeats) {
    this.numberOfSeats = numberOfSeats;
    this.numberPlate = numberPlate;
    this.id = v4();
    this.trips = [];
  }
}
