import React, { useState } from "react";
import Calendar from "./Calendar"; // Import the Calendar component
import { useNavigate, useLocation } from "react-router-dom";

const SlotsModel = ({ isOpen, onRequestClose, doctor }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const doctordetails = location.state?.doctor || "";
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState("");
  const [showError, setShowError] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);

  const handleDateSelect = (date, closeCalendar = true) => {
    setSelectedDate(date);
    if (closeCalendar) {
      setIsCalendarOpen(false);
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    if (selectedTime === null) {
      setShowError(true);
    } else {
      navigate("/payment-page", { state: { doctor: doctordetails, selectedDate, selectedTime } });
      onRequestClose();
    }
  };





  const times = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
  ];

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50 p-4 sm:p-6 mt-20">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-[980px] z-60 overflow-y-auto max-h-[80vh] sm:max-h-[90vh]">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Book Appointment</h2>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-base sm:text-lg font-medium mb-2">Select Date</h3>
              <button
                // onClick={handleDateClick}
                className="p-2 bg-gray-200 rounded w-full text-left text-sm sm:text-base"
              >
                {selectedDate ? selectedDate.toDateString() : "Choose Date"}
              </button>
              {isCalendarOpen && (
                <Calendar selectedDate={selectedDate} onDateSelect={(date) => handleDateSelect(date, false)} />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-medium mb-2">Select Time Slot</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    className={`p-2 rounded text-xs sm:text-sm ${selectedTime === time
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {showError && (
            <p className="text-red-500 mt-2">Please select a time slot before booking an appointment.</p>
          )}

          <div className="mt-4 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="bg-gray-300 text-black py-2 px-4 rounded text-xs sm:text-sm" onClick={onRequestClose}>
              Close
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded text-xs sm:text-sm"
              onClick={handleSubmit}
            >
              Submit
            </button>

          </div>
        </div>
      </div>
    )
  );
};

export default SlotsModel;
