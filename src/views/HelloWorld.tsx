import React from "react";
import { LeftPanel, CenterPanel, RightPanel } from "../components/panels";

const HelloWorld = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="p-4 md:p-6 lg:p-8 pb-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold text-gray-900">Hello World</h1>
          </div>
        </div>
      </header>

      {/* Panel Container */}
      <main className="flex-grow flex overflow-hidden p-4 md:p-6 lg:p-8 pt-4">
        <div className="max-w-7xl mx-auto w-full flex">
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </div>
      </main>
    </div>
  );
};

export default HelloWorld;
