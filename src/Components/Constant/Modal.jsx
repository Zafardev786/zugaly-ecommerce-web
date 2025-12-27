import React from 'react';

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed  inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
                <button
                    className="absolute top-3 right-3 text-gray-600"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
