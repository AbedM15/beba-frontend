import axios from "axios";
import { baseUrl } from "../../Api/baseUrl";

export async function getFullTrip(tripId) {
  const token = localStorage.getItem("accessToken");
  //we check if a user is logged in first
  if (!token) throw new Error("You must be logged in to view this page!");

  const response = await axios.get(baseUrl + "trip/" + tripId, {
    headers: {
      //we set the authorization token, the server need a way to identify the user
      Authorization: "Bearer " + token,
    },
  });

  return response;
}
