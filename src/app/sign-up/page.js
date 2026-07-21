"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CuDialog from "../components/dialog/CuDialog";
import { DaAuthSignUp } from "../services/apis/auth/authServices";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: ""
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [dialogHeader, setDialogHeader] = useState('');

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchSignUp();
    };

    async function fetchSignUp() {
        try {
            const data = await DaAuthSignUp(formData);

            if (data?.hasError) {
                setErrorMessage(data?.message);
                setDialogHeader('Error')
                setShowErrorDialog(true);
            } else {
                setDialogHeader('Success');
                setErrorMessage('Sign up process was successful');
                setShowErrorDialog(true);
                setTimeout(() => router.push('/login'), 2000)
            }
        } catch (err) {
            setDialogHeader('Error')
            setErrorMessage(err.message || err);
            setShowErrorDialog(true);
        }
    };

    return (
        <div
            dir="ltr"
            className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">Create new user</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control text-end"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Please enter your name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Family
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control text-end"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Please enter for last name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">

                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control text-end"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Please Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Phone number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control text-end"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Please Enter your phone number"
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
                            placeholder="please Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Register
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
