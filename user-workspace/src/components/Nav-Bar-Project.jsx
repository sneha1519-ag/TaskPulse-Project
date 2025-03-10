"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Share,
    Settings,
    List,
    Clipboard,
    Layout,
    Calendar,
    Workflow,
    MessageCircle,
    Paperclip,
    Plus,
} from "lucide-react";
import { CalendarView } from "@/components/calendar";
import KanbanBoard from "@/components/kanban-board";

const NavBarProject = () => {
    const [activeTab, setActiveTab] = useState("Board");

    // Define menu items with corresponding icons
    const menuItems = [
        { name: "List", icon: List },
        { name: "Overview", icon: Clipboard },
        { name: "Board", icon: Layout },
        { name: "Timeline", icon: Calendar },
        { name: "Dashboard", icon: Workflow },
        { name: "Calendar", icon: Calendar },
        { name: "Workflow", icon: Workflow },
        { name: "Messages", icon: MessageCircle },
        { name: "Files", icon: Paperclip },
    ];

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case "Calendar":
                return (
                    <div className="p-6">
                        <CalendarView />
                    </div>
                );
            case "Board":
                return (
                    <div className="p-6">
                        <KanbanBoard/>
                    </div>
                );
            case "List":
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">List View</h2>
                        <p>Your list content goes here</p>
                    </div>
                );
            default:
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">{activeTab} View</h2>
                        <p>Content for {activeTab} view goes here</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="border-b p-4 bg-white">
                <div className="flex items-center justify-between">
                    {/* Left Section: Title */}
                    <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold">Project Name</div>
                    </div>

                    {/* Right Section: Actions */}
                    <div className="flex items-center gap-3">
                        <Button variant="outline">
                            <Share className="w-4 h-4 mr-2" /> Share
                        </Button>
                        <Button variant="outline">
                            <Settings className="w-4 h-4 mr-2" /> Customize
                        </Button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center space-x-6 text-gray-600 pt-4 overflow-x-auto">
                    {menuItems.map(({ name, icon: Icon }) => (
                        <div
                            key={name}
                            className={`flex items-center gap-1 cursor-pointer pb-2 ${
                                activeTab === name ? "font-semibold text-orange-300 border-b-2 border-orange-300" : ""
                            }`}
                            onClick={() => setActiveTab(name)}
                        >
                            <Icon className="w-4 h-4" /> {name}
                        </div>
                    ))}
                    {/* Add Button */}
                    <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                        <Plus className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-gray-50">{renderContent()}</div>
        </div>
    );
};

export default NavBarProject;
