import axios from "axios";
import { baseUrl } from "../../Api/baseUrl";

export function getUser() {
  const token = localStorage.getItem("accessToken");

  //we check if the user is logged in. If not we throw an error. We cannot proceed
  if (!token)
    throw new Error("You must be logged in to view this page correctly!");

  const response = axios.get(baseUrl + "user/", {
    headers: {
      // we set the token to the authorization header. The server needs it
      Authorization: "Bearer " + token,
    },
  });
  return response;
}
