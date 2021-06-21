const Post = require("../models/postModel");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "SUCCESS",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      error,
    });
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).json({
      status: "SUCCESS",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      error,
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({
      status: "SUCCESS",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      error,
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "SUCCESS",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      error,
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(400).json({
      status: "FAIL",
      error,
    });
  }
};
