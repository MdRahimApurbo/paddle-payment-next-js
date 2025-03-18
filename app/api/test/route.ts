import { getPaddleInstance } from "@/lib/paddle/get-paddle-instance";
import { NextResponse } from "next/server";

export async function GET() {
  const paddle = getPaddleInstance();
  const products = paddle?.products.list({
    id: ["pro_01jpmpe7f81dttbf3w4g12zkxt"],
    perPage: 10,
  });
  // const prices = paddle?.prices.list();
  return NextResponse.json({ products });
}
