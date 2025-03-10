"use client";
import {useState} from 'react'
import { MoreHorizontal, Plus } from "lucide-react";

const KanbanBoard = () => {
    const sections = ["Task", "Done", "Review"];

    return (
        <div className="flex gap-10 p-6 bg-gray-100 min-h-screen">
            {sections.map((section, index) => (
                <div key={index} className="w-85 bg-white rounded-xl shadow-lg p-4">
                    {/* Section Header */}
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700 font-semibold">{section} <span className="text-gray-500">0</span></span>
                        <div className="flex gap-2">
                            <Plus className="w-5 h-5 text-gray-500 cursor-pointer"/>
                            <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer"/>
                        </div>
                    </div>

                    {/* Task Area */}
                    <div className="h-25 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
                        + Add task
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;