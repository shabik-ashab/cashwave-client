import { Suspense, useEffect, useState } from 'react';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

const Dashboard = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Handle the case where JWT token is not available
                console.error('JWT token not found in localStorage');
                return;
            }

            try {
                const response = await axios.get(
                    'http://localhost:44549/api/v1/account/balance', 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                ); // Assuming the response contains balance data
                setBalance(response.data.balance); // Assuming the response contains balance data
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Suspense fallback={<Loader />}>
                    <BalanceWrapper balance={balance} />
                </Suspense>
                <Users />
            </div>
        </div>
    );
};

const BalanceWrapper = ({ balance }) => {
    if (balance !== null) {
        return <Balance value={balance} />;
    } else {
        throw new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
    }
};

const Loader = () => (
    <div className="flex items-center justify-center h-20">
        <div className="border-t-4 border-blue-500 rounded-full animate-spin h-8 w-8"></div>
    </div>
);

export default Dashboard;
