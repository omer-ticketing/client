import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState([]);

    const doRequest = async () => {
        try {
			setErrors([]);
            const { data } = await axios[method](url, body);
			onSuccess && onSuccess();
            return data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map(({ message }) => (
                            <li key={message}>{message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};
