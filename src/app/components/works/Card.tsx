import React from 'react';
import Motion from '@/app/components/motionWrapper/motionWrapper';
import { useSession } from 'next-auth/react';
import TrialButton from './TrialButton';
import BasicButton from './BasicButton';
import InterMediateButton from './InterMediateButton';
import AdvancedButton from './AdvancedButton';
import Header from './Header';

export default function Card() {
	const { data: session, status } = useSession();
	return (
		<div>
			<Header />
			<Motion>
				<div className="flex justify-around">
					<TrialButton />
					<BasicButton />
				</div>
				<div className="flex justify-around">
					<InterMediateButton />
					<AdvancedButton />
				</div>
			</Motion>
		</div>
	);
}
