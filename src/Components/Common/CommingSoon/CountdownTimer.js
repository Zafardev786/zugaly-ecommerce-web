import { useState, useEffect } from "react";

function CountdownTimer({ targetDate }) {
    const calculateTimeLeft = (targetDate) => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: "00", hours: "00", minutes: "00", seconds: "00" };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex space-x-4 mt-4 text-2xl font-bold">
            <div className="bg-gray-800 p-4 rounded-lg">
                <span>{timeLeft.days}</span>
                <p className="text-sm">Days</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <span>{timeLeft.hours}</span>
                <p className="text-sm">Hours</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <span>{timeLeft.minutes}</span>
                <p className="text-sm">Minutes</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <span>{timeLeft.seconds}</span>
                <p className="text-sm">Seconds</p>
            </div>
        </div>
    );
}

export default CountdownTimer;
