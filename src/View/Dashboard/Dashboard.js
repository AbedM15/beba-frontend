import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { reviveUser } from "../../Api/Revive/user";
import { makeFullDummyVehicles } from "../../DummyData/dummyVehicles";
import { User } from "../../Logic/User/User";
import PaymentView from "../PaymentViews/PaymentView";
import {
  StyledButton,
  StyledDashboardContainer,
  StyledOverlay,
} from "../StyledComponents/StyledDashboard";
import TripView from "../TripView/TripView";
import AddVehicle from "../Vehicle/AddVehicle";
import VehicleView from "../Vehicle/VehicleView";
import { getUser } from "./userCommands";
const dummyUser = new User("Dummy");
dummyUser.vehicles = makeFullDummyVehicles(4);
export function Dashboad() {
  const [user, setUser] = useState(new User());
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //this (below) runs every time a page loads
  useEffect(() => {
    //we want to get the currently logged in user from the server
    getUser()
      .then(({ data: response }) => {
        if (!response.success) throw new Error(response.message);

        //revive user converts the json we receive from the server to a proper javascript object
        //with methods
        setUser(reviveUser(response.user));
      })
      .then(() => {
        //we stop loading once we get the user data
        setLoading(false);
      })
      //we catch all the errors here and show them to the user
      .catch((error) => setError(error.message));
  }, []);
  if (loading) {
    //if the server hasn't responded we wait. What else can we do?
    //also, if there is an error. We can't proceed so we still have to wait
    return error === "" ? <p>Loading...</p> : <p>{error}</p>;
  } else {
    return (
      <StyledDashboardContainer>
        <div className="dashboard-header">
          <h1>Registered Vehicles</h1>
          <StyledButton onClick={() => setShowAddVehicleModal(true)}>
            Add Vehicle
          </StyledButton>
          <StyledButton
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.push("/");
            }}
          >
            Log out
          </StyledButton>
        </div>
        {/* we list all the vehicles that we added in the past  */}
        {user.vehicles.map((vehicle, vehicleIndex) => {
          return (
            <VehicleView
              key={vehicle.id}
              vehicle={vehicle}
              vehicleIndex={vehicleIndex}
              user={user}
              setUser={setUser}
              setUser={setUser}
            />
          );
        })}
        {/* the modal that allows us to add vehicles  */}
        <StyledOverlay
          onClick={() => {
            setShowAddVehicleModal(false);
          }}
          show={showAddVehicleModal}
        >
          <AddVehicle setUser={setUser} user={user} />
        </StyledOverlay>
      </StyledDashboardContainer>
    );
  }
}
