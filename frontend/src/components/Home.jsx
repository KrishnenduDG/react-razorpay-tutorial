import React from "react";
import axios from "axios";

import { Box, Stack } from "@chakra-ui/react";
import Card from "../components/Card";

const Home = () => {
  // Function for handling the Payment
  const checkoutHandler = async (amount) => {
    const razorpay_key = (await axios.get("http://localhost:8080/api/getKey"))
      .data;

    const payment_order_details = (
      await axios.post("http://localhost:8080/api/checkout", {
        amount,
      })
    ).data;

    // Getting this big JSON Obj is not tough. Go to https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/#handler-function-or-callback-url
    const options = {
      key: razorpay_key.key,
      amount: payment_order_details.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Naam mein Kya Hai",
      description: "Test Transaction",
      image:
        "https://avatars.githubusercontent.com/u/72221973?s=400&u=eb284c6782dfb8addf22dd652312dccd0051f892&v=4",

      order_id: payment_order_details.order.id,

      // URL in which user is redirected after the payment succeeds
      callback_url: "http://localhost:8080/api/payment_verification",

      // Prefilled Values for Payment
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Since the Razorpay script has been added to the "index.html", so it can be accessed as this
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Box>
      <Stack
        direction={["column", "row"]}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >

        {/* Displaying the Products */}
        <Card
          amount={5000}
          img={
            "https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"
          }
          checkoutHandler={checkoutHandler}
        />

        <Card
          amount={3000}
          img={
            "http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"
          }
          checkoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  );
};

export default Home;
