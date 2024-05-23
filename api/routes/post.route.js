const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  showPost,
  likePost,
  unlikePost,
} = require("../controllers/post.controller");

const router = express.Router();
router.get("/", getPosts);
router.get("/:id", showPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.patch("/like/:id", likePost);
router.patch("/unlike/:id", unlikePost);

module.exports = router;
