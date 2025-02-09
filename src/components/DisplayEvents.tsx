import React from "react";
import { participateInEvent } from "../utils/requests/ApiServices";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";




interface Event {
  _id: string;
  name: string;
  details: string;
  avatar: string;
  from: string;
  to: string;
  participated?: boolean
}

interface DisplayEventsProps {
  events: Event[];
  selected: string;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  hasNext: boolean
}

const DisplayEvents: React.FC<DisplayEventsProps> = ({
  events,
  selected,
  pageNumber,
  setPageNumber,
  hasNext
}) => {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth()


  const formatTime = (date: string) => {
    const now = new Date();
    const targetDate = new Date(date);
    const totalMilliseconds = targetDate.getTime() - now.getTime();
    const totalMinutes = Math.floor(totalMilliseconds / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
    return `${days}d ${totalHours % 24}h ${totalMinutes % 60}m`;
  };



  const handleParticipate = async (eventId: any) => {
    try {
      const res = await participateInEvent({ eventId })
      if (!res.data.err) {
        toast.success(res.data.msg)

      } else {
        toast.error(res?.data?.msg || "An unexpected error occurred")
      }
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "An unexpected error occurred");
    }
  }


  return (
    <div className="flex flex-col py-5 bg-zinc-50 border px-2">
      <div className="max-w-5xl w-full">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto  my-4 w-full max-w-7xl justify-items-center md:justify-items-start">
            {events.map((event) => (
              <article key={event._id} className="min-w-[256px] max-w-[256px] border border-gray-100 bg-white shadow-sm">
                <img alt="" src={event.avatar} className="h-[140px] w-full object-cover" />
                <div className="p-2 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{event.name}</span>

                  </div>
                  <p className="mt-2 text-justify text-sm text-gray-500">{event.details}</p>

                  {selected === "ongoing" && (
                    <div className="px-4 py-2 text-center">
                      <span className="text-sm">Ends in: </span>
                      <span className="text-xl font-bold text-purple-600">{formatTime(event.to)}</span>
                    </div>
                  )}

                  {selected === "future" && (
                    <div className="px-4 py-2 text-center">
                      <span className="text-sm">Starts in: </span>
                      <span className="text-xl font-bold text-purple-600">{formatTime(event.from)}</span>
                    </div>
                  )}

                  {selected === "past" && (
                    <div className="px-4 pt-3 text-center">
                      <span className="text-md font-bold text-red-600">This event is over</span>
                    </div>
                  )}

                  {event.participated ? (
                    <button className="w-full  text-red-600 px-4 py-2 rounded-sm cursor-not-allowed" disabled>
                      Already Participated
                    </button>
                  ) : (
                    selected !== "future" &&
                    selected !== "past" && (
                      isAuthenticated ? (
                        <button className="w-full bg-lime-500 text-blue-600 px-4 py-2 rounded-sm hover:bg-lime-600" onClick={() => handleParticipate(event._id)}>
                          Participate
                        </button>
                      ) : (
                        <button className="w-full bg-lime-500 text-blue-600 px-4 py-2 rounded-sm hover:bg-lime-600" onClick={() => navigate("login?next=/")}>
                          Login to Participate
                        </button>
                      )

                    )
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-red-600 p-10">No events to show.</div>
        )}

        <div className="flex w-full justify-between">
          <button
            className={`px-4 py-2 mx-1 bg-white rounded-md ${pageNumber === 1 ? "text-gray-500 cursor-not-allowed" : "text-gray-700 hover:bg-sky-500 hover:text-white"
              }`}
            onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>

          <span className="px-4 py-2 text-gray-700 bg-white rounded-md">{pageNumber}</span>

          <button
            className={`px-4 py-2 mx-1 bg-white rounded-md ${!hasNext ? "text-gray-500 cursor-not-allowed" : "text-gray-700 hover:bg-sky-500 hover:text-white"
              }`}
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={!hasNext}>
            Next
          </button>
        </div>
      </div>
    </div >
  );
};

export default DisplayEvents;