import { Post } from "../../../models/index.js";

export default async (req, res) => {
  // const id = req;
  console.log(req.query);

  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
  }

  const posts = await Post.find(req.query)
    .populate({
      path: "user",
      select: "username email uid photoUrl",
    })
    .catch((err) => {
      return res.status(500).json({ err: err.message });
    });

  return res.status(200).json({
    posts,
  });
};
