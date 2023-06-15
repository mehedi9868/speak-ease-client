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
            <div className='w-3/4 mx-auto mt-10 flex items-center flex-col'>
                <p className='text-4xl font-bold text-center mb-10'>Please pay to enroll the class</p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} selectedClass={selectedClass} />
                </Elements>
            </div>
        </>
    );
};

export default Payment;