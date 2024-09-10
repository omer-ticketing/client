import { cookies } from "next/headers";

export const getCookieHeaders = () => {
	const cookieStore = cookies();
    let cookieHeader = cookieStore.toString();
    cookieHeader = decodeURIComponent(cookieHeader);
    const headers = cookieHeader ? { Cookie: cookieHeader } : {};

	return headers;
};