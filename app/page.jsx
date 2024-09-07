"use client";

import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import Link from "next/link";

const UserProfilePage = () => {
    const [tickets, setTickets] = useState([]);
    const { errors, doRequest } = useRequest({
        method: "get",
        url: "/api/tickets",
    });

    const fetchTickets = async () => {
        const res = await doRequest();
        if (res?.data?.tickets) {
            setTickets(res.data.tickets);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

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
            {errors}
        </div>
    );
};

export default UserProfilePage;
