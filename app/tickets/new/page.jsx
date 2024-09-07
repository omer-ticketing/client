"use client"
import { useState } from "react";
import { roundNumber2Digits } from "./helpers";
import useRequest from "../../../hooks/useRequest";
import { useRouter } from "next/navigation";

const NewTicket = ({}) => {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const router = useRouter();

	const { doRequest, errors } = useRequest({ 
		url: "/api/tickets",
		method: "post",
		body: {
			title, price
		},
        onSuccess: () => router.push("/"),
	});

	const handleBlur = () => {
		setPrice(value => roundNumber2Digits(value));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		await doRequest();
	};

	return <div>
		<h1>Create a ticket</h1>
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Title</label>
				<input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
			</div>
			<div className="form-group">
				<label>Price</label>
				<input className="form-control" value={price} onChange={e => setPrice(e.target.value)} onBlur={handleBlur} />
			</div>
			<button className="btn btn-primary">Submit</button>
			{errors}
		</form>
	</div>
}
 
export default NewTicket;