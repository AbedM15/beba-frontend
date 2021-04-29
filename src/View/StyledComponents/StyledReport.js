import styled from "styled-components";

export const StyledTripReportContainer = styled("div")`
  display: flex;

  flex-direction: column;
  align-items: center;

  th,
  td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  td,
  th {
    padding: 0.3em 0.4em;
    text-align: left;
  }
  th {
    height: 50px;
    background-color: #132c33;
    color: white;
  }
  tr:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.2);
  }
  table {
    border-collapse: collapse;
    min-width: 500px;
  }
`;
