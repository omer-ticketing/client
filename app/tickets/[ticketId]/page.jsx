"use client"
import { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import { useParams, useRouter } from 'next/navigation';

const TicketById = () => {
	const { ticketId } = useParams();
	const [ticket, setTicket] = useState();
	const router = useRouter();
	
	const { doRequest: doRequestGetTicket, errors: ticketErrs } = useRequest({
		url: `/api/tickets/${ticketId}`,
		method: "get"
	});

	const { doRequest: doRequestCreateOrder, errors: orderErrs } = useRequest({
		url: '/api/orders/',
		method: "post",
		body: {
			ticketId
		},
        onSuccess: (data) => router.push(`/orders/${data.data.order.id}`),
	});
	
	const fetchTicket = async () => {
		const res = await doRequestGetTicket();
		setTicket(res.data.ticket);
	}

	const createOrder = async () => {
		await doRequestCreateOrder();
	}

	useEffect(() => {
		fetchTicket();
	}, []);

	if (!ticket) {
		// TODO implement loading spinner
		return <div>Loading...</div>
	}

	return <div className="">
		<h1>{ticket.title}</h1>
		<h4>{ticket.price}</h4>
		<button className="btn btn-primary" onClick={createOrder}>Purchase</button>
		{ticketErrs}
		{orderErrs}
	</div>
}
 
export default TicketById;