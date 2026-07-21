'use client'

import { useEffect, useState } from "react";
import LineChart from "@/app/components/charts/LineChart";
import CuDialog from "@/app/components/dialog/CuDialog";
import AdminLayout from "@/app/layout/admin/AdminLayout";
import { DaOverviewTotalSalesServiceApi } from "@/app/services/apis/dashboard/dashboardServices";
import DashboardHeader from "@/app/view/dashboard/bases/DashboardHeader";
import { useRouter } from "next/navigation";
import DashboardSellerSales from "@/app/view/dashboard/bases/DashboardSellerSales";

const DaOverviewTotalSales = () => {
    const [daOverviewTotalSales, setDaOverviewTotalSales] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [fileId, setFileId] = useState(null);
    const router = useRouter()

    async function fetchDaOverviewTotalSalesService(startDate, endDate) {
        try {
            if (!fileId) {
                setErrorMessage('File id not found, please upload the file first');
                setShowErrorDialog(true);
                return;
            }

            const params = { range: 'daily' };
            if (startDate?.date) params.start = startDate.date;
            if (endDate?.date) params.end = endDate.date;

            const data = await DaOverviewTotalSalesServiceApi(fileId, params);

            if (data?.hasError) {
                setErrorMessage(data?.message || 'There is a problem when fetching data');
                setShowErrorDialog(true);
            } else {
                setDaOverviewTotalSales(data?.data);
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
            fetchDaOverviewTotalSalesService(startDate, endDate);
        } else if (fileId !== null) {
            setErrorMessage('File id not rfound, please upload the file first');
            setShowErrorDialog(true);
            setTimeout(() => router.push('/dashboard/files/upload'), 2000);
        }
    }, [fileId]);

    const datesChanged = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
        fetchDaOverviewTotalSalesService(startDate, endDate);
    };

    return (
        <AdminLayout>
            <div className="p-3 w-100">
                <DashboardSellerSales />

                <DashboardHeader datesChanged={datesChanged} />

                {daOverviewTotalSales ? (
                    <LineChart
                        labels={daOverviewTotalSales?.labels}
                        datasets={daOverviewTotalSales?.datasets}
                    />
                ) : (
                    <p className="text-muted">Loading ...</p>
                )}

                <CuDialog
                    isOpen={showErrorDialog}
                    dialogHeader="Error"
                    dialogContent={errorMessage}
                    handleClose={() => setShowErrorDialog(false)}
                />
            </div>
        </AdminLayout>
    );
};

export default DaOverviewTotalSales;