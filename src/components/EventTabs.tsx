import React from "react";

interface EventTabsProps {
  selected: string;
  setSelected: (value: string) => void;
}

export const EventTabs: React.FC<EventTabsProps> = ({ selected, setSelected }) => {
  const tabs = [
    { id: "ongoing", label: "Live Events" },
    { id: "future", label: "Upcoming Events" },
    { id: "past", label: "Previous Events" },
  ];

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex border-b gap-2 pb-4 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelected(tab.id)}
            className={`flex-1 py-2 px-4 text-center text-sm sm:text-base font-semibold border-b-2 transition-all bg-blue-50  ${
              selected === tab.id
                ? "border-blue-700  text-white bg-blue-400 "
                :"hover:text-blue-500"
            }`}
            aria-selected={selected === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>


      
    </div>
  );
};
