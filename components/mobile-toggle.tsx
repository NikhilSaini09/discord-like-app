import { Menu } from "lucide-react";

import {
    Sheet, SheetContent, SheetTitle, SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ServerSidebar } from "@/components/server/server-sidebar";
import { Separator } from "@/components/ui/separator";

export const MobileToggle = ({
    serverId
}: {
    serverId: string;
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <Separator orientation="vertical" className="!w-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-md !h-8 md:hidden ml-2 mr-3" />
            <SheetContent side="left" className="p-0 flex flex-row gap-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="w-[72px]">
                    <NavigationSidebar />
                </div>
                <ServerSidebar serverId={serverId} />
            </SheetContent>
        </Sheet>
    );
};