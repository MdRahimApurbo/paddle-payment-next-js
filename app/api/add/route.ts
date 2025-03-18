import { getPaddleInstance } from "@/lib/paddle/get-paddle-instance";
import { NextResponse } from "next/server";

// export async function GET() {
//   const paddle = getPaddleInstance();
//   //   const response = await paddle.products.create({
//   //     name: "Dummy Product",
//   //     description: `Dummy Product - 1 month plan`,
//   //     taxCategory: "standard",
//   //   });
//   const prices = await paddle.prices.update("pro_01jpmpe7f81dttbf3w4g12zkxt", {
//     unitPrice: {
//       amount: "1000",
//       currencyCode: "USD",
//     },
//   });
//   return NextResponse.json({ prices });
// }

export async function GET() {
  try {
    const paddle = getPaddleInstance();

    const response = await paddle.products.update(
      "pro_01jpmpe7f81dttbf3w4g12zkxt",
      {
        name: "Product 2",
        description: `Product 2 - 1 month plan`,
        taxCategory: "standard",
      }
    );

    return NextResponse.json({ response });
  } catch (e) {
    console.error("Paddle API Error:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
