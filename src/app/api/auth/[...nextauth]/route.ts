import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
export const authOptions: AuthOptions = {
	providers: [
		KeycloakProvider({
			idToken: true,
			type: "oauth",
			clientId: process.env.KEYCLOAK_CLIENT_ID,
			clientSecret: "",
			issuer: process.env.KEYCLOAK_ISSUER,
			authorization: {
				params: {
					scope: "openid email profile",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account, profile }) {
			if (account) {
				token.accessToken = account.access_token;
				token.expires_at = account.expires_at;
				token.refresh_token = account.refresh_token;
				return token;
			} else if (Date.now() < token.expires_at * 1000) {
				return token;
			} else {
				if (!token.refresh_token)
					throw new Error("Missing refresh token");
				try {
					console.log("refresh token callback");
					// TODO: Write Keycloak refresh token callback function
					const response = await fetch(
						`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
						{
							method: "POST",
							headers: {
								"Content-Type":
									"application/x-www-form-urlencoded",
							},
							body: new URLSearchParams({
								grant_type: "refresh_token",
								refresh_token: token.refreshToken,
								client_id: process.env.KEYCLOAK_CLIENT_ID,
								client_secret:
									process.env.KEYCLOAK_CLIENT_SECRET,
							}),
						}
					);
					const responseTokens = await response.json();
					if (!response.ok) throw responseTokens;
					return {
						...token,
						access_token: responseTokens.access_token,
						expires_at: Math.floor(
							Date.now() / 1000 +
								(responseTokens.expires_in as number)
						),
						refresh_token:
							responseTokens.refresh_token ?? token.refresh_token,
					};
				} catch (error) {
					console.error("Error refreshing access token", error);
					return {
						...token,
						error: "RefreshAccessTokenError" as const,
					};
				}
			}
		},
		async session(session, token) {
			if (token) {
				session.user = token.user;
				session.accessToken = token.accessToken;
				session.error = token.error;
			}

			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
