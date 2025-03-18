import { getPaddleInstance } from "@/lib/paddle/get-paddle-instance";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const paddle = getPaddleInstance();

    // Fetch product list
    const products = await paddle.products.list({
      id: ["pro_01jpmpe7f81dttbf3w4g12zkxt"],
      perPage: 10,
      status: ["active"],
    }); // ✅ Await the response

    return NextResponse.json({ products });
  } catch (e) {
    console.error("Paddle API Error:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
