import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-model";

const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general",
                },
                take: 1,
            },
        },
    });

    if (server) {
        const initialChannel = server.channels[0];
        if (initialChannel) {
            return redirect(`/servers/${server.id}/channels/${initialChannel.id}`);
        }
        return redirect(`/servers/${server.id}`);
    }

    return (
        <div>
            <InitialModal />
        </div>
    );
}

export default SetupPage;