import React from "react";

interface TabItem {
  name: string;
}

interface CustomTabProps {
  allTabs: TabItem[];
  activeTabIndex: number;
  handleTabClick: (index: number) => void;
}

const CustomTab: React.FC<CustomTabProps> = ({ allTabs, activeTabIndex, handleTabClick }) => {
  return (
    <div className="w-full">
      <ul className="flex border-b border-gray-300">
        {allTabs.map((tab, index) => (
          <li key={index} className="md:mr-2">
            <button
              className={`inline-block md:p-4 text-center transition-all ease-in-out duration-500 ${
                activeTabIndex === index
                  ? "text-[#fe373c] border-[#fe373c] px-4 md:px-14 border-b-2 "
                  : "border-transparent hover:border-[#fe373c]"
              }`}
              onClick={() => handleTabClick(index)}
              aria-selected={activeTabIndex === index}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomTab;
