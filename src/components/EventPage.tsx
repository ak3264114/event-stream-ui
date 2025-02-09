import React, { useEffect, useState } from "react";
import { fetchEvents } from "../utils/requests/ApiServices";
import Loading from "./Loading";
import { EventTabs } from "./EventTabs";
import DisplayEvents from "./DisplayEvents";





interface Event {
    _id: string;
    name: string;
    details: string;
    avatar: string;
    from: string;
    to: string;
    participated?: boolean
}


const EventPage: React.FC = () => {
    const [selected, setSelected] = useState<string>("ongoing");
    const [eventsToShow, setEventsToShow] = useState<Event[] | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [hasNext, setHasNext] = useState<boolean>(false);

    const getEventData = async () => {
        try {
            const { data } = await fetchEvents({
                timeStatus: selected,
                pageNo: pageNumber,
            });
            setEventsToShow(data.events);
            setHasNext(data.hasNext)
        } catch (error) {
            console.log("Error occurred in fetching event data");
        }
    };


    useEffect(() => {
        getEventData();
    }, [selected, pageNumber]);




    return eventsToShow ? (
        <div className="bg-gray-50">
            <div className="w-full max-w-7xl mx-auto px-4 py-8">
                <EventTabs selected={selected} setSelected={setSelected} />
                <DisplayEvents events={eventsToShow} pageNumber={pageNumber} selected={selected} setPageNumber={setPageNumber} hasNext={hasNext} />
            </div>
        </div>
    ) : (
        <Loading />
    )
}


export default EventPage;
