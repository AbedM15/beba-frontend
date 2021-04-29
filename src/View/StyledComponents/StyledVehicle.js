import styled from "styled-components";

export const StyledAddVehicle = styled("div")`
  padding: 1em 1.5em;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  background-color: white;
  input {
    margin: 0.3em 0em;
  }
`;

export const StyledVehicleView = styled("div")`
  background-color: #d8e3e7;
  min-width: 500px;
  padding: 0.5em;
  margin: 0.4em 0em;
  border-radius: 0.5em;
  .vehicle-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dropdown {
    cursor: pointer;
    background-color: #ffc996;
    padding: 0.2em;
    border-radius: 0.2em;
    color: black;
  }
`;
