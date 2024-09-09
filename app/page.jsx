"use client";

import Link from "next/link";
import { useAppContext } from "./appProvider";

const UserProfilePage = () => {
	const { tickets, user } = useAppContext();
	if (!user) {
		return <div>You need to log in</div>
	}

	if (!tickets) {
		return <div>You have no tickets yet</div>
	}

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(({ id, title, price }) => (
                        <tr key={id}>
                            <td>{title}</td>
                            <td>{price}</td>
                            <td>
                                <Link href="tickets/[ticketId]" as={`tickets/${id}`}>view</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {errors} */}
        </div>
    );
};

export default UserProfilePage;
