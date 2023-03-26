const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

//TODO ready for testing
// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    console.log(req.session);

    const postData = await Post.findAll({
      attributes: [
        'id',
        'postText',
        'title',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'commentText', 'postId', 'userId', 'createdAt'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('all-posts', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// get single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      // helping you out with the include here, no changes necessary
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      // serialize the data
      const post = postData.get({ plain: true });
      // which view should we render for a single-post?
      res.render('single-post', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// giving you the login and signup route pieces below, no changes needed.
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
