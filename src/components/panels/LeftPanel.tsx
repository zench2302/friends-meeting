import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="w-full md:w-1/5 bg-white p-4 overflow-y-auto border-r border-gray-200">
      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        {/* User Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="/default-avatar.png"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {/* User Name */}
        <h2 className="text-xl font-semibold text-gray-800">Jia</h2>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-['Arial']">
          Add on
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-['Arial']">
          Reset
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
