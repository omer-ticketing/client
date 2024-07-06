import Link from 'next/link';
import { getCurrentUser } from '../app/layout';

export default async () => {
	const currentUser = await getCurrentUser();

	const links = [
		!currentUser && {label: 'Sign Up', href: '/auth/signup'},
		!currentUser && {label: 'Sign In', href: '/auth/signin'},
		currentUser && {label: 'Sign Out', href: '/auth/signout'},
	]
	.filter(link => link)
	.map(({label, href}) => (
		<li key={label} className='nav-item'>
			<Link href={href} className='nav-link'>{label}</Link>
		</li>
	))

	return <nav className="navbar navbar-light bg-light p-2">
		<Link href="/" className='navbar-brand'>GitTix</Link>
		<div className="d-flex justify-content-end">
			<ul className='nav d-flex align-items-center'>
				{links}
			</ul>
		</div>
	</nav>
}