import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const BirthdayNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on('birthdayNotification', user => {
            setNotifications(prevNotifications => [...prevNotifications, user]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="card">
            <div className="card-head">
                <h2>Today's Birthday</h2>
                <span className="las la-user-friends"></span>
            </div>
            <div className="card-content">
                <small>User activity this month</small>
                <div className="card-indicator">
                    {notifications.map((user, index) => (
                        <div key={index} className="indicator four">
                            <span>Happy Birthday to {user.name} ({user.birthday})!</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BirthdayNotifications;
