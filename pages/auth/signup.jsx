import { useState } from "react";
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post('/api/users/signup', {
			email, password
		})
	};

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};

export default Signup;
