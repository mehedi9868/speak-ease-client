import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from 'react-query';

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
        <div className='w-11/12 py-10 px-5 bg-base-300 shadow-2xl my-10'>
            <p className='text-3xl font-bold my-5 text-center'>My Payment History : {paymentHistory.length}</p>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-slate-600 text-white'>
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
    );
};

export default PaymentHistory;