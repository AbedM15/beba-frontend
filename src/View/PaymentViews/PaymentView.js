import { StyledPaymentView } from "../StyledComponents/StyledPayment";

export default function PaymentView({ payment }) {
  return (
    <StyledPaymentView>
      <p>{payment.phoneNumber}</p>
      <p>{payment.amount} Ksh</p>
    </StyledPaymentView>
  );
}
