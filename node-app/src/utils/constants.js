module.exports = {
    // secret for signing JSON Web Tokens
    JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key-please-change',
  
    // how many rounds bcrypt should use
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS, 10) || 10,
  
    // how long tokens live
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  };
  