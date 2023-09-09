import React from 'react';

const LoginButton = () => {
	return (
		<div className="fixed rounded-full bg-slate-900 bottom-4 right-4 flex items-center justify-center z-50 p-4 hover:bg-slate-300 duration-100">
			<a href="/works" className="text-white font-semibold">
				Login
			</a>
		</div>
	);
};

export default LoginButton;
