import { CheckoutContents } from "@/components/checkout";

const page = async ({ params }: { params: { id: string } }) => {
    const id = await params.id;
    return (
        <div>
            <CheckoutContents userEmail="test@test.com" priceId={id} />
        </div>
    )
}

export default page