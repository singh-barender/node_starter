import passport from 'passport';
import UserModel from '@root/features/users/models/user.model';
import { config } from '@root/config';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_TOKEN
};

const passportJwt = passport.use(
  new JwtStrategy(jwtOptions, async (payload, done: VerifiedCallback) => {
    try {
      const user = await UserModel.findById(payload._id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passportJwt;
