import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const Dropdown = ({ setMeja }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Pilih Meja");

  const options = ["Meja 1", "Meja 2", "Meja 3", "Meja 4"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setMeja(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <a
          onClick={toggleDropdown}
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:bg-orange-500 focus:outline-none focus:ring-2"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>{selectedOption}</span>
          <FaCaretDown className="ml-2 h-5 w-5" />
        </a>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right transform rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-transform">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition duration-200 hover:bg-indigo-600 hover:text-white"
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
