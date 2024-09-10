import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/Header";
import axios from "axios";
import { authServiceUrl, ticketsServiceUrl } from "../utils/constants";
import { AppProvider } from "./appProvider";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { getCookieHeaders } from "../utils/serverSideHelpers";

export const getTickets = async () => {
    try {
		const headers = getCookieHeaders();
        const res = await axios.get(`${ticketsServiceUrl}/api/tickets`, { headers });
        return res.data.data.tickets;
    } catch (error) {
        console.error("Error fetching current tickets:", error.response?.data?.errors || error.message);
        return null;
    }
}

export const getCurrentUser = async () => {
    try {
		const headers = getCookieHeaders();
        const res = await axios.get(`${authServiceUrl}/api/users/current-user`, { headers });
        return res.data.data.user;
    } catch (error) {
        console.error("Error fetching current user:", error.response?.data?.errors || error.message);
        return null;
    }
};

const getInitialData = async () => {
    const user = await getCurrentUser();
    const tickets = !!user && await getTickets();
    return { tickets, user };
};

export default async ({ children }) => {
    const { tickets, user } = await getInitialData();
	
    return (
        <html lang="en">
            <body>
                <ErrorBoundary fallback={<h1>Oops, Something went wrong!</h1>}>
                    <AppProvider initialTickets={tickets} currentUser={user}>
                        <Header />
                        <div className="container">{children}</div>
                    </AppProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
};
