import { Issuer } from 'openid-client';
import GoogleProvider from 'next-auth/providers/google';

const createGoogleProviderWithTimeout = async () => {
  const issuer = await Issuer.discover('https://accounts.google.com');
  issuer.defaultHttpOptions = { timeout: 10000 }; // Set the timeout to 10 seconds

  return GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    issuer: issuer.metadata.issuer, // Use the issuer URL as a string
  });
};

export default createGoogleProviderWithTimeout;
