import axios from "axios";
import { authServiceUrl } from "../utils/constants";

const Home = ({ currentUser }) => {
    return <h1>You're Signed {currentUser ? 'in' : 'out'}</h1>;
};

export const getServerSideProps = async ({ req }) => {
    try {
        const headers = req.headers.cookie ? { Cookie: req.headers.cookie } : {};
        const res = await axios.get(`${authServiceUrl}/api/users/current-user`, { headers });

        return {
            props: { currentUser: res.data.data.user },
        };
    } catch (error) {
        console.error("Error fetching current user:", error.response.data?.errors);
        return {
            props: { currentUser: null },
        };
    }
};

export default Home;
