import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Logo() {
	const [logoProps, setLogoProps] = useState({
		src: '/logo.png',
		width: 40,
		height: 40,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			const hour = new Date().getHours();
			if (hour >= 26 && hour < 27) {
				setLogoProps({ src: '/nemure_current.png', width: 60, height: 60 });
			} else {
				setLogoProps({ src: '/logo.png', width: 40, height: 40 });
			}
		}, 1000);
		return () => clearInterval(timer);
	}, []);
	return (
		<div>
			<Link href="/">
				<Image
					src={logoProps.src}
					alt="Logspot"
					width={logoProps.width}
					height={logoProps.height}
				/>
			</Link>
		</div>
	);
}
