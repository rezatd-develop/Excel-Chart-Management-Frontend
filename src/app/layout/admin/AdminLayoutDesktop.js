'use client';

import CuButton from "@/app/components/button/CuButton";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getPdfReportsService } from "@/app/services/apis/files/filesServices";

const AdminLayoutDesktop = (props) => {
    const [persianDateTime, setPersianDateTime] = useState("");
    const router = useRouter();

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
                timeStyle: "medium",
            });
            setPersianDateTime(formatter.format(now));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const exitUserClicked = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userFullName');
        router.push('/login');
    };



    const pdfReportClicked = async () => {
        try {
            const fileId = localStorage.getItem('fileId');
            if (!fileId) return;

            const response = await getPdfReportsService(fileId, {}, true); // params={}, isFile=true

            // convert blob to download
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `report_${fileId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
        }
    };




    return (
        <div dir="ltr" className="d-flex min-vh-100 bg-light">
            {/* Sidebar */}
            <div
                className="d-flex flex-column flex-shrink-0 p-3 text-white"
                style={{
                    width: "280px",
                    minHeight: "100vh",
                    background: "linear-gradient(180deg, #212529 0%, #343a40 100%)",
                    backdropFilter: "blur(6px)",
                }}
            >
                <div className="mb-4 text-center">
                    <span className="fs-4 fw-bold text-light">Management Dashboard</span>
                </div>

                <ul className="nav nav-pills flex-column mb-auto">
                    {props?.menuItems?.map((item) => (
                        <div key={item?.id}>
                            <li className="nav-item">
                                <Link
                                    href={item?.href}
                                    className="nav-link text-white fw-semibold px-3 py-2 rounded-3 mb-1 sidebar-link"
                                >
                                    <i className="bi bi-folder-fill me-2"></i>
                                    {item?.name}
                                </Link>
                            </li>
                            {item?.children?.map((child) => (
                                <li key={child?.id} className="ms-3">
                                    <Link
                                        href={child?.href}
                                        className={clsx(
                                            "nav-link px-3 py-2 rounded-3 mb-1 sidebar-link",
                                            props?.selectedMenuItem === child?.id
                                                ? "active text-white bg-primary shadow-sm"
                                                : "text-white-50"
                                        )}
                                    >
                                        <i className="bi bi-chevron-left me-2"></i>
                                        {child?.name}
                                    </Link>
                                </li>
                            ))}
                        </div>
                    ))}
                </ul>

                <div className="mt-auto pt-3 border-top border-secondary text-center">
                    <button
                        className="btn btn-outline-light w-100 rounded-pill mt-3"
                        onClick={exitUserClicked}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i> Exit
                    </button>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex-grow-1 d-flex flex-column">
                <div className="bg-white shadow-sm d-flex p-3 justify-content-between align-items-center border-bottom">
                    <div className="d-flex gap-2">
                        <CuButton
                            variant="contained"
                            size="large"
                            onClick={() => router.push('/dashboard/files/upload')}
                            color="primary"
                        >
                            Change Excel File
                        </CuButton>
                        <CuButton
                            variant="contained"
                            size="large"
                            onClick={() => router.push('/dashboard/files/upload')}
                            color="warning"
                        >
                            Excel File
                        </CuButton>
                        <CuButton
                            variant="contained"
                            size="large"
                            onClick={pdfReportClicked}
                            color="warning"
                        >
                            Pdf reports
                        </CuButton>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="text-end">
                            <div className="fw-semibold">
                                {localStorage.getItem('userFullName')} Welcome
                            </div>
                            <small className="text-muted">{persianDateTime}</small>
                        </div>
                    </div>
                </div>

                <div className="flex-grow-1 overflow-auto p-4 bg-light">
                    {props?.children}
                </div>
            </div>

            <style jsx>{`
                .sidebar-link {
                    transition: all 0.3s ease;
                }
                .sidebar-link:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateX(-5px);
                }
                .sidebar-link.active {
                    background: linear-gradient(90deg, #0d6efd, #007bff);
                }
            `}</style>
        </div>
    );
};

export default AdminLayoutDesktop;
