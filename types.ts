import { Server, Member, Profile } from "./lib/generated/prisma";

export type ServerWithMemberWithProfile = Server & {
    members: (Member & {
        profile: Profile
    })[];
};