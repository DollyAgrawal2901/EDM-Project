import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from './assets/cart_cross_icon.png';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51Pt6lOP90NDEkZl4f9JCSK8RyEQq2BPnEH7D2bJ13X21cZSbK0MD0Qkx5Im57dw7uWMm24RJ0vLOzu38TENLCj8k00RSeuqRv4');

export default function CartItems() {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    const makePayment = async () => {
        const stripe = await stripePromise;
        const body = {
            items: Object.keys(cartItems)
                .map(itemId => {
                    const product = all_product.find(p => p.id === Number(itemId));
                    if (product) {
                        return {
                            id: product.id,
                            name: product.name,
                            price: product.new_price,
                            quantity: cartItems[itemId]
                        };
                    }
                    return null;  // Return null if the product is not found
                })
                .filter(item => item && item.quantity > 0), // Filter out null items and those with no quantity
        };

        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const response = await fetch('http://localhost:4000/create-checkout-session', {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const session = await response.json();
            const { error } = await stripe.redirectToCheckout({
                sessionId: session.sessionId,
            });

            if (error) {
                console.error('Error redirecting to Stripe Checkout:', error);
            }
        } catch (error) {
            console.error('Error creating payment session:', error);
        }
    }

    return (
        <div className='my-[100px] mx-[170px]'>
            <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center gap-[75px] py-[20px] px-[0px] text-neutral-700 text-[18px] font-semibold'>
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr className='h-[3px] bg-slate-200 border-0'/>
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center gap-[75px] py-[20px] px-[0px] text-neutral-700 text-[17px] font-medium'>
                                <img className='h=[62px]' src={e.image} alt="" />
                                <p>{e.name}</p>
                                <p>{e.new_price}</p>
                                <button className='w-[64px] h-[50px] border border-[#ebebeb] bg-white'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='w-[15px] my-[0px] mx-[40px] cursor-pointer' onClick={() => { removeFromCart(e.id) }} src={remove_icon} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className='flex my-[100px] mx-[0px]'>
                <div className='flex-1 flex flex-col mr-[200px]'>
                    <h1>Cart Totals</h1>
                    <div>
                        <div className='flex justify-between py-[15px] px-[0px]'>
                            <p>SubTotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='flex justify-between py-[15px] px-[0px]'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='flex justify-between py-[15px] px-[0px]'>
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={makePayment} className='w-[262px] h-[58px] outline-none border-none bg-red-600 text-slate-300 text-[16px] font-semibold cursor-pointer'>Proceed To Checkout</button>
                </div>
                <div className='flex-1 text-[16px] font-medium'>
                    <p className='text-[#555]'>If you have a promo code, enter it here</p>
                    <div className='flex w-[504px] mt-[15px] pl-[20px] h-[58px] bg-slate-100'>
                        <input className="border-none outline-none bg-transparent text-[16px] w-[330px] h-[50px]" type="text" placeholder='promo code' />
                        <button className='w-[170px] h-[58px] text-[16px] bg-black text-white cursor-pointer'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
