import axios from "axios";
import { baseUrl } from "../../Api/baseUrl";

export async function addVehicle(vehicle) {
  //check if the user is logged in first
  //a user cannot add a vehicle if they are not logged in. If they would, who would be the owner of the vehicle?
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("You need to be logged in to add a vehicle");
  const response = await axios.post(
    baseUrl + "vehicle/add",
    { vehicle },
    {
      headers: {
        //we set the access token, to identify the user when the server receives the request
        Authorization: "Bearer " + token,
      },
    }
  );
  return response;
}
