import React from "react";
import { BiTime } from "react-icons/bi";

import Logo from "../assets/logo.png";

function Header() {
    function formatDateTime(dateTime) {
        const date = new Date(dateTime),
            formattedDate = new Intl.DateTimeFormat("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }).format(date),
            parts = formattedDate.split(" at ");

        return parts[0] + " " + parts[1];
    }

    const [time, setTime] = React.useState(formatDateTime(new Date()));

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(formatDateTime(new Date()));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <header className="w-full border-b border-b-gray-200 py-3 px-4">
            <div className="header-container max-w-screen-xl mx-auto flex justify-between items-center">
                <div className="website-logo w-1/2 md:w-1/4 lg:w-1/6">
                    <img src={Logo} alt="intellipark" />
                </div>

                <div className="current-time items-center gap-x-2 hidden md:flex">
                    <BiTime className="text-lg" />
                    <span>{time}</span>
                </div>
            </div>
        </header>
    );
}

export default Header;