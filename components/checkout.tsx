'use client';

import { type Environments, initializePaddle, type Paddle } from '@paddle/paddle-js';
import type { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { useCallback, useEffect, useState } from 'react';
import { PriceSection } from './price';

interface Props {
    userEmail?: string;
    priceId?: string;
    priceAmount?: number;
}

export function CheckoutContents({ userEmail, priceId }: Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const [paddle, setPaddle] = useState<Paddle | null>(null);
    const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);

    const handleCheckoutEvents = (event: CheckoutEventsData) => {
        setCheckoutData(event);
    };

    const updateItems = useCallback(
        (paddle: Paddle, priceId: string, quantity: number) => {
            paddle.Checkout.updateItems([{ priceId, quantity }]);
        },
        []
    );

    useEffect(() => {
        if (!paddle?.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
            initializePaddle({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
                environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
                eventCallback: (event) => {
                    if (event.data && event.name) {
                        handleCheckoutEvents(event.data);
                    }
                },
                checkout: {
                    settings: {
                        variant: 'one-page',
                        displayMode: 'inline',
                        theme: 'dark',
                        allowLogout: !userEmail,
                        frameTarget: 'paddle-checkout-frame',
                        frameInitialHeight: 450,
                        frameStyle: 'width: 100%; background-color: transparent; border: none',
                        successUrl: '/checkout/success',
                    },
                },
            }).then(async (paddle) => {
                if (paddle && priceId) {
                    setPaddle(paddle);
                    paddle.Checkout.open({
                        ...(userEmail && { customer: { email: userEmail } }),
                        items: [{ priceId: priceId, quantity: 1 }],
                    });
                }
            });
        }
    }, [paddle?.Initialized, priceId, userEmail]);

    useEffect(() => {
        if (paddle && priceId && paddle.Initialized) {
            updateItems(paddle, priceId, quantity);
        }
    }, [paddle, priceId, quantity, updateItems]);

    return (
        <div className='rounded-lg md:bg-background/80 md:backdrop-blur-[24px] md:p-10 md:pl-16 md:pt-16 md:min-h-[400px] flex flex-col justify-between relative'>
            <div className='flex flex-col md:flex-row gap-8 md:gap-16'>
                <div className='w-full md:w-[400px]'>
                    <PriceSection checkoutData={checkoutData} quantity={quantity} handleQuantityChange={setQuantity} />
                </div>
                <div className='min-w-[375px] lg:min-w-[535px]'>
                    <div className='text-base leading-[20px] font-semibold mb-8'>Payment details</div>
                    <div className='paddle-checkout-frame' />
                </div>
            </div>
        </div>
    );
}

// interface PriceSectionProps {
//     checkoutData: CheckoutEventsData | null;
//     quantity: number;
//     handleQuantityChange: (value: number) => void;
//     priceAmount?: number;
// }

// function PriceSection({ quantity, handleQuantityChange, priceAmount = 10 }: PriceSectionProps) {
//     return (
//         <div className='p-6 border rounded-lg shadow-lg bg-background/80 backdrop-blur-[24px]'>
//             <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
//             <div className='flex justify-between items-center mb-4'>
//                 <span>Price per item:</span>
//                 <span className='font-semibold'>${priceAmount.toFixed(2)}</span>
//             </div>
//             <div className='flex justify-between items-center mb-4'>
//                 <span>Quantity:</span>
//                 <input
//                     type='number'
//                     value={quantity}
//                     onChange={(e) => handleQuantityChange(Number(e.target.value))}
//                     min={1}
//                     className='w-16 border rounded p-1 text-center'
//                 />
//             </div>
//             <div className='flex justify-between items-center font-semibold text-lg'>
//                 <span>Total:</span>
//                 <span>${(priceAmount * quantity).toFixed(2)}</span>
//             </div>
//         </div>
//     );
// }