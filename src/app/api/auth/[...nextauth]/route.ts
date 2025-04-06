import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        accessToken: { label: 'accessToken', type: 'text' },
        refreshToken: { label: 'refreshToken', type: 'text' },
        role: { label: 'role', type: 'text' },
        isTempUser: { label: 'isTempUser', type: 'text' },
        oauthEmail: { label: 'oauthEmail', type: 'text' },
        provider: { label: 'provider', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.accessToken || !credentials?.refreshToken || !credentials?.role) {
          return null;
        }

        // 이미 인증 정보가 있는 경우 그대로 반환
        return {
          id: 'id', // 필수 반환값
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,
          role: credentials.role,
          isTempUser: credentials.isTempUser === 'true',
          oauthEmail: credentials.oauthEmail,
          provider: credentials.provider,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // 초기 로그인 시 토큰에 사용자 정보 추가
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;

        if (user.isTempUser && user.oauthEmail && user.provider) {
          token.isTempUser = user.isTempUser;
          token.oauthEmail = user.oauthEmail;
          token.provider = user.provider;

          const currentTime = Math.floor(Date.now() / 1000);
          token.exp = currentTime + 15 * 60; // 15분 후 만료
        }
      }

      // useSession의 update 트리거 시 토큰 정보 갱신
      if (trigger === 'update' && session) {
        if (session.accessToken) token.accessToken = session.accessToken;
        if (session.refreshToken) token.refreshToken = session.refreshToken;
        if (session.role) token.role = session.role;
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      // 세션에 토큰 정보 추가
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.role = token.role;

      // 임시 사용자 플래그 추가
      if (token.isTempUser && token.oauthEmail && token.provider) {
        session.isTempUser = token.isTempUser;
        session.oauthEmail = token.oauthEmail;
        session.provider = token.provider;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60, // 1시간
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
