import React from "react";
import { LeftPanel, CenterPanel, RightPanel } from "../components/panels";

/**
 * Hello World view component with a 3-column responsive layout
 */
const HelloWorld = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header className="p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold text-gray-900">Hello World</h1>
          </div>
        </div>
      </header>

      {/* Panel Container - fills remaining height */}
      <section className="flex-grow p-4 md:p-6 lg:p-8 pt-0">
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex flex-col md:flex-row gap-4 h-full">
            <LeftPanel />
            <CenterPanel />
            <RightPanel />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;
