import { immerable } from "immer";
import { v4 } from "uuid";

export class Trip {
  [immerable] = true;
  constructor(destination, fare) {
    this.destination = destination;
    this.fare = fare;
    this.id = v4();
    this.payments = [];
  }
}
