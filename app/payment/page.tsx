"use client"
import axios from "axios"
import Script from "next/script";

export default function Payment(){
    const handleClick = async(e:any) =>{
        e.preventDefault();
        const res = await axios.post("/api/create-order", {
            amount: 50000 // Amount in paise (50000 paise = 500 INR)
        });
        
        
        //use this id
        console.log("order id is ",res.data.id);
        
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Ensure key is a string
            amount: 50000, // Amount in paise
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: res.data.id,
            callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "+919876543210"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        console.log("options.keyid is",options.key);
        const rp = new (window as any).Razorpay(options);
        rp.open();
    }       
    return (
        <div>
               <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
           <button onClick={handleClick}>Click to Pay</button>
        </div>
    )
}