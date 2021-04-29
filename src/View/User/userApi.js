import { baseUrl } from "../../Api/baseUrl";
import axios from "axios";

export async function register(user) {
  //we send a registration request to the server
  const response = await axios.post(baseUrl + "user/register", { user });
  return response;
}

export async function login(user) {
  // we send a login request to the server
  const response = await axios.post(baseUrl + "user/login", { user });
  return response;
}
