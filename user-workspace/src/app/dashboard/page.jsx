import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import NavBarProject from "@/components/Nav-Bar-Project";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import {HelpCircle, SearchIcon, Star, StarsIcon} from "lucide-react";

export default function Page() {
  return (
    (<SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-neutral-900">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-orange-200" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          </div>
          <div className="flex items-center justify-evenly px-4 rounded-full bg-orange-200 w-96">
            <SearchIcon className="text-neutral-800"/>
            <Input placeholder="Search..." type="text" name="search" className="outline-none border-none bg-transparent placeholder:text-neutral-800 placeholder:italic px-3 py-3 w-full"/>
          </div>
          <div className="absolute top-4 right-6 flex items-center space-x-4">
            <HelpCircle className="text-orange-200 w-6 h-6"/>
            <span className="bg-gradient-to-r from-orange-400 to-pink-500">
              <StarsIcon/>
            </span>
          </div>
        </header>
        {/* NavBarProject Section - Place it here */}
        <NavBarProject />
      </SidebarInset>
    </SidebarProvider>)
  );
}
