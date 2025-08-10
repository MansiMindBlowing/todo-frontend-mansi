import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import Input from '../../constants/Input'
import Button from '../../constants/Button'

import { loginSuccess } from "../features/auth/authSlice";
import { useState } from "react";
// import { setCredentials } from "../features/auth/authSlice";
// import { FaHospital, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaHospital } from 'react-icons/fa'


const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })
            if (!res.ok) {
                throw new Error("Login failed");
            }
            const data = await res.json();
            console.log(data)
            //   const token = data.accessToken;

            dispatch(loginSuccess({ token: data.accessToken, user: data.user }));

            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role === "admin") {
                navigate("/admin/users");
            } else {
                navigate("/todos")
            }
        } catch (err) {
            console.error(err);
            alert("Invalid email or password");

        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="bg-primary-600 p-3 rounded-full">
                            <FaHospital className="text-white text-3xl" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Welcome to DoctorDost
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to your account to continue
                    </p>
                </div>

                <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* {error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )} */}

                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />

                        <div className="relative">
                            <Input
                                label="Password"
                               
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                            // onClick={() => setShowPassword(!showPassword)}
                            >
                              
                            </button>
                        </div>


                        <Button
                            className='primary'
                        >
                            Login
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    )
}





export default LoginPage;
