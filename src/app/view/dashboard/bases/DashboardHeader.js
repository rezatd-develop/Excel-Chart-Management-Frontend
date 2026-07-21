"use client";

import CuButton from "@/app/components/button/CuButton";
import PersianDatePicker from "@/app/components/datePicker/PersianDatePicker";
import { Button } from "@mui/material";
import { useState } from "react";

export default function DashboardHeader(props) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
    };

    const handleEndDateChange = (newDate) => {
        setEndDate(newDate);
    };

    return (
        <div dir="ltr" className="p-1 p-lg-3 p-md-2 p-sm-1 d-flex gap-3">
            <div>
                <div>تاریخ شروع</div>
                <PersianDatePicker onDateChange={handleStartDateChange} />
            </div>
            <div>
                <div>تاریخ پایان</div>
                <PersianDatePicker onDateChange={handleEndDateChange} />
            </div>
            <div className="d-flex" >
                <CuButton variant='contained'
                    onClick={() => (props?.datesChanged(startDate, endDate))}
                    color='primary'>جستجو</CuButton>
            </div>
        </div>
    );
}
