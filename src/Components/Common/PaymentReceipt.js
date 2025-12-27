// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';
// import moment from 'moment';

// import { FaAmbulance, FaBed, FaVial, FaReceipt, FaRupeeSign, FaCheckCircle, FaPhoneAlt, FaExclamationTriangle } from "react-icons/fa";


// const PaymentReceipt = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const bookingData = location.state || {};

//   const handleGoBack = () => {
//     navigate('/booking-form');
//   };

//   const handleDownload = () => {
//     const element = document.getElementById("confirmation-container");
//     const opt = {
//       margin: 0.5,
//       filename: 'booking-confirmation.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };
//     html2pdf().from(element).set(opt).save();
//   };

//   return (
//     <>
//       <div className="bg-gray-100 min-h-screen p-2 sm:p-6 flex justify-center items-start">

//         <div id="confirmation-container" className="sm:max-w-[40%] w-[100%] bg-gradient-to-r from-green-400 to-blue-500 shadow-lg rounded-lg sm:p-6 p-4 animate__animated animate__fadeIn animate__delay-1s">
//           {/* Header */}
//           <div className="text-center mb-2">
//             <div className="text-5xl text-white mb-4 animate__animated animate__fadeIn animate__delay-1s">
//               <FaCheckCircle className="mx-auto text-white animate__animated animate__bounceIn" />
//             </div>
//             <h2 className="text-3xl font-semibold text-white">Booking Confirmation</h2>
//             <p className="text-white text-md mt-2"><span className="text-[16px] font-bold text-white">Congratulations</span> your Booking is now Confirmed!</p>
//             <p className="text-white text-md mt-2">
//               📌 <strong>Booking Number:</strong> {bookingData?.data?.bookingNumber}
//               📅 <strong>Appointment Date:</strong> {bookingData?.data?.appointmentDate}
//               ⏰ <strong>Time:</strong> {moment(bookingData?.data?.bookingTime, "HH:mm:ss.SSS").format("hh:mm A")}
//               🏥 <strong>Hospital:</strong> {bookingData?.data?.hospitalDetails?.hospitalName}
//             </p>
//           </div>

//           {/* Booking and Payment Information */}
//           <div className="border-t border-b py-4 mb-2 text-white">
//             <BookingInfo bookingData={bookingData} />
//             <PaymentDetails bookingData={bookingData} />
//           </div>

//           {/* Patient, Doctor, and Hospital Information */}
//           <div className="border-t border-b py-4 mb-2 text-white">
//             <PatientInfo bookingData={bookingData} />
//             <DoctorInfo bookingData={bookingData} />
//             <HospitalInfo bookingData={bookingData} />
//           </div>

//           {/* Action Buttons (Excluded from PDF) */}
//           <div className="no-print">
//             <ActionButtons handleGoBack={handleGoBack} handleDownload={handleDownload} />
//           </div>
//         </div>


//         <div className="bg-white p-6 mx-4 rounded-xl shadow-lg w-full lg:w-1/3">
//           <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Payment Summary</h3>

//             <div className="space-y-4">

//               {/* Payment Amount */}
//               <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
//                 <div className="flex items-center space-x-2">
//                   <FaRupeeSign className="text-green-600 text-xl" />
//                   <span className="text-lg font-medium text-gray-700">Payment Amount:</span>
//                 </div>
//                 <span className="text-lg font-semibold text-gray-900">₹{bookingData?.data?.amount}</span>
//               </div>

//               {/* Payment Status */}
//               <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
//                 <div className="flex items-center space-x-2">
//                   <FaCheckCircle
//                     className={`text-xl ${bookingData?.data?.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}
//                   />
//                   <span className="text-lg font-medium text-gray-700">Payment Status:</span>
//                 </div>
//                 <span className={`text-lg font-semibold ${bookingData?.data?.paymentStatus === 'Paid' ? 'text-green-700' : 'text-red-700'}`}>
//                   {bookingData?.data?.paymentStatus}
//                 </span>
//               </div>

//               {/* Payment ID */}
//               <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
//                 <div className="flex items-center space-x-2">
//                   <FaReceipt className="text-blue-600 text-xl" />
//                   <span className="text-lg font-medium text-gray-700">Payment Id:</span>
//                 </div>
//                 <span className="text-lg font-semibold text-gray-900">{bookingData?.data?.paymentId}</span>
//               </div>

//             </div>
//           </div>




//           <div className="w-full mt-6 bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
//             <h3 className="text-xl font-semibold mb-3 flex items-center justify-center space-x-2 text-gray-800">
//               <FaPhoneAlt className="text-blue-500 text-lg" />
//               <span>Need Help?</span>
//             </h3>

//             <p className="text-gray-600">
//               For support, contact us at:
//               <span className="font-semibold text-gray-800 ml-1">+91 98765 43210</span>
//             </p>

//             <button className="mt-4 flex items-center justify-center space-x-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md">
//               <FaExclamationTriangle className="text-lg" />
//               <span>Change / Cancel Booking</span>
//             </button>
//           </div>





//           <div className="w-full mt-6 bg-white p-6 rounded-xl shadow-lg lg:w-[100%] m-auto">
//             <h3 className="text-xl font-semibold mb-4 text-center">Additional Services</h3>
//             <div className="space-y-4">

//               {/* Ambulance Service */}
//               <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                     <FaAmbulance className="text-green-600 text-2xl" />
//                   </div>
//                   <span className="text-lg font-medium">Need an Ambulance?</span>
//                 </div>
//                 <button className="bg-green-500 text-white px-2 py-2 rounded-lg hover:bg-green-600 transition">
//                   View Options
//                 </button>
//               </div>

//               {/* Hospital Bed Booking */}
//               <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                     <FaBed className="text-blue-600 text-2xl" />
//                   </div>
//                   <span className="text-lg font-medium">Book a Hospital Bed</span>
//                 </div>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//                   Book Now
//                 </button>
//               </div>

//               {/* Home Test Booking */}
//               <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//                     <FaVial className="text-red-600 text-2xl" />
//                   </div>
//                   <span className="text-lg font-medium">Home Tests Available</span>
//                 </div>
//                 <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
//                   Book Test
//                 </button>
//               </div>

//             </div>
//           </div>


//         </div>


//       </div>

//     </>
//   );
// };

// export default PaymentReceipt;