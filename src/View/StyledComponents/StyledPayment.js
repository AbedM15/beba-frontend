import styled from "styled-components";

export const StyledAddPayment = styled("div")`
  padding: 1em 1.5em;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  background-color: white;
  input {
    margin: 0.3em 0em;
  }
`;

export const StyledPaymentView = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: #4b778d;
  margin: 0.3em 0em;
  padding: 0.4em 0.6em;
  border-radius: 0.5em;
  align-items: flex-start;

  .payment-mini-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .payment-mini-error {
    margin: 0;
    background-color: #ff8474;
    padding: 0.2em 0.4em;

    p {
      margin: 0;
      padding: 0;
    }
  }
`;
