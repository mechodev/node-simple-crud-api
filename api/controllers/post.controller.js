const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.json(posts);
};
module.exports.showPost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  res.json(post);
};
module.exports.createPost = async (req, res) => {
  if (!req.body.message) {
    res.status(400).json({ message: "All fields are required" });
  }
  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  });
  res.status(201).json(post);
};
module.exports.updatePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.status(400).json({ message: "Post not found" });
  }
  const postUpdate = await PostModel.findByIdAndUpdate(post, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ post: postUpdate, message: "Successfully updated" });
};
module.exports.deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.status(400).json({ message: "Post not found" });
  }
  await post.remove();
  // await PostModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Successfully deleted" });
};

module.exports.likePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    await PostModel.findByIdAndUpdate(
      post,
      { $addToSet: { likers: req.body.userId } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ message: "Successfully liked" });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.unlikePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        await PostModel.findByIdAndUpdate(
          post,
          { $pull: { likers: req.body.userId } },
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200).json({ message: "Successfully disliked" });
      } catch (error) {
        res.status(400).json(error);
      }
};
