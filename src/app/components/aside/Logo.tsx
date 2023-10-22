import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
	return (
		<div>
			<Link href="/">
				<Image src="/logo.png" alt="Logspot" width={40} height={40} />
			</Link>
		</div>
	);
}
