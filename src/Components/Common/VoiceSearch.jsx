import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const VoiceSearch = ({ setSearchQuery, setFilteredDoctors, doctors }) => {
    const [isListening, setIsListening] = useState(false);

    const handleVoiceInput = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Sorry, your browser does not support voice recognition.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true); // Show modal
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript); // Update search query with voice input
            setFilteredDoctors(
                doctors.filter((doctor) =>
                    doctor?.name?.toLowerCase().includes(transcript.toLowerCase())
                )
            );
        };

        recognition.onerror = (event) => {
            console.error("Voice recognition error:", event.error);
        };

        recognition.onend = () => {
            setIsListening(false); // Hide modal
        };

        recognition.start(); // Start listening
    };

    return (
        <>
            {isListening && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4 shadow-lg">
                        <FaMicrophone className="text-red-500 text-4xl animate-pulse" />
                        <p className="text-gray-800 font-semibold">Listening... Please speak now.</p>
                    </div>
                </div>
            )}
            <FaMicrophone
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 cursor-pointer`}
                onClick={handleVoiceInput}
            />
        </>
    );
};

export default VoiceSearch;
