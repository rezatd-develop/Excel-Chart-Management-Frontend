"use client";

import CuDialog from "@/app/components/dialog/CuDialog";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axiosInstance from "@/app/services/bases/axios";

export default function FileUploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogHeader, setDialogHeader] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const router = useRouter();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setDialogHeader("Error");
            setDialogMessage("Please Select a file");
            setShowDialog(true);
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setIsUploading(true);

            const response = await axiosInstance.post(
                "/files/upload",
                formData
            );

            const result = response.data;

            if (result?.hasError) {
                setDialogHeader("Error");
                setDialogMessage(
                    result?.message || "There is an error while uploading file"
                );
            } else {
                localStorage.setItem("fileId", result.data);

                setDialogHeader("Success");
                setDialogMessage(
                    "File Successfully Uploaded and Id Saved"
                );

                setTimeout(() => {
                    router.push("/dashboard/overview/all-charts");
                }, 2000);
            }

        } catch (err) {
            console.error("Upload error:", err);

            setDialogHeader("Error");
            setDialogMessage("Error in sending file to server");

        } finally {
            setIsUploading(false);
            setShowDialog(true);
        }
    };

    return (
        <div
            dir="ltr"
            className="d-flex align-items-center justify-content-center vh-100 bg-light"
        >
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">Upload file</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">
                            Select file
                        </label>
                        <input
                            type="file"
                            id="file"
                            className="form-control text-end"
                            onChange={handleFileChange}
                            accept=".xlsx,.xls,.csv"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isUploading}
                    >
                        {isUploading ? "Uploading" : "Upload File"}
                    </button>
                </form>
            </div>

            <CuDialog
                isOpen={showDialog}
                dialogHeader={dialogHeader}
                dialogContent={dialogMessage}
                handleClose={() => setShowDialog(false)}
            />
        </div>
    );
}
