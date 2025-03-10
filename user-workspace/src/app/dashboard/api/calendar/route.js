import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
import { NextResponse } from "next/server";

// Set up Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_REDIRECT_URI
);

// Set credentials using refresh token
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Create calendar client
const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const dateParam = searchParams.get("date");

        if (!dateParam) {
            return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
        }

        // Create timeMin and timeMax for the selected date (full day)
        const selectedDate = new Date(dateParam);
        const timeMin = new Date(selectedDate);
        timeMin.setHours(0, 0, 0, 0);

        const timeMax = new Date(selectedDate);
        timeMax.setHours(23, 59, 59, 999);

        // Fetch events from Google Calendar
        const response = await calendar.events.list({
            calendarId: "primary",
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        return NextResponse.json({ events: response.data.items });
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        return NextResponse.json({ error: "Failed to fetch calendar events" }, { status: 500 });
    }
}
