import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { formatMoney } from './parse-money';

interface Props {
    checkoutData: CheckoutEventsData | null;
}

export function CheckoutPriceAmount({ checkoutData }: Props) {
    const total = checkoutData?.totals.total;
    return (
        <>
            {total !== undefined ? (
                <div className={'pt-8 flex gap-2 items-end'}>
                    <span className={'text-5xl'}>{formatMoney(total, checkoutData?.currency_code)}</span>
                    <span className={'text-base leading-[16px]'}>inc. tax</span>
                </div>
            ) : (
                <div>No data</div>
            )}
        </>
    );
}