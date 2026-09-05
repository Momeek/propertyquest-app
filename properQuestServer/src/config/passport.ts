import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import AppleStrategy from 'passport-apple';
import { User } from '../models';
import { UserToken } from '../utils'; // your JWT token generator
import { base2Url } from '../utils/baseUrl';

// GOOGLE STRATEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${base2Url}/api/auth/google/callback`,
      scope: ['email', 'profile'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const fullName = profile.displayName.split(' ');
        const name = fullName[0];
        const surname = fullName.slice(1).join(' ');

        const [user] = await User.findOrCreate({
          where: { email: profile.emails?.[0].value },
          defaults: {
            name,
            surname,
            email: profile.emails?.[0].value,
            isVerified: true,
            type: 'google',
            role: 'user',
          },
        });
        return done(null, { ...user.toJSON() });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

// FACEBOOK STRATEGY
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID!,
      clientSecret: process.env.FB_CLIENT_SECRET!,
      callbackURL: 'auth/facebook/callback',
      profileFields: ['id', 'displayName', 'emails'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const [user] = await User.findOrCreate({
          where: { email: profile.emails?.[0].value },
          defaults: {
            name: profile.displayName,
            isVerified: true,
            type: 'facebook',
          },
        });
        const token = UserToken.sign({ id: user.userId as string });
        return done(null, { ...user.toJSON(), token });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

// APPLE STRATEGY
passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID!,
      teamID: process.env.APPLE_TEAM_ID!,
      keyID: process.env.APPLE_KEY_ID!,
      privateKey: process.env.APPLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      callbackURL: '/auth/apple/callback',
      passReqToCallback: false,
    },
    async (_accessToken, _refreshToken, idToken, profile, done) => {
      try {
        const [user] = await User.findOrCreate({
          where: { email: idToken.email },
          defaults: {
            name: idToken.email,
            isVerified: true,
            type: 'apple',
          },
        });
        const token = UserToken.sign({ id: user.userId as string });
        return done(null, { ...user.toJSON(), token });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
