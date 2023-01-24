const sequelize = require('../config/connection');
const { User, UserPost, Tag, Comment } = require('../models');

const userData = require('./userData.json');
const userPostData = require('./userPostData.json');
const tagData = require('./tagData.json');
const commentData = require('./commentData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

//   for (const project of projectData) {
//     await Project.create({
//       ...project,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

  process.exit(0);
};

seedDatabase();