import { getPaddleInstance } from "@/lib/paddle/get-paddle-instance";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const paddle = getPaddleInstance();

    // Create a new price for the product
    const response = await paddle.prices.create({
      productId: "pro_01jpmpe7f81dttbf3w4g12zkxt",
      unitPrice: {
        amount: "100", // Convert to string
        currencyCode: "USD",
      },
      billingCycle: {
        interval: "month",
        frequency: 1,
      },
      description: "Product 2 - 1 month plan",
    });

    return NextResponse.json({ response });
  } catch (e) {
    console.error("Paddle API Error:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
