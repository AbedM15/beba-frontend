import { Payment } from "../../Logic/Payments/Payment";

export function revivePayment(paymentJson) {
  return Object.assign(new Payment(), paymentJson);
}
