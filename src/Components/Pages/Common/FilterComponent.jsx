import React, { useState } from 'react';
import SearchBox from '@/components/Common/VoiceSearchBox/SearchBox';
import VoiceSearch from '@/components/Common/VoiceSearchBox/VoiceSearch';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoFilter } from "react-icons/io5";

const FilterComponent = ({
  setOnline,
  title_select,
  searchBox,
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedPaymentStatus,
  setSelectedPaymentStatus,
  statusOptions,
  paymentStatusOptions,
  selectedDate,
  setSelectedDate,
  shiftOption,
  setSelectedShift,
  selectedShift,
  floorOption,
  setSelectedFloor,
  selectedFloor,
  rowOption,
  setSelectedRow,
  selectedRow,
  fromDate,
  setFromDate,
  toDate,
  setToDate
}) => {
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const [iseFilter, setIsFilter] = useState(false);

  const filterChange = () => {
    setIsFilter(!iseFilter);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-2 flex flex-col md:flex-row justify-between items-center mb-2 gap-3">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full">
        {/* Filter Toggle Button */}
        <button
          onClick={filterChange}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
            ${iseFilter ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          <IoFilter size={20} className="mr-0" />
        </button>

        {/* Refresh Toggle */}
        {setOnline && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Refresh</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" onChange={(e) => setOnline(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-300">
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
              </div>
            </label>
            <span className="text-sm font-medium">Now</span>
          </div>
        )}

        {/* Filters */}
        {iseFilter && (
          <>
            {statusOptions && (
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-auto"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                {statusOptions.map((status, index) => (
                  <option key={index} value={status.value}>{status.label || status}</option>
                ))}
              </select>
            )}

            {floorOption && (
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-auto"
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
              >
                <option value="">Select Floor Name</option>
                {floorOption.map((floor) => (
                  <option key={floor.value} value={floor.value}>{floor.label}</option>
                ))}
              </select>
            )}

            {rowOption && (
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-auto"
                value={selectedRow}
                onChange={(e) => setSelectedRow(e.target.value)}
              >
                <option value="">Select Row Name</option>
                {rowOption.map((row) => (
                  <option key={row.value} value={row.value}>{row.label}</option>
                ))}
              </select>
            )}

            {shiftOption && (
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-auto"
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
              >
                <option value="">Select Shift</option>
                {shiftOption.map((shift) => (
                  <option key={shift.value} value={shift.value}>{shift.label}</option>
                ))}
              </select>
            )}

            {paymentStatusOptions && (
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-auto"
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              >
                <option value="">Select Payment Status</option>
                {paymentStatusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            )}

            {selectedDate && (
              <div className="w-full md:w-auto">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM"
                  showMonthYearPicker
                  className="border p-2 rounded w-full md:w-auto"
                />
              </div>
            )}

            {/* Search Box */}
            {searchBox && (
              <div className="relative w-full md:w-auto flex-1">
                <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
                <VoiceSearch setSearchQuery={setSearchQuery} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
