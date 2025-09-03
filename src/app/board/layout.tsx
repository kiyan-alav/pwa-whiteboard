"use client";
import LeftToolbar from "@/components/common/LeftToolbar";
import TopNavbar from "@/components/common/TopNavbar";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

function BoardLayout({
  children,
  panel,
}: {
  children: React.ReactNode;
  panel: React.ReactNode;
}) {
  const panelSegment = useSelectedLayoutSegment("panel");

  return (
    <main className="bg-gray-50 dark:bg-gray-900 h-screen overflow-hidden transition-colors">
      {/* Top Navbar */}
      <TopNavbar />

      <div className="flex h-full">
        {/* Left Toolbar */}
        <LeftToolbar />

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/*  Canvas Area */}
          <div className="flex-1 relative bg-white dark:bg-gray-900">
            {children}
          </div>

          {/* Right Panel */}
          <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-col shadow-sm hidden lg:flex">
            {/* Panel Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <Link
                href="/board/chat"
                className={`flex-1 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ${
                  panelSegment === "chat" ? "border-b-2 border-primary" : ""
                }`}
                // onclick="switchTab('chat')"
              >
                Chat
              </Link>
              <Link
                href="/board/users"
                className={`flex-1 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ${
                  panelSegment === "users" ? "border-b-2 border-primary" : ""
                }`}
                // onclick="switchTab('users')"
              >
                Users (3)
              </Link>
            </div>
            {panel}
          </div>
        </div>
      </div>
    </main>
  );
}

export default BoardLayout;
