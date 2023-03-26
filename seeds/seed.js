const sequelize = require('../config/connection');
const { Post, Comment, Users } = require('../models');
const SeedCommentData = require('./commentData.json');
const SeedUserData = require('./userData.json');
const SeedPostData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Users.bulkCreate(SeedUserData, {
    individualHooks: true,
    returning: true,
  });


  const commentSeed = await Comment.bulkCreate(SeedCommentData);
  const postSeed = await Post.bulkCreate(SeedPostData);

  process.exit(0);
};

seedDatabase();