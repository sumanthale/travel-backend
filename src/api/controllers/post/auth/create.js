import { Post } from "../../../../models/index.js";

export default async (req, res) => {
  try {
    let post = new Post({
      ...req.body,
    });

    post = await post.save().catch((err) => {
      return res.status(500).json({ err: err.message });
    });

    return res.status(200).json({
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};
