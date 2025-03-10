import dotenv from "dotenv";
dotenv.config();
import { NextResponse } from "next/server";

// Set up Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export async function GET(request) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
        }

        // Exchange authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code);

        // Log refresh token (store securely in a database in production)
        console.log("Refresh token:", tokens.refresh_token);

        // Redirect to homepage after authentication
        return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
        console.error("Error during OAuth callback:", error);
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
    }
}
