const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const SeedCommentData = require('./commentData.json');
const SeedUserData = require('./userData.json');
const SeedPostData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(SeedUserData, {
    individualHooks: true,
    returning: true,
  });

  const postSeed = await Post.bulkCreate(SeedPostData);
  const commentSeed = await Comment.bulkCreate(SeedCommentData);

  process.exit(0);
};

seedDatabase();
