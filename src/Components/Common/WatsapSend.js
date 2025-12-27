"use client"; // Ensure this is a Client Component

import { useEffect, useState } from "react";
import postApi from "../api/postApi/postApi";
import NotificationModal from "../Constant/NotificationModal/NotificationModal";

const WatsapSend = ({ parsedStudentData, setShowPhoneInput, parsedBookingData, studentInfo }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState(''); // Added email state
    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState({
        isVisible: false,
        message: "",
        type: "", // success or error
    });

    useEffect(() => {
        setPhoneNumber(studentInfo?.mobile)
        // setEmail(studentInfo?.email)
    }, [studentInfo])

    // Handle sending WhatsApp message
    const handleSendWhatsApp = () => {
        if (!phoneNumber || !parsedStudentData) return;

        // Remove any non-digit characters
        const cleanedNumber = phoneNumber.replace(/\D/g, '');

        // Check if number starts with country code, if not add India's code (91)
        const formattedNumber = cleanedNumber.startsWith('91') ? cleanedNumber : `91${cleanedNumber}`;

        // Create a WhatsApp message
        const shareText = `📄 *Payment Receipt Details*:\n\n👉 *Click here to download your Payment Slip:* https://user.edooqate.in/payment-slip/${parsedStudentData}`;

        // Open WhatsApp link
        const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, "_blank");

        // Reset fields
        setShowPhoneInput(false);
        setPhoneNumber('');
        setEmail('');
    };


    // Handle sending email
    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);

        try {
            const endpoint = "users/send-payment-slip";
            const objectData = {
                email: email,
                parsedStudentData: parsedBookingData
            }
            await postApi(endpoint, objectData); // Capture the API response
            // Set success notification
            setNotification({
                isVisible: true,
                message: "Payment slip sent to your email.",
                type: "success",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "email not valid";
            setNotification({
                isVisible: true,
                message: errorMessage,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Enter WhatsApp Number and/or Email</h3>

                {/* Phone Number Input */}
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    maxLength="10"
                />

                <h3 className="text-center">OR</h3>

                {/* Email Input */}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setShowPhoneInput(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    {/* Conditional button text and action */}
                    <button
                        onClick={phoneNumber.length >= 10 ? handleSendWhatsApp : handleSubmitEmail}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        disabled={!phoneNumber && !email} // Disable if neither phone nor email is provided
                    >
                        {phoneNumber.length >= 10 ? 'Send via WhatsApp' : 'Send via Email'}
                    </button>
                </div>
            </div>
            <NotificationModal
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={setShowPhoneInput}
            />
        </div>
    );
};

export default WatsapSend;
