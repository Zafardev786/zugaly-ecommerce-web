import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';

const slotsDataFromAPI = [
    { id: 1, status: 'available' },
    { id: 2, status: 'booked' },
    { id: 3, status: 'available' },
    { id: 4, status: 'available' },
    { id: 5, status: 'available' },
    { id: 6, status: 'booked' },
    { id: 7, status: 'available' },
    { id: 8, status: 'booked' },
    { id: 9, status: 'available' },
    { id: 10, status: 'available' },
    { id: 11, status: 'available' },
    { id: 12, status: 'booked' },
    { id: 13, status: 'available' },
    { id: 14, status: 'available' },
    { id: 15, status: 'booked' },
    { id: 16, status: 'available' },
    { id: 17, status: 'available' },
    { id: 18, status: 'booked' },
    { id: 19, status: 'available' },
    { id: 20, status: 'available' },
    { id: 21, status: 'available' },
    { id: 22, status: 'booked' },
    { id: 23, status: 'available' },
    { id: 24, status: 'available' },
    { id: 25, status: 'available' },
    { id: 26, status: 'booked' },
    { id: 27, status: 'available' },
    { id: 28, status: 'available' },
    { id: 29, status: 'booked' },
    { id: 30, status: 'available' },
    { id: 31, status: 'available' },
    { id: 32, status: 'booked' },
    { id: 33, status: 'available' },
    { id: 34, status: 'available' },
    { id: 35, status: 'booked' },
    { id: 36, status: 'available' },
    { id: 37, status: 'available' },
    { id: 38, status: 'booked' },
    { id: 39, status: 'available' },
    { id: 40, status: 'booked' }
];

const BookingSlots = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime, onClose, onAddAppointment }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(true);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        setSlots(slotsDataFromAPI);
    }, []);

    const handleDateClick = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        // setIsCalendarOpen(false);
    };

    const handleTimeClick = (slotId) => {
        setSelectedTime(slotId);
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 bg-gray-100 min-h-screen z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-1">
                <h2 className="text-2xl font-semibold mb-4">Select Appointment Slot</h2>
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-base sm:text-lg font-medium mb-2">Select Date</h3>
                        <button
                            // onClick={handleDateClick}
                            className="p-2 bg-gray-200 rounded text-left text-sm sm:text-base"
                        >
                            {selectedDate ? selectedDate.toDateString() : "Choose Date"}
                        </button>
                        {isCalendarOpen && (
                            <div className="mt-4">
                                <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
                            </div>
                        )}
                    </div>
                    <div className="w-full lg:w-1/2 mt-12">
                        <h3 className="text-base sm:text-lg font-medium mb-2">Select Time Slot</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => handleTimeClick(slot.id)}
                                    className={`p-2 rounded text-xs sm:text-sm ${slot.status === 'booked'
                                        ? "bg-red-500 text-white cursor-not-allowed"
                                        : selectedTime === slot.id
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black"
                                        }`}
                                    disabled={slot.status === 'booked'}
                                >
                                    {slot.id}
                                </button>
                            ))}
                        </div>
                        
                    </div>
                    
                </div>
                <div className="position relative bottom-60 mt-1 space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded text-sm sm:text-base"
                    >
                        Close
                    </button>
                    <button
                        onClick={onAddAppointment}
                        className="px-4 py-2 bg-blue-500 text-white rounded text-sm sm:text-base"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingSlots;
