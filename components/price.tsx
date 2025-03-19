import { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";
import { CheckoutLineItems } from "./checkout/checkout-line-items";
import { CheckoutPriceAmount } from "./checkout/checkout-price-amount";


interface Props {
    checkoutData: CheckoutEventsData | null;
    handleQuantityChange: (value: number) => void;
    quantity: number;
}
export function PriceSection({ checkoutData, handleQuantityChange, quantity }: Props) {
    return (
        <>
            <div className={'hidden md:block'}>
                <CheckoutPriceAmount checkoutData={checkoutData} />
                <CheckoutLineItems
                    handleQuantityChange={handleQuantityChange}
                    checkoutData={checkoutData}
                    quantity={quantity}
                />
            </div>
            <div className={'block md:hidden'}>
                <CheckoutPriceAmount checkoutData={checkoutData} />
                <div className={'relative bg-border/50 mt-6 checkout-order-summary-mobile-yellow-highlight'} />
                <CheckoutLineItems
                    handleQuantityChange={handleQuantityChange}
                    checkoutData={checkoutData}
                    quantity={quantity}
                />
            </div>
        </>
    );
}