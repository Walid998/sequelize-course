const {
  PORT,
  NODE_ENV,
  SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
} = process.env;

export default {
  port: PORT || 8085,
  nodeEnv: NODE_ENV || 'production',
  saltRounds: SALT_ROUNDS || 10,
  jwtAccessTokenSecret: JWT_ACCESS_TOKEN_SECRET || '49e5ade1584965f65cdaa4932328f5913b222488354e0a2d2d3860c438c8c6ed',
  jwtRefreshTokenSecret: JWT_REFRESH_TOKEN_SECRET || 'cb45a206b09f94fd73165bb72613056eb818f2d84c7b5ba6d361406af77ed8c8',
};
