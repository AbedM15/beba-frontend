import produce from "immer";
import { useState } from "react";
import { addPayment } from "./paymentCommands";
import { Payment } from "../../Logic/Payments/Payment";
import { StyledAddPayment } from "../StyledComponents/StyledPayment";

export default function AddPayment({ user, setUser, vehicleIndex, tripIndex }) {
  const AMOUNT = user.vehicles[vehicleIndex].trips[tripIndex].fare;
  const [payment, setPayment] = useState(new Payment(AMOUNT, ""));
  const seatsRemaining =
    user.vehicles[vehicleIndex].numberOfSeats -
    user.vehicles[vehicleIndex].trips[tripIndex].payments.length;
  const [error, setError] = useState("");
  return (
    <StyledAddPayment onClick={(e) => e.stopPropagation()}>
      <h1>Add payments</h1>
      {/* here is where we display the errors  */}
      {error === "" ? null : <p>{error}</p>}
      <p>
        {seatsRemaining}/{user.vehicles[vehicleIndex].numberOfSeats} seats
        remaining
      </p>
      <input
        type="number"
        placeholder="Enter phone number..."
        value={payment.phoneNumber}
        onChange={(e) => {
          setPayment(
            produce(payment, (draft) => {
              draft.phoneNumber = e.target.value;
            })
          );
        }}
      />
      <button
        onClick={async () => {
          try {
            //payment has to be done through a kenya phone number
            //remember we are using lipa na mpesa
            const kenyanPhoneNumber = /(254)\d{9}/i;
            if (!payment.phoneNumber.match(kenyanPhoneNumber))
              throw new Error(
                "Invalid phone number. Enter a number with the format 254xxxxxxxxx"
              );
            // if we dont have any seats remaining we can't accept any payment
            // what would the customer be paying for?
            if (seatsRemaining > 0) {
              setUser(
                produce(user, (draft) => {
                  draft.vehicles[vehicleIndex].trips[tripIndex].payments.push(
                    payment
                  );
                })
              );
              setPayment(new Payment(AMOUNT, ""));
            }
            const tripId = user.vehicles[vehicleIndex].trips[tripIndex].id;
            //we send a request to the server asking it to add payment to a certain trip
            //this will send the customer an stk push (where they can pay with mpesa)
            const { data: response } = await addPayment(payment, tripId);

            if (!response.success) {
              throw new Error(response.message);
            }
          } catch (error) {
            setError(error.message);
          }
        }}
      >
        Add
      </button>
    </StyledAddPayment>
  );
}
