// Module Imports
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

// Route imports
import paymentRoute from "./routes/paymentRoutes.js";


// Creating the Razorpay Instance and exporting it
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Setting up the Env Vars
dotenv.config()

// Creating the Express App Instance
const app = express();

// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors())

// Exporting the Constants
const PORT = process.env.PORT || 8080

// Route for getting the Razorpay API Key
app.get("/api/getKey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

// Setting the Routes of "/api"
app.use("/api", paymentRoute);


// Listening for requests
app.listen(PORT, () => {
  console.log(`Server Listening at http://localhost:${PORT}`);
})