import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Helmet } from 'react-helmet';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
    const selectedClass = useLoaderData()

    const price = selectedClass?.singleClass?.price;
    console.log(selectedClass.singleClass.price)
    return (
        <>
            <Helmet>
                <title>Speak Ease | Payment</title>
            </Helmet>
            <div className='w-5/6 mx-auto mt-10 flex items-center flex-col rounded-md bg-gray-100'>
                <p className='text-3xl font-bold text-center my-10'>Make Your Payment !</p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} selectedClass={selectedClass} />
                </Elements>
            </div>
        </>
    );
};

export default Payment;