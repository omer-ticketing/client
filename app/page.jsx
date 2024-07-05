import { cookies } from "next/headers";
import axios from "axios";
import { authServiceUrl } from "../utils/constants";

const getCurrentUser = async () =>  {
    const cookieStore = cookies();
    let cookieHeader = cookieStore.toString();
	cookieHeader = decodeURIComponent(cookieHeader);

    try {
        const headers = cookieHeader ? { Cookie: cookieHeader } : {};
		console.log(headers);

        const res = await axios.get(`${authServiceUrl}/api/users/current-user`, { headers });
		console.log({res});
        return res.data.data.user;
    } catch (error) {
        console.error("Error fetching current user:", error.response?.data?.errors || error.message);
        return null;
    }
}

const UserProfilePage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <div>Not logged in</div>;
    }

    return (
        <div>
            <h1>Welcome, {currentUser.email}</h1>
        </div>
    );
};

export default UserProfilePage;
