import React, { useState } from "react";
import NotificationModal from "../Constant/NotificationModal/NotificationModal";

const TestNotification = () => {
    const [notification, setNotification] = useState({
        isVisible: true,
        message: "This is a test notification!",
        type: "success",
    });

    return (
        <NotificationModal
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={() => setNotification({ ...notification, isVisible: false })}
        />
    );
};

export default TestNotification;
