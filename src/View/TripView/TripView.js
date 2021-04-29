import { useState } from "react";
import { useHistory } from "react-router";
import AddPayment from "../PaymentViews/AddPayments";
import PaymentView from "../PaymentViews/PaymentView";
import {
  StyledButton,
  StyledOverlay,
} from "../StyledComponents/StyledDashboard";
import { StyledTripView } from "../StyledComponents/StyledTrip";

export default function TripView({
  trip,
  vehicleIndex,
  tripIndex,
  user,
  setUser,
}) {
  const [openPayments, setOpenPayments] = useState(false);

  // (below) controls the modal to add payments. If it is true the modal is open if not
  // the modal is closed
  const [showAddPayments, setShowAddPayments] = useState(false);

  //we need the history object so we can move to other pages programmatically
  const history = useHistory();
  return (
    <StyledTripView>
      <div>
        <div className="trip-header">
          <h3>Destination: {trip.destination}</h3>
          <div>
            <StyledButton onClick={() => setShowAddPayments(true)}>
              Add payments
            </StyledButton>
            <StyledButton
              onClick={() => history.push("/report/trip/" + trip.id)}
            >
              Trip report
            </StyledButton>
          </div>
        </div>
        {openPayments ? (
          <span className={"dropdown"} onClick={() => setOpenPayments(false)}>
            Close payments
          </span>
        ) : (
          <span className={"dropdown"} onClick={() => setOpenPayments(true)}>
            Open payments
          </span>
        )}
      </div>
      {openPayments && (
        <div>
          {trip.payments.map((payment) => {
            return <PaymentView key={payment.id} payment={payment} />;
          })}
        </div>
      )}
      {/* the 'add payments' modal  */}
      <StyledOverlay
        show={showAddPayments}
        onClick={() => {
          setShowAddPayments(false);
        }}
      >
        <AddPayment {...{ vehicleIndex, tripIndex, user, setUser }} />
      </StyledOverlay>
    </StyledTripView>
  );
}
