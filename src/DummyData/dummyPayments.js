import { Payment } from "../Logic/Payments/Payment";

export function generateDummyPayments(number) {
  let payments = [];
  for (let i = 0; i < number; i++) {
    payments.push(
      new Payment(
        Math.floor(Math.random() * 500),
        Math.floor(Math.random() * 10000000000)
      )
    );
  }
  return payments;
}

export function addPayment(trip, number) {
  trip.payments = generateDummyPayments(number);
  return trip;
}
