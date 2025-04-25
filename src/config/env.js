require('dotenv').config(); 

const environments = ['development', 'test', 'production'];
const currentEnv = process.env.NODE_ENV || 'development';

if (!environments.includes(currentEnv)) {
  throw new Error(`NODE_ENV debe ser uno de: ${environments.join(', ')}`);
}

module.exports = {
  NODE_ENV: currentEnv,
  DB_DIALECT: process.env.DB_DIALECT || 'sqlite',
  DB_HOST:  'db.uoaojxguajrojrrmdrdy.supabase.co',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD:  'Chelsea3098@',
  DB_NAME: process.env.DB_NAME || `myapp_${currentEnv}`,
  DB_SSL: process.env.DB_SSL || 'false',
  DB_LOGGING: process.env.DB_LOGGING || 'false',
  JWT_SECRET: "test",
  JWT_EXPIRES_IN: "1h"
};