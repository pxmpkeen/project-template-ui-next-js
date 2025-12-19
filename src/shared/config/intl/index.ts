import { createNavigation } from "next-intl/navigation";

import { routing } from "./_routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
export { routing };
