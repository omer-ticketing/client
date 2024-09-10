"use client"
import { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import { useParams } from 'next/navigation';
import { getTimeInSecFromNow } from "../../../utils/clientSideHelpers";

const OrderById = () => {
	const { orderId } = useParams();
	const [order, setOrder] = useState();
	const [timeLeft, setTimeLeft] = useState('');
	
	const { doRequest, errors } = useRequest({
		url: `/api/orders/${orderId}`,
		method: "get",
	});
	
	const fetchOrder = async () => {
		const res = await doRequest();		
		setOrder(res.data.order);
	}

	useEffect(() => {
		fetchOrder();
	}, []);

	useEffect(() => {
		if (!order) {
			return;
		}

		const showTime = () => {
			const timeUntilExpiration = getTimeInSecFromNow(order.expiresAt);
			setTimeLeft(timeUntilExpiration);
		}

		showTime();
		const timer = setInterval(showTime, 1000);
		
		if (timeLeft < 1) {
			clearInterval(timer);
		}
		return () => clearInterval(timer);
	}, [order, timeLeft]);

	if (!order) {
		// TODO implement loading spinner
		return <div>Loading...</div>
	}

	if (timeLeft < 1) {
		return <div>The order has expired</div>
	}

	return <div className="">
		<h1>{order.ticket.title}</h1>
		<h4>{order.ticket.price}</h4>
		<div>You have <strong>{timeLeft}</strong> seconds left to pay for the order</div>
		{errors}
	</div>
}
 
export default OrderById;