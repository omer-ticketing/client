"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import useRequest from '../../../hooks/useRequest';


const Signup = () => {
	const router = useRouter();
    const { doRequest } = useRequest({
        method: "post",
        url: '/api/users/signout',
		body: {},
        onSuccess: () => router.push("/"),
    });

	useEffect(() => {
		doRequest();
	}, []);

	return <h3>
		Signing you out...
	</h3>
}

export default Signup;