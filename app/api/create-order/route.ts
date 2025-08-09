import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay"

console.log("Razorpay Key ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET);
export const instance = new Razorpay({key_id : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, key_secret : process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!});


export async function POST(req : NextRequest){
    const {amount} = await req.json();
    
    const order = await instance.orders.create({
        amount: amount, // Amount in paise
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: true, // Auto capture
    })  

    console.log("order",order);
    return NextResponse.json(order)
    
}