"use client";

import { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Importing icons for success and error

const NotificationModal = ({ message, type, isVisible, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Trigger entry animation
      setIsAnimating(true);

      // Check if the Notification API is supported
      if (typeof window !== "undefined" && "Notification" in window) {
        if (Notification.permission === "default") {
          Notification.requestPermission().catch((error) => {
            console.error("Notification permission request failed:", error);
          });
        }

        if (Notification.permission === "granted") {
          try {
            new Notification(message, {
              body: type === "success" ? "Success notification!" : "Error notification!",
              icon: "/notification-icon.png", // Optional: Add an icon in the public folder
            });
          } catch (error) {
            console.error("Notification API error:", error);
          }
        }
      }

      // Play notification sound (only if Audio is supported)
      if (typeof window !== "undefined" && "Audio" in window) {
        const audio = new Audio("/best-notification-1-286672.mp3"); // Path from public folder
        audio.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }

      // Start fade-out animation and close modal after delay
      const timer = setTimeout(() => {
        setIsAnimating(false); // Trigger exit animations
        setTimeout(() => {
          onClose(); // Close the modal
        }, 500); // Exit animation duration (500ms)
      }, 2500); // Visible for 2.5 seconds before closing

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isVisible, onClose, message, type]);

  // Do not render if the modal is not visible and not animating
  if (!isVisible && !isAnimating) return null;

  // Determine the icon based on the notification type
  const icon = type === "success" ? (
    <FaCheckCircle className="text-black text-3xl" />
  ) : (
    <FaExclamationCircle className="text-black text-3xl" />
  );

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-2xl transition-all transform duration-500 ease-out ${
        isAnimating
          ? "opacity-100 scale-105 translate-y-0" // Bounce-in effect
          : "opacity-0 scale-90 -translate-y-4" // Fade-out and shrink
      } ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
      style={{
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25)", // Premium shadow for depth
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-white rounded-full">{icon}</div>
        <p className="font-semibold text-lg tracking-wide">{message}</p>
      </div>
    </div>
  );
};

export default NotificationModal;