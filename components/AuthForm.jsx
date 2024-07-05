"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation'
import useRequest from "../hooks/useRequest";

const AuthForm = ({ isSignUp }) => {
	const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        method: "post",
        url: `/api/users/sign${isSignUp ? 'up' : 'in'}`,
        body: { email, password },
        onSuccess: () => router.push("/"),
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    };

    const actionText = isSignUp ? "Sign Up" : "Sign In";

    return (
        <form onSubmit={onSubmit}>
            <h1>{actionText}</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {errors}
            <button className="btn btn-primary">{actionText}</button>
        </form>
    );
};

export default AuthForm;
