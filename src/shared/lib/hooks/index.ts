import { useRouter } from "next/navigation";

import { ExpiredTokenError, InvalidTokenError } from "@/shared/config";
import { routes } from "../consts";

function useHandleError(
	externalOnError?: (error: unknown) => void
) {
	const router = useRouter();

	return (error: unknown) => {
		if (error instanceof ExpiredTokenError) {
			router.replace(routes.authError);
			return;
		} else if (error instanceof InvalidTokenError) {
			router.replace(routes.signIn);
			return;
		}

		if (externalOnError) {
			externalOnError(error);
		}
	};
}

export { useHandleError };
