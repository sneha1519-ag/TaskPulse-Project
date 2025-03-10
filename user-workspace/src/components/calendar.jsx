"use client";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin } from "lucide-react";

export function CalendarView() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (date) {
            fetchEvents(date);
        }
    }, [date]);

    const fetchEvents = async (selectedDate) => {
        setLoading(true);
        try {
            const formattedDate = selectedDate.toISOString().split("T")[0];

            const response = await fetch(`/api/calendar?date=${formattedDate}`);
            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }

            const data = await response.json();
            setEvents(data.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatEventTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar Selection Card */}
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Select Date</CardTitle>
                    <CardDescription>Choose a date to view events</CardDescription>
                </CardHeader>
                <CardContent>
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </CardContent>
            </Card>

            {/* Events Display Card */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Events for {date?.toLocaleDateString()}</CardTitle>
                    <CardDescription>Your scheduled events for the selected date</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-1/4" />
                                </div>
                            ))}
                        </div>
                    ) : events.length > 0 ? (
                        <div className="space-y-4">
                            {events.map((event) => (
                                <div key={event.id} className="border rounded-lg p-4">
                                    <h3 className="font-medium text-lg">{event.summary}</h3>
                                    {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>
                      {formatEventTime(event.start.dateTime)} - {formatEventTime(event.end.dateTime)}
                    </span>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No events scheduled for this date.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default CalendarView;
