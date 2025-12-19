import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { stores } from "@/shared/lib";
import type { User, UserState } from "./_types";

const useUserStore = create<UserState>()(
    devtools(
        (set) => ({
            user: undefined,
            setUser: (user) => set({ user }, false, "user/setUser"),
            clearUser: () => set({ user: undefined }, false, "user/clearUser"),
        }),
        { name: stores.userStore },
    ),
);

export type { User, UserState };
export { useUserStore };
