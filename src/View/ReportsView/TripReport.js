import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { reviveTrip } from "../../Api/Revive/trip";
import { addPayment } from "../../DummyData/dummyPayments";
import { Trip } from "../../Logic/Trip/Trip";
import { StyledTripReportContainer } from "../StyledComponents/StyledReport";
import { getFullTrip } from "./reportCommands";

const dummyTrip = addPayment(new Trip("Buruburu", 50), 4);
export function TripReportView() {
  const [trip, setTrip] = useState(dummyTrip);
  const { tripId } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  // (below) loads on every page load
  useEffect(() => {
    try {
      //we get the full trip from the server
      //but what is the difference between a full trip and just a normal trip?
      //a full trip contains full data such as payments whereas a normal trip doesn't have payments
      //we use normal trips where we just want to get the name of the trip (to save bandwidth)
      getFullTrip(tripId)
        .then(({ data: response }) => {
          //if the server response indicates there was an error (no success) we throw an error
          //we catch this error in just a bit
          if (!response.success) throw new Error(response.message);

          //so what does the revive trip function do?
          //we receive data as json from the server. A json object wont have the methods we defined in the
          //trip class. The revive function turns the json into an
          //object with prototypes. It returns a trip object with all the methods in our trip class
          const trip = reviveTrip(response.trip);
          setTrip(trip);
          //we stop loading
          setLoading(false);
        })
        //here is where we catch all the errors and display them to the user
        .catch((error) => setError(error.message));
    } catch (error) {
      //we catch even more errors here
      setError(error.message);
    }
  }, []);
  if (loading) {
    //if the server hasn't responded yet we just load and wait for it. What else can we do?
    return error === "" ? <p>Loading...</p> : <p>{error}</p>;
  } else {
    return (
      <StyledTripReportContainer>
        <div>
          <h1>Trip report</h1>
          {error === "" ? null : <p>{error}</p>}
          <table>
            <tr>
              <th>Seat Number</th>
              <th>Paid by</th>
              <th>Paid or not paid</th>
            </tr>
            <tbody>
              {trip.payments.map((payment, index) => {
                const maskedPhoneNumber =
                  payment.phoneNumber.toString().substring(0, 6) + "*********";
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{maskedPhoneNumber}</td>
                    <td>{payment.paid ? "True" : "False"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </StyledTripReportContainer>
    );
  }
}
