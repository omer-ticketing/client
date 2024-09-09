"use client"

import { useAppContext } from "../../appProvider";
import { usePathname, useParams } from 'next/navigation';

const TicketById = () => {
	const { ticketId } = useParams();
	const { tickets } = useAppContext();

	const ticket = tickets.find(ticket => ticket.id === ticketId);
	if (!ticket) {
		return <h2>Ticket was not found!</h2>
	}

	return <div>
		<h2>{ticket.title}</h2>
		<b>{ticket.price}</b>
	</div>
}
 
export default TicketById;