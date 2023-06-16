import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const { data: paymentHistory = [] } = useQuery({
        queryKey: ['selected-classes'],
        queryFn: async () => {
            const response = await axios.get(`https://speak-ease-server.vercel.app/payment-history?email=${user?.email}`)
            return response.data
        }
    })

    return (
        <>
            <Helmet>
                <title>Speak Ease | Payment History</title>
            </Helmet>
            <div className='w-5/6 py-10 px-5 bg-gray-100 my-10 rounded-md'>
                <p className='text-3xl font-bold my-5 text-center mb-10'>My Payment History : {paymentHistory.length}</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#262626] bg-opacity-80 rounded-md text-white'>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Seats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((payment, index) =>
                                <tr key={payment._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.date}</td>
                                    <td>${payment.price}</td>
                                    <td>{payment.seats}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;