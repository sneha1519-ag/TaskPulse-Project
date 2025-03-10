import dotenv from "dotenv";
dotenv.config();
import { NextResponse } from "next/server";

// Set up Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Define the scopes we need
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

export async function GET() {
    // Generate authentication URL
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent", // Force to get refresh token
    });

    // Redirect to Google's OAuth page
    return NextResponse.redirect(authUrl);
}
