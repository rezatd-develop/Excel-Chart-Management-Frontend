'use client';

import { useEffect, useState } from "react";
import CuDialog from "@/app/components/dialog/CuDialog";
import { DaOverviewGetSellerSales } from "@/app/services/apis/dashboard/dashboardServices";
import { useRouter } from "next/navigation";

const modernPalette = [
    ["#3a86ff", "#8338ec"],  // Ocean Blue → Purple
    ["#ff6b6b", "#ff9f1c"],  // Sunset Red → Orange
    ["#2ec4b6", "#0a9396"],  // Mint → Teal
    ["#9d4edd", "#6a4c93"],  // Violet → Dark Violet
    ["#f72585", "#b5179e"],  // Pink → Purple
    ["#7209b7", "#560bad"],  // Deep Purple → Indigo
    ["#4cc9f0", "#4361ee"],  // Light Blue → Blue
];

const DashboardSellerSales = () => {
    const [sellerSales, setSellerSales] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [fileId, setFileId] = useState(null);
    const router = useRouter();

    async function fetchSellerSales(startDate, endDate) {
        try {
            if (!fileId) {
                setErrorMessage('File id not found, please upload the file first');
                setShowErrorDialog(true);
                return;
            }

            const params = {};
            if (startDate?.date) params.start = startDate.date;
            if (endDate?.date) params.end = endDate.date;

            const data = await DaOverviewGetSellerSales(fileId, params);

            if (data?.hasError) {
                setErrorMessage(data?.message || 'There is a problem when fetching data');
                setShowErrorDialog(true);
            } else {
                setSellerSales(data?.data || []);
            }
        } catch (err) {
            setErrorMessage(err.message || err);
            setShowErrorDialog(true);
        }
    }

    useEffect(() => {
        const storedFileId = localStorage.getItem('fileId');
        setFileId(storedFileId);
    }, []);

    useEffect(() => {
        if (fileId) {
            fetchSellerSales(startDate, endDate);
        } else if (fileId !== null) {
            setErrorMessage('File id not rfound, please upload the file first');
            setShowErrorDialog(true);
            setTimeout(() => router.push('/dashboard/files/upload'), 2000);
        }
    }, [fileId]);

    const datesChanged = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        fetchSellerSales(start, end);
    };

    return (
        <div className="mt-4 mb-5">
            {sellerSales?.length > 0 ? (
                <div className="row g-4">
                    {sellerSales.map((seller, index) => {
                        const gradient = modernPalette[index % modernPalette.length];
                        return (
                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div
                                    className="card text-white rounded-4 shadow-lg border-0 h-100 d-flex justify-content-center align-items-center p-3"
                                    style={{
                                        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    }}
                                >
                                    <div className="card-body text-center">
                                        <h6 className="fw-semibold mb-2">{seller.name}</h6>
                                        <h5 className="fw-bold">{seller.amount.toLocaleString()} &</h5>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-muted text-center mt-5">
                    داده‌ای برای نمایش وجود ندارد.
                </p>
            )}

            <CuDialog
                isOpen={showErrorDialog}
                dialogHeader="Error"
                dialogContent={errorMessage}
                handleClose={() => setShowErrorDialog(false)}
            />
        </div>
    );
};

export default DashboardSellerSales;
