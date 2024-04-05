import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:8787/api/v1/user/signin", {
                username: email,
                password: password
            });
            // Assuming backend returns a token upon successful sign-in
            const token = response.data.token;
            // Storing token in localStorage for future requests
            localStorage.setItem('token', token);
            // Redirecting to dashboard upon successful sign-in
            navigate('/dashboard');
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Invalid email or password. Please try again.'); // Set error message
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="harkirat@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="123456"
                        label={"Password"}
                        type="password"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Render error message */}
                    <div className="pt-4">
                        <Button label={"Sign in"} onClick={handleSignIn} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};

export default Signin;
