import axios from "axios";
import { baseUrl } from "../../Api/baseUrl";

export async function addTrip(trip, vehicleId) {
  // the user has to be logged in so they can add a trip
  const token = localStorage.getItem("accessToken");

  //if they are not logged in we throw an error. This error will be catched by the view and it will be displayed to the user
  if (!token) throw new Error("You need to be logged in to add a trip");
  const response = await axios.post(
    baseUrl + "trip/add",
    { trip, vehicleId },
    {
      headers: {
        //We set the authorization headers. The server needs a way to identify a user, right?
        Authorization: "Bearer " + token,
      },
    }
  );
  return response;
}
