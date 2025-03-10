"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function AuthButton() {
    const handleAuth = () => {
        window.location.href = "/api/auth/google"
    }

    return (
        <Button onClick={handleAuth} className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Connect Google Calendar
        </Button>
    )
}