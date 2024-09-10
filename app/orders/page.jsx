"use client";

import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import Link from "next/link";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const { doRequest, errors } = useRequest({
        url: "/api/orders",
        method: "get",
    });

    const getOrders = async () => {
        const res = await doRequest();
        setOrders(res.data.orders);
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(({ id, ticket, status }) => (
                        <tr key={id}>
                            <td>{ticket.title}</td>
                            <td>{ticket.price}</td>
                            <td>{status}</td>
							<td>
                                <Link href="orders/[orderId]" as={`orders/${id}`}>
                                    view
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {errors}
        </div>
    );
};

export default Orders;
