'use client'

import { useEffect, useState } from "react";
import DoughnutChart from "@/app/components/charts/DoughnutChart";
import CuDialog from "@/app/components/dialog/CuDialog";
import AdminLayout from "@/app/layout/admin/AdminLayout";
import { DaOverviewBookingCountServiceApi } from "@/app/services/apis/dashboard/dashboardServices";
import DashboardHeader from "@/app/view/dashboard/bases/DashboardHeader";
import { useRouter } from "next/navigation";

const DaOverviewBookingCount = () => {
    const [daOverviewBookingCount, setDaOverviewBookingCount] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [fileId, setFileId] = useState(null);
    const router = useRouter();

    async function fetchDaOverviewBookingCountService(id) {
        try {
            const data = await DaOverviewBookingCountServiceApi(id);

            if (data?.hasError) {
                setErrorMessage(data?.message || 'There is a problem when fetching data');
                setShowErrorDialog(true);
            } else {
                setDaOverviewBookingCount(data?.data);
            }
        } catch (err) {
            setErrorMessage(err.message || err);
            setShowErrorDialog(true);
        }
    }

    useEffect(() => {
        const storedFileId = localStorage.getItem('fileId');
        setFileId(storedFileId);

        if (storedFileId) {
            fetchDaOverviewBookingCountService(storedFileId);
        } else {
            setErrorMessage('File id not rfound, please upload the file first');
            setShowErrorDialog(true);
            setTimeout(() => router.push('/dashboard/files/upload'), 2000);
        }
    }, []);

    return (
        <AdminLayout>
            <div className="p-3 w-50 w-lg-50 w-md-50 w-sm-100 d-flex justify-content-center">
                {daOverviewBookingCount ? (
                    <DoughnutChart
                        labels={daOverviewBookingCount?.labels}
                        datasets={daOverviewBookingCount?.datasets}
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

export default DaOverviewBookingCount;
