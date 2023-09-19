import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
	runtime: 'edge',
};

export default async function handler(req: NextRequest) {
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 40,
					color: 'black',
					background: 'white',
					width: '100%',
					height: '100%',
					padding: '50px 200px',
					textAlign: 'center',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				👋 Hello नमस्ते こんにちは สวัสดีค่ะ 안녕 добрий день Hallá
			</div>
		),
		{
			width: 1200,
			height: 630,
		}
	);
}
