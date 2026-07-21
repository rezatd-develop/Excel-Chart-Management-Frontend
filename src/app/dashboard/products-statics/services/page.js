'use client'

import { useEffect, useState } from "react";
import DoughnutChart from "@/app/components/charts/DoughnutChart";
import CuDialog from "@/app/components/dialog/CuDialog";
import AdminLayout from "@/app/layout/admin/AdminLayout";
import { DaProductsStaticsServicesServiceApi } from "@/app/services/apis/dashboard/dashboardServices";
import { useRouter } from "next/navigation";

const DaProductStaticsServices = () => {
    const [daProductStatics, setDaProductStatics] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const router = useRouter()

    async function fetchDaProductStaticsServicesService(fileId) {
        try {
            if (!fileId) {
                setErrorMessage('File id not found, please upload the file first');
                setShowErrorDialog(true);
                return;
            }

            const data = await DaProductsStaticsServicesServiceApi(fileId);

            if (data?.hasError) {
                setErrorMessage(data?.message || 'There is a problem when fetching data');
                setShowErrorDialog(true);
            } else {
                setDaProductStatics(data?.data);
            }
        } catch (err) {
            setErrorMessage(err.message || err);
            setShowErrorDialog(true);
        }
    }

    useEffect(() => {
        const storedFileId = localStorage.getItem('fileId');

        if (storedFileId) {
            fetchDaProductStaticsServicesService(storedFileId);
        } else {
            setErrorMessage('File id not rfound, please upload the file first');
            setShowErrorDialog(true);
            setTimeout(() => router.push('/dashboard/files/upload'), 2000);
        }
    }, []);

    return (
        <AdminLayout>
            <div className="p-3 w-50 w-lg-50 w-md-50 w-sm-100 d-flex justify-content-center">
                {daProductStatics ? (
                    <DoughnutChart
                        labels={daProductStatics?.labels}
                        datasets={daProductStatics?.datasets}
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

export default DaProductStaticsServices;
