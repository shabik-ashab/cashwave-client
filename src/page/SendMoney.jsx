import axios from "axios";
import { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [transferStatus, setTransferStatus] = useState(null);
    const [isTransferring, setIsTransferring] = useState(false); // State to track if transfer is in progress

    const initiateTransfer = async () => {
        if (isTransferring) return; // Prevent multiple transfer requests
        setIsTransferring(true); // Set the state to indicate transfer initiation

        try {
            const response = await axios.post("https://cashwave-cloudflare-hono.shabik-ashab2000.workers.dev/api/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.status === 200) {
                setTransferStatus("success");
            } else {
                setTransferStatus("error");
            }
        } catch (error) {
            console.error("Error initiating transfer:", error);
            setTransferStatus("error");
        } finally {
            setIsTransferring(false); // Reset the state after the transfer request is completed
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div
                    className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
                >
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Amount (in Bdt)
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            {transferStatus !== "success" && (
                                <button onClick={initiateTransfer} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                    Initiate Transfer
                                </button>
                            )}
                            {transferStatus === "success" && (
                                <p className="text-green-600 text-sm text-center">Transfer successful!</p>
                            )}
                            {transferStatus === "error" && (
                                <p className="text-red-600 text-sm text-center">Transfer failed. Please try again.</p>
                            )}
                        </div>
                        <div className="mt-4">
                            <button onClick={() => navigate('/dashboard')} className="rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-gray-300 text-gray-700">
                                Go Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMoney;
