import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import userRepository from '../repositories/user.repository';
import JwtSettings from '../settings/jwt.settings';

const JWTStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JwtSettings.secretKey,
  },
  async (payload: JwtPayload, done: VerifiedCallback) => {
    const userEmail = payload.email;

    try {
      const userExists = await userRepository.userExists(userEmail);

      if (userExists) {
        // Select the user and extend the payload data if required
        // ..
        return done(null, payload);
      } else {
        return done(null, null);
      }
    } catch (error) {
      return done(error, null);
    }
  }
);

export default JWTStrategy;