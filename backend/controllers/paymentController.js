import { instance } from "../index.js";
import crypto from "crypto";

// Checkout Function for payment which creates the Payment Order Instance
export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  // Create an Order Instance using the Razorpay Instance
  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
};

// Verifying the Payload for the Payment
export const paymentVerification = async (req, res) => {

  // As per Razorpay, {razorpay_order_id} + "|" + {razorpay_payment_id} must be hashed using the Razorpay API Secret to get the {razorpay_signature}. If both match, then the payment is valid otheriwse not

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here -> Storing the Payment in Database and redirecting to Frontend
    
    res.redirect(
      `http://localhost:3000/payment_success?reference=${razorpay_payment_id}`
    );
  } else {

    // For the Case of Invalid Payments
    res.status(400).json({
      success: false,
    });
  }
};
