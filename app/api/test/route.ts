import { getPaddleInstance } from "@/lib/paddle/get-paddle-instance";
import { NextResponse } from "next/server";

export async function GET() {
  const paddle = getPaddleInstance();
  const products = paddle?.products.list({
    perPage: 10,
  });
  const prices = paddle?.prices.list();
  return NextResponse.json({ products, prices });
}
