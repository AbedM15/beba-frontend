import styled from "styled-components";

export const StyledFormContainer = styled("div")`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledGeneralForm = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    margin: 0.2em 0em;
  }
  button {
    width: 100%;
    margin: 0.1em 0em;
  }
  .extra {
    text-align: center;
    width: 100%;
  }
`;
