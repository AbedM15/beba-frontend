import axios from "axios";
import { baseUrl } from "../../Api/baseUrl";

export async function addPayment(payment, tripId) {
  const token = localStorage.getItem("accessToken");
  //if the user is not logged in we cannot proceed. So we throw an error
  if (!token) throw new Error("You must be logged in to add payments");

  //we make the request to the server and wait (asynchronously) for the response
  const response = await axios.post(
    baseUrl + "payment/add",
    { payment, tripId },
    {
      headers: {
        //we set the access token to the header. The server needs it
        Authorization: "Bearer " + token,
      },
    }
  );
  return response;
}
