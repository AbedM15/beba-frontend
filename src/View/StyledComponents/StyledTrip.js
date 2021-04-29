import styled from "styled-components";

export const StyledAddTrip = styled("div")`
  padding: 1em 1.5em;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  background-color: white;
  input {
    margin: 0.3em 0em;
  }
`;

export const StyledTripView = styled("div")`
  background-color: #393e46;
  color: white;
  padding: 0.4em 0.8em;
  margin: 0.2em;
  border-radius: 0.1em;
  .trip-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
