"use client";

import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

const Payment = () => {
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [loading, setLoading] = useState(true); // Track Paddle loading state

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

    if (!publicKey) {
      console.error("Paddle public key is missing.");
      setLoading(false);
      return;
    }

    initializePaddle({
      environment: "sandbox", // Use "sandbox" directly as a string
      token: publicKey,
    })
      .then((paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        } else {
          console.error("Failed to initialize Paddle.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error initializing Paddle:", error);
        setLoading(false);
      });
  }, []);

  const handleCheckout = () => {
    if (!paddle) {
      console.error("Paddle is not initialized yet.");
      return;
    }

    paddle.Checkout.open({
      items: [
        {
          priceId: "pri_01jpmekr2xa9gr99q380yjqmz9",
          quantity: 1,
        },
      ],
      settings: {
        displayMode: "overlay",
        theme: "light",
        locale: "en",
        successUrl: "http://localhost:3000/success",
      },
    });
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md cursor-pointer disabled:opacity-50"
        onClick={handleCheckout}
        disabled={!paddle || loading} // Prevent clicking if Paddle isn't ready
      >
        {loading ? "Loading..." : "Checkout"}
      </button>
    </div>
  );
};

export default Payment;
