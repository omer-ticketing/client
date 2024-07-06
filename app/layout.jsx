import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/Header";
import { cookies } from "next/headers";
import axios from "axios";
import { authServiceUrl } from "../utils/constants";

export const getCurrentUser = async () => {
    const cookieStore = cookies();
    let cookieHeader = cookieStore.toString();
    cookieHeader = decodeURIComponent(cookieHeader);

    try {
        const headers = cookieHeader ? { Cookie: cookieHeader } : {};

        const res = await axios.get(`${authServiceUrl}/api/users/current-user`, { headers });
        return res.data.data.user;
    } catch (error) {
        console.error("Error fetching current user:", error.response?.data?.errors || error.message);
        return null;
    }
};

export default async ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
};
