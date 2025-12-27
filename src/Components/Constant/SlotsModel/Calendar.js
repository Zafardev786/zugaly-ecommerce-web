import React, { useState } from "react";

const Calendar = ({ selectedDate, onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        const days = [];
        for (let i = 1; i <= lastDate; i++) {
            days.push(new Date(year, month, i));
        }

        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentMonth);

    const handleDateClick = (date) => {
        onDateSelect(date);
    };

    return (

        <div className="calendar border rounded p-4 bg-white w-full max-w-[980px] mx-auto">
            <div className="grid grid-cols-3 gap-1 sm:gap-4 mb-2">
                <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="text-sm sm:text-base"
                >
                    Previous
                </button>
                <span className="text-sm sm:text-base mb-12">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="text-sm sm:text-base"
                >
                    Next
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="text-center font-bold text-xs sm:text-sm">
                        {day}
                    </div>
                ))}
                {Array.from({ length: firstDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="text-xs sm:text-sm"></div>
                ))}
                {days.map(day => (
                    <button
                        key={day.toString()}
                        onClick={() => handleDateClick(day)}
                        className={`p-1 sm:p-2 rounded text-xs sm:text-sm ${selectedDate && day.toDateString() === selectedDate.toDateString()
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                            }`}
                    >
                        {day.getDate()}
                    </button>
                ))}
            </div>
        </div>


    );
};

export default Calendar;
