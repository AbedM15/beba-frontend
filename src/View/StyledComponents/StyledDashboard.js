import styled from "styled-components";

export const StyledDashboardContainer = styled("div")`
  width: 60vw;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  .dashboard-header {
    display: flex;
    align-items: center;
  }
`;

export const StyledOverlay = styled("div")`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  color: black;
`;

export const StyledButton = styled("button")`
  background-color: #9f5f80;
  color: white;
  padding: 0.4em 0.6em;
  border: none;
  border-radius: 0.4em;
  margin: 0.1em 0.4em;
`;
