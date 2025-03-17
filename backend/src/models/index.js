const { Sequelize } = require('sequelize');
const User = require('./User');
const Task = require('./Task');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

// Initialize models
const models = {
  User: User(sequelize), // Pass sequelize instance to the User model
  Task: Task(sequelize), // Pass sequelize instance to the Task model
};

// Set up associations (if any)
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { ...models, sequelize };