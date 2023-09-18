import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ChapterCards() {
	const pathname = usePathname();
	const slug = pathname.substring(7);
	return <div></div>;
}
