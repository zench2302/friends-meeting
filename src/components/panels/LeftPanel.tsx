import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="w-full md:w-1/5 bg-white rounded-lg shadow-sm p-4 overflow-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Left Panel</h2>
      {/* Add your left panel content here */}
    </div>
  );
};

export default LeftPanel;
