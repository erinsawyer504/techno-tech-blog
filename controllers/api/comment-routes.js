const router = require('express').Router();
const { Comment, Post, User } = require('../../models/');
const withAuth = require('../../utils/auth');


//*testing complete for this section

//Getting all the comments
//*getting comments, this is working 
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//*creating new comments working
//Creates new comments
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO i dont think i need to delete comments?
//Deleting a comment
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const commentData = await Comment.destroy({
//       where: {
//         id: req.params.id
//       }
//     });
//     if (!commentData){
//       res.status(404).json({ message: 'No comment found with this id!'});
//       return;
//     }
//     res.json(commentData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// })


module.exports = router;
