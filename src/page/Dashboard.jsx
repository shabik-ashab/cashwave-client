import { useEffect, useState } from 'react';
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
                    'http://localhost:4000/api/v1/account/balance', 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
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
                {balance !== null ? (
                    <Balance value={balance} />
                ) : (
                    <p>Loading balance...</p>
                )}
                <Users />
            </div>
        </div>
    );
};

export default Dashboard;
