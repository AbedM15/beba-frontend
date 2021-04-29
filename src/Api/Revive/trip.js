import { Trip } from "../../Logic/Trip/Trip";
import { revivePayment } from "./payment";

export function reviveTrip(tripJson) {
  tripJson.payments = tripJson.payments.map((payment) =>
    revivePayment(payment)
  );
  return Object.assign(new Trip(), tripJson);
}
