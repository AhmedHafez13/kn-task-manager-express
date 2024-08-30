/**
 * This file defines configuration settings for JSON Web Token (JWT)
 */

const JwtSettings = {
  secretKey: process.env.JWT_SECRET || 'default_secret_key',
  authTokenExpireTime: process.env.JWT_EXPIRE_TIME || '1h',
  verificationTokenExpireTime:
    process.env.VERIFICATION_TOKEN_EXPIRE_TIME || '1h',
};

export default JwtSettings;
