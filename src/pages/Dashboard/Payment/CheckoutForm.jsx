import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';

const CheckoutForm = ({ price, selectedClass }) => {
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')

    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        axios.post(`https://speak-ease-server.vercel.app/create-payment-intent`, { price })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCardError(error.message)
            console.log(error)
        } else {
            console.log(paymentMethod)
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    },
                },
            }
        )

        if (confirmError) {
            setCardError(confirmError)
        }
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                date: new Date(),
                price,
                seats: 1,
                classId: selectedClass?.singleClass?._id

            }
            axios.post(`https://speak-ease-server.vercel.app/payment`, payment)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertResult.acknowledged) {
                        Swal.fire({
                            icon: 'success',
                            text: 'Payment successful',
                        })
                    }
                })
        }


    }
    return (
        <form onSubmit={handleSubmit} className='flex flex-col w-2/3 justify-center'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className='my-3 text-red-600'>{cardError}</p>
            <button type="submit" disabled={!stripe || !clientSecret} className='mx-auto btn btn-success rounded-md my-10 px-6 py-2'>Pay</button>
        </form>
    );
};

export default CheckoutForm;