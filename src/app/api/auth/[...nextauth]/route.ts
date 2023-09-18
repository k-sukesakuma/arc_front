import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import axios from 'axios';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
		}),
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || '',
		}),
	],
	secret: process.env.NEXTAUTH_SECRET || '',
});
export { handler as GET, handler as POST };
