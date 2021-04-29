import { immerable } from "immer";
import { v4 } from "uuid";

export class User {
  [immerable] = true;
  constructor(name) {
    this.name = name;
    this.password = "";
    this.id = v4();
    this.vehicles = [];
  }
}
