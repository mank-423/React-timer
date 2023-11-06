import React, { useEffect, useState } from 'react';
import { TimeContext, useTime } from '../context';
import { useNavigate } from 'react-router-dom';

const Screen2 = () => {
    const { hour, min } = useTime(TimeContext);
    const [hr, setHr] = useState(hour);
    const [mn, setMn] = useState(min);
    const totalTime = hr * 3600 + mn * 60;
    const [remainingTime, setRemainingTime] = useState(totalTime);

    let navigate = useNavigate();

    const updateTime = () => {
        if (remainingTime > 0) {
            setRemainingTime(remainingTime - 1);
        }
    };

    useEffect(() => {
        if (remainingTime === 0) {
            // Timer has reached 0, you can trigger some action here.
            // For example, display a message or fire an event.
            navigate('/');
            return;
        }

        const timer = setInterval(updateTime, 1000);

        // Cleanup function
        return () => {
            clearInterval(timer);
        };
    }, [remainingTime]);

    // Format and display the remaining time
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    // Formatted text
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className="text-white">
            <div className="py-40 md:py-72 lg:p-56">
                <p className="flex justify-center place-items-center text-7xl md:text-8xl lg:text-9xl timer-font">
                    {formattedTime}
                </p>
            </div>
        </div>
    );
};

export default Screen2;
