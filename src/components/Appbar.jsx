import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Appbar = () => {
    const[user, setUser] = useState("S")
    const navigate = useNavigate();

    useEffect(() => {
        const currUser = localStorage.getItem("currentUser");
        if (currUser) {
            setUser(currUser);
        }
    }, []);

    const handleLogout = () => {
        // Perform logout actions here, such as clearing localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser')
        // Redirect to the sign-in page or any other desired route after logout
        navigate('/signin');
    };

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user[0]}
                    </div>
                </div>
                <button onClick={handleLogout} className="rounded-md h-8 px-3 py-1 bg-red-500 text-white mr-4 mt-3">
                    Logout
                </button>
            </div>
        </div>
    );
};
