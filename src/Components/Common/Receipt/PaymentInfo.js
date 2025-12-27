// import moment from 'moment';
// import { FaCalendarAlt, FaHashtag, FaClock, FaClipboardCheck, FaExclamationTriangle } from "react-icons/fa";

// const PaymentInfo = ({ bookingData }) => (
//   <div className="bg-gray-100 p-5 rounded-lg shadow-md">
//     <h3 className="text-2xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
//       <FaClipboardCheck className="text-blue-500" />
//       Booking Information
//     </h3>

//     <div className="space-y-3 text-gray-800">
//       <div className="flex justify-between items-center">
//         <span className="flex items-center gap-2"><FaCalendarAlt className="text-green-500" /> Appointment Date:</span>
//         <span className="font-medium">{bookingData?.data?.appointmentDate}</span>
//       </div>

//       <div className="flex justify-between items-center">
//         <span className="flex items-center gap-2"><FaHashtag className="text-blue-500" /> Booking Number:</span>
//         <span className="font-medium">{bookingData?.data?.bookingNumber}</span>
//       </div>

//       <div className="flex justify-between items-center">
//         <span className="flex items-center gap-2"><FaClock className="text-yellow-500" /> Booking Time:</span>
//         <span className="font-medium">{moment(bookingData?.data?.bookingTime, "HH:mm:ss.SSS").format("hh:mm A")}</span>
//       </div>

//       <div className="flex justify-between items-center">
//         <span className="flex items-center gap-2"><FaClipboardCheck className="text-purple-500" /> Booking Status:</span>
//         <span className="font-medium">{bookingData?.data?.bookingStatus}</span>
//       </div>

//       <div className="flex justify-between items-center">
//         <span className="flex items-center gap-2"><FaExclamationTriangle className="text-red-500" /> Issue:</span>
//         <span className="font-medium">{bookingData?.data?.patientDetails?.patientIssue}</span>
//       </div>
//     </div>
//   </div>
// );

// export default PaymentInfo;