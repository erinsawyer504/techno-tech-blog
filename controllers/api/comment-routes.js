const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');


//TODO get all comments
//TODO delete a comment

//Getting all the comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findall({});
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Creates new comments
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Deleting a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!commentData){
      res.status(404).json({ message: 'No comment found with this id!'});
      return;
    }
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


module.exports = router;
