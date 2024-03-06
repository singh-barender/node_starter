import passport from 'passport';
import { config } from '@root/config';
import { findById } from '@root/features/users/services/auth.service';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
};

const passportJwt = passport.use(
  new JwtStrategy(jwtOptions, async (payload, done: VerifiedCallback) => {
    try {
      const user = await findById(payload._id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passportJwt;
