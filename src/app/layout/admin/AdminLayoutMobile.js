'use client';

import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminLayoutMobile = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const exitUserClicked = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userFullName');
        router.push('/login');
    };

    return (
        <div dir="ltr" className="w-100 vh-100 bg-light position-relative">
            {/* Top bar */}
            <div className="d-md-none d-flex justify-content-between align-items-center bg-dark text-white p-3">
                <button
                    className="btn btn-outline-light"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <i className="bi bi-list fs-2"></i>
                </button>
                <span className="fw-bold fs-5">Management Dashboard</span>
            </div>

            {/* Sidebar */}
            <div
                className={clsx(
                    "position-fixed top-0 bottom-0 text-white p-3 bg-dark shadow-lg",
                    "transition-all",
                    isOpen ? "end-0" : "end-100",
                )}
                style={{
                    width: "280px",
                    zIndex: 1050,
                    background: "linear-gradient(180deg, #212529 0%, #343a40 100%)",
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="fw-bold fs-5">Menu</span>
                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <ul className="nav nav-pills flex-column mb-auto">
                    {props?.menuItems?.map((item) => (
                        <div key={item?.id}>
                            <li className="nav-item">
                                <Link href={item?.href} className="nav-link text-white fw-semibold">
                                    <i className="bi bi-folder-fill me-2"></i>
                                    {item?.name}
                                </Link>
                            </li>
                            {item?.children?.map((child) => (
                                <li key={child?.id} className="ms-3">
                                    <Link
                                        href={child?.href}
                                        className={clsx(
                                            "nav-link text-white-50",
                                            props?.selectedMenuItem === child?.id && "active bg-primary text-white"
                                        )}
                                    >
                                        <i className="bi bi-chevron-right me-2"></i>
                                        {child?.name}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    ))}
                </ul>

                <div className="mt-auto border-top border-secondary pt-3">
                    <button
                        className="btn btn-outline-light w-100 rounded-pill"
                        onClick={exitUserClicked}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i> Exit
                    </button>
                </div>
            </div>

            <div className="w-100 h-100">{props?.children}</div>
        </div>
    );
};

export default AdminLayoutMobile;
