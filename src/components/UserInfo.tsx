import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomTab from "./CustomTab";
import UserData from "./UserData";
import { fetchAllParticipatedEvents } from "../utils/requests/ApiServices";
// import DisplayParticipated from "./DisplayParticipated";

// Define Tab Interface
interface Tab {
    name: string;
}

const allTabs: Tab[] = [
    { name: "Account" },
    { name: "Your Events" },
];


const UserInfo: React.FC = () => {
    const navigate = useNavigate();
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
    const [events, setEvents] = useState<any[]>([]);

    const getEventData = async () => {
        try {
            const { data } = await fetchAllParticipatedEvents();
            if (data.err) {
                toast.error("Failed to fetch user participated events")
                return;
            }
            const events = data.events;
            console.log(events)
            setEvents(events);
        } catch (error) {
            console.error(error);
            toast.error("Error occurred while fetching event data.");
        }
    };


    const handleTabClick = (index: number) => {
        if (index >= 0) {
            setActiveTabIndex(index);
            if (index === 1) {
                navigate(`/me?view=event`);

            } else {
                navigate("/me");
            }
        }
    };



    useEffect(() => {
        getEventData();
    }, []);

    return (
        <div className="flex flex-col items-center bg-gray-100 p-5 pb-14 min-h-screen ">
            <div className="max-w-6xl bg-white  w-full rounded-md min-h-[80vh]">
                <CustomTab allTabs={allTabs} activeTabIndex={activeTabIndex} handleTabClick={handleTabClick} />

                {activeTabIndex === 0 ? (
                    <div className="flex justify-center">
                        <div className="sm:grid sm:grid-cols-4">
                            <div className="px-6 py-10">
                                <img
                                    className="rounded-full"
                                    src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                    alt="User Avatar"
                                />
                            </div>
                            <div className="col-span-3">
                                <UserData />
                            </div>
                        </div>
                    </div>
                ) : activeTabIndex === 1 ?

                    events.length > 0 ? (
                        <div className=" px-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto my-10 w-full max-w-7xl justify-items-center md:justify-items-start">
                            {events.map((event) => (
                                <article key={event.eventId._id} className="min-w-[256px] max-w-[256px] border border-gray-100 bg-white shadow-sm">
                                    <img alt="" src={event.eventId.avatar} className="h-[140px] w-full object-cover" />
                                    <div className="p-2 sm:p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">{event.eventId.name}</span>

                                        </div>
                                        <p className="mt-2 text-justify text-sm text-gray-500">{event.eventId.details}</p>



                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-red-600 p-10">No events to show.</div>
                    ) : null
                }
            </div>
        </div>
    );
};

export default UserInfo;
