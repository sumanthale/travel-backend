import { Post } from "../../../models/index.js";

export default async (req, res) => {
  const posts = await Post.find().catch((err) => {
    return res.status(500).json({ err: err.message });
  });

  return res.status(200).json({
    posts,
  });
};
