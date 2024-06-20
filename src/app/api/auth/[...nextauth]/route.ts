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
					// The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
					// at their `/.well-known/openid-configuration` endpoint.
					// i.e. https://accounts.google.com/.well-known/openid-configuration
					const response = await fetch(
						"https://oauth2.googleapis.com/token",
						{
							headers: {
								"Content-Type":
									"application/x-www-form-urlencoded",
							},
							body: new URLSearchParams({
								client_id: process.env.AUTH_GOOGLE_ID!,
								client_secret: process.env.AUTH_GOOGLE_SECRET!,
								grant_type: "refresh_token",
								refresh_token: token.refresh_token!,
							}),
							method: "POST",
						}
					);

					const responseTokens = await response.json();

					if (!response.ok) throw responseTokens;

					return {
						// Keep the previous token properties
						...token,
						access_token: responseTokens.access_token,
						expires_at: Math.floor(
							Date.now() / 1000 +
								(responseTokens.expires_in as number)
						),
						// Fall back to old refresh token, but note that
						// many providers may only allow using a refresh token once.
						refresh_token:
							responseTokens.refresh_token ?? token.refresh_token,
					};
				} catch (error) {
					console.error("Error refreshing access token", error);
					// The error property can be used client-side to handle the refresh token error
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
