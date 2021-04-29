import { immerable } from "immer";
import { v4 } from "uuid";

export class Payment {
  [immerable] = true;
  constructor(amount, phoneNumber) {
    this.amount = amount;
    this.phoneNumber = phoneNumber;
    this.fullyPaid = false;
    this.id = v4();
  }
}
