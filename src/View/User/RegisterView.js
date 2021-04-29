import produce from "immer";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { User } from "../../Logic/User/User";
import { StyledButton } from "../StyledComponents/StyledDashboard";
import {
  StyledFormContainer,
  StyledGeneralForm,
} from "../StyledComponents/StyledForms";
import { register } from "./userApi";
export default function RegisterView() {
  const [user, setUser] = useState(new User(""));
  //(below) if the error is not an empty string it will be printed to the user
  const [error, setError] = useState("");

  //we need this so we can move to other pages programmatically
  const history = useHistory();
  return (
    <StyledFormContainer>
      <StyledGeneralForm>
        <h1>Register</h1>
        {/* we display any errors here  */}
        {error !== "" ? <p>{error}</p> : null}
        <input
          type="text"
          placeholder="Enter name..."
          value={user.name}
          onChange={(e) => {
            setUser(
              produce(user, (draft) => {
                draft.name = e.target.value;
              })
            );
          }}
        />
        <input
          type="password"
          placeholder="Enter password..."
          value={user.password}
          onChange={(e) => {
            setUser(
              produce(user, (draft) => {
                draft.password = e.target.value;
              })
            );
          }}
        />
        <StyledButton
          onClick={async () => {
            try {
              const { data: response } = await register(user);
              //we check if the registration request was a success
              if (response.success) {
                localStorage.setItem("accessToken", response.accessToken);
                //if no errors are found we proceed to the dashboard
                history.push("/dashboard");
              } else {
                throw new Error(response.message);
              }
            } catch (error) {
              setError(error.message);
            }
          }}
        >
          Submit
        </StyledButton>
        <div className="extra">
          <Link to="/">Or login</Link>
        </div>
      </StyledGeneralForm>
    </StyledFormContainer>
  );
}
