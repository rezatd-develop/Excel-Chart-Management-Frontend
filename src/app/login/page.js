"use client";

import { useState } from "react";
import CuDialog from "../components/dialog/CuDialog";
import { DaAuthSignIn } from "../services/apis/auth/authServices";
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [dialogHeader, setDialogHeader] = useState('');

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchLogin();
    };

    async function fetchLogin() {
        try {
            const data = await DaAuthSignIn({
                username: formData.username,
                password: formData.password
            });

            if (data?.hasError) {
                setErrorMessage(data?.message);
                setDialogHeader('Error')
                setShowErrorDialog(true);
            } else {
                localStorage.setItem('token', data.data?.token);
                localStorage.setItem('userFullName', data.data?.userFullName);
                setTimeout(() => router.push('/dashboard/overview/all-charts'), 2000);
                setDialogHeader('Success');
                setErrorMessage("You've logged in");
                setShowErrorDialog(true);
            }
        } catch (err) {
            setErrorMessage(err.message || err);
            setShowErrorDialog(true);
            setDialogHeader('Error');
        }
    };

    return (
        <div
            dir="ltr"
            className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control text-end"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control text-end"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-2">
                        Login
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        onClick={() => router.push('/sign-up')}
                    >
                        Create Account
                    </button>
                </form>
            </div>

            <CuDialog
                isOpen={showErrorDialog}
                dialogHeader={dialogHeader}
                dialogContent={errorMessage}
                handleClose={() => setShowErrorDialog(false)}
            />
        </div>
    );
}
