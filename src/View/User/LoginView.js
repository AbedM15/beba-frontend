import produce from "immer";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { User } from "../../Logic/User/User";
import { StyledButton } from "../StyledComponents/StyledDashboard";
import {
  StyledFormContainer,
  StyledGeneralForm,
} from "../StyledComponents/StyledForms";
import { login } from "./userApi";

export default function LoginView() {
  const [user, setUser] = useState(new User(""));
  //if (below) the error is not an empty string it will be printed to the user
  const [error, setError] = useState("");
  //we need this so we can navigate to another page automatically after passing in the correct credentials
  const history = useHistory();
  return (
    <StyledFormContainer>
      <StyledGeneralForm>
        <h1>Log In</h1>
        {/* here is where we print the error  */}
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
          onClick={async (e) => {
            try {
              const { data: response } = await login(user);
              //we check if the request to login was a success
              if (response.success) {
                localStorage.setItem("accessToken", response.accessToken);
                //it there are no errors we proceed to the dashboard
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
          <Link to="/register">Or register</Link>
        </div>
      </StyledGeneralForm>
    </StyledFormContainer>
  );
}
