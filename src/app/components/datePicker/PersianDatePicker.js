"use client";

import DatePicker from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

export default function EnglishDatePicker({ onDateChange }) {
    const handleChange = (date) => {
        if (!date) return;

        const formattedDate = date.format("YYYY-MM-DD");

        onDateChange({
            date: formattedDate,
        });
    };

    return (
        <DatePicker
            calendar={gregorian}
            locale={gregorian_en}
            onChange={handleChange}
            calendarPosition="bottom-left"
            style={{
                width: "100%",
                height: "40px",
                fontSize: "16px",
                textAlign: "center",
            }}
        />
    );
}