import { StyledPaymentView } from "../StyledComponents/StyledPayment";

export default function PaymentView({ payment }) {
  return (
    <StyledPaymentView>
      <div className="payment-mini-header">
        <p>{payment.phoneNumber}</p>
        <p>{payment.amount} Ksh</p>
      </div>

      {payment.paymentDescription && payment.paymentDescription.length > 0 ? (
        <div className="payment-mini-error">{payment.paymentDescription} </div>
      ) : null}
    </StyledPaymentView>
  );
}
